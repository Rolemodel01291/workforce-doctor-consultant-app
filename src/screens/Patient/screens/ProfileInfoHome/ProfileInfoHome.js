import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-simple-toast';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import {
    FlexBetweenView,
    Container,
    RoundedImage,
    GrayText,
    InnerContainer,
    GreenText,
    RedText,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import InputCard from '../../../../components/InputCard';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    ContentContainer,
} from '../../../../layouts/Patient/ProfileInfoHome';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { patientImg, avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import RequireText from '../../../../components/RequireText';
import DatePicker from '../../../../components/DatePicker';
import { patientProfileSchema } from '~/model';
import { makeid } from '~/services/helpers';
import LoadingSpinner from '~/components/LoadingSpinner';
import {
    updatePatient,
    getPatientProfile,
} from '../../../../store/reducers/patientReducer';

const defaultValues = {
    name: '',
    DOB: new Date(),
    cityState: '',
    email: '',
    SSN: '',
    description: '',
    avatar: '',
    phone: '',
    Address: '',
    Gender: '',
    Zipcode: '',
};

const ProfileInfoHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector(({ auth }) => auth.userData);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(avatarImg);
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(patientProfileSchema),
    });

    const { isValid, dirtyFields, errors } = formState;
    const user = {
        image: patientImg,
        name: 'Anatollo',
        city: 'New York',
        email: 'admin@admin.com',
        address: 'California, US',
        code: '095648',
        tel: '12654906815',
        fax: '096852',
    };

    useEffect(() => {
        if (!_.isEmpty(userData)) {
            console.log('======uid========', userData);
            dispatch(getPatientProfile(userData.uid)).then((res) => {
                setAvatar(
                    res.payload.avatar
                        ? { uri: res.payload.avatar }
                        : avatarImg,
                );
                console.log(res.payload.DOB);
                setValue('name', res.payload.name);
                setValue('Address', res.payload.Address);
                setValue('phone', res.payload.phone);
                setValue('avatar', res.payload.avatar);
                if (typeof res.payload.DOB === 'object') {
                    setValue('DOB', res.payload.DOB.toDate());
                } else {
                    setValue('DOB', res.payload.DOB);
                }
                setValue('Gender', res.payload.Gender);
                setValue('SSN', res.payload.SSN);
                setValue('Zipcode', res.payload.Zipcode);
                setValue('cityState', res.payload.cityState);
                setValue('email', res.payload.email);
            });
        }
    }, [userData]);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const updateAvatar = (response) => {
        const fileName = makeid(20);
        const reference = storage().ref(`avatar/${fileName}.png`);
        const pathToFile = response.assets[0].uri;
        const task = reference.putFile(pathToFile);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
        });
        task.then(async () => {
            const url = await storage()
                .ref(`avatar/${fileName}.png`)
                .getDownloadURL();
            setValue('avatar', url);
            setAvatar({ uri: url });
        });
    };

    const openCamera = () => {
        toggleOverlay();
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
                saveToPhotos: true,
            },
            (response) => {
                if (!response.didCancel) updateAvatar(response);
            },
        );
    };

    const openLibrary = () => {
        toggleOverlay();
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (!response.didCancel) updateAvatar(response);
            },
        );
    };

    const removeAvatar = () => {
        setValue('avatar', '');
        setAvatar(avatarImg);
    };

    const onSubmit = (model) => {
        setLoading(true);
        dispatch(updatePatient(model)).then(() => {
            setLoading(false);
            Toast.show('Saved Successfully !', Toast.LONG);
        });
    };

    return (
        <ScrollView>
            <WrapContainer display="flex" align="center" justify="flex-start">
                <LoadingSpinner isLoading={loading} text="Update Profile..." />
                <Overlay
                    isVisible={visible}
                    onBackdropPress={toggleOverlay}
                    overlayStyle={{
                        height: 200,
                        width: 150,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity>
                        <Button
                            width={30}
                            text="Open Camera"
                            onPress={openCamera}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button
                            width={30}
                            text="Open Library"
                            onPress={openLibrary}
                        />
                    </TouchableOpacity>
                </Overlay>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start">
                    <HeaderContainer>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <RoundedImage source={avatar} borderRadius={30} />
                        </TouchableOpacity>
                        {/* <GreenText>Upload Profile Picture</GreenText> */}
                        <TouchableOpacity onPress={removeAvatar}>
                            <RedText>Remove Picture</RedText>
                        </TouchableOpacity>
                    </HeaderContainer>
                    <ContentContainer>
                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Full Name</GrayText>
                            </RequireText>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        errorProps={!!errors.name}
                                        errorMessage={errors?.name?.message}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Address</GrayText>
                            </RequireText>
                            <Controller
                                name="Address"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        errorProps={!!errors.Address}
                                        errorMessage={errors?.Address?.message}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Tel</GrayText>
                            </RequireText>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        errorProps={!!errors.phone}
                                        errorMessage={errors?.phone?.message}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Date of birth</GrayText>
                            </RequireText>
                            <Controller
                                name="DOB"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        width={83}
                                        height={6}
                                        mode={'date'}
                                        onChange={onChange}
                                        value={value || new Date()}
                                        borderBottomWidth={1}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Gender</GrayText>
                            </RequireText>
                            <Controller
                                name="Gender"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        errorProps={!!errors.Gender}
                                        errorMessage={errors?.Gender?.message}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">SSN</GrayText>
                            </RequireText>
                            <Controller
                                name="SSN"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">Zip Code</GrayText>
                            </RequireText>
                            <Controller
                                name="Zipcode"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>

                        <InputCard>
                            <RequireText>
                                <GrayText fontSize="16">City/State</GrayText>
                            </RequireText>
                            <Controller
                                name="cityState"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={83}
                                        height={6}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderWid={0}
                                    />
                                )}
                            />
                        </InputCard>
                    </ContentContainer>
                    <FlexBetweenView
                        justifyContent='center'
                        width={100}
                        marginVertical={2}                        
                        >
                        <TouchableOpacity>
                            <Button
                                width={90}
                                text="UPDATE"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                onPress={handleSubmit(onSubmit)}
                            />
                        </TouchableOpacity>
                    </FlexBetweenView>
                </InnerContainer>
            </WrapContainer>
        </ScrollView>
    );
};

export default ProfileInfoHome;
