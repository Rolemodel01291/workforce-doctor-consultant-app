import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GooglePlacesInput from '../../../../components/GooglePlaceAutoComplete';
import { Overlay } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import _ from 'lodash';
import {
    Container,
    WrapContainer,
    InnerContainer,
    RoundedImage,
    ScrollView,
    FlexBetweenView,
    DarkGrayText,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    InputContainer,
    DateContainer,
    DescriptionContainer,
    ContentContainer,
    PlaceContainer,
} from '../../../../layouts/Agent/AddPatient';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { actions, Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import { Text } from 'react-native';
import DatePicker from '../../../../components/DatePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RequireText from '../../../../components/RequireText';
import Switch from '../../../../components/Switch';
import { DescriptionInput } from '../../../../layouts/components/TextInput';
import { patientSchema } from '~/model';
import {
    addCasePatient,
    updateCasePatient,
    getPatient,
} from '../../../../store/reducers/agentReducer';
import LoadingSpinner from '~/components/LoadingSpinner';
import { makeid } from '~/services/helpers';
import moment from 'moment';

const defaultValues = {
    name: ' ',
    DOB: new Date(),
    cityState: '',
    email: '',
    SSN: '',
    description: ' ',
    avatar: '',
    geoLocation: {},
};

const AddPatient = ({ navigation }) => {
    const agent = useSelector(({ agent }) => agent);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(avatarImg);
    // Geolocation.getCurrentPosition(info => console.log(info));
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(patientSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        agent.errors.forEach((error) => {
            setError(error.type, {
                type: 'manual',
                message: error.message,
            });
        });
    }, [agent.errors, setError]);

    useEffect(() => {
        if (
            (agent.action === actions.DETAIL_PATIENT ||
                agent.action === actions.EDIT_PATIENT) &&
            !_.isEmpty(agent.selectedPatient)
        ) {
            dispatch(getPatient(agent.selectedPatient.patientId)).then(
                (res) => {
                    setValue('name', res.payload.name);
                    setValue('DOB', res.payload.DOB.toDate());
                    setValue('cityState', res.payload.cityState);
                    setValue('email', res.payload.email);
                    setValue('SSN', res.payload.SSN);
                    setValue('description', res.payload.description);
                    setValue('avatar', res.payload.avatar);
                    if (res.payload.avatar) {
                        setAvatar({ uri: res.payload.avatar });
                    }
                },
            );
        }
    }, [agent.action, agent.selectedPatient]);

    const onSubmit = (model) => {
        setLoading(true);
        if (agent.action === actions.ADD_PATIENT) {
            dispatch(addCasePatient(model)).then((res) => {
                setLoading(false);
                if (!res.payload.error) {
                    navigation.goBack();
                }
            });
        } else {
            console.log(model);
            dispatch(
                updateCasePatient({
                    ...model,
                    patientId: agent.selectedPatient.patientId,
                }),
            ).then((res) => {
                setLoading(false);

                navigation.goBack();
            });
        }
    };

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

    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            listViewDisplayed={false}
            nestedScrollEnabled={true}>
            <WrapContainer display="flex" align="center" justify="flex-start">
                <LoadingSpinner isLoading={loading} />
                <Overlay
                    isVisible={visible}
                    onBackdropPress={toggleOverlay}
                    overlayStyle={{
                        height: 200,
                        width: 150,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <Button
                        width={30}
                        text="Open Camera"
                        onPress={openCamera}
                    />
                    <Button
                        width={30}
                        text="Open Library"
                        onPress={() => openLibrary()}
                    />
                </Overlay>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start">
                    <HeaderContainer>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <RoundedImage source={avatar} borderRadius={30} />
                        </TouchableOpacity>
                        {/* <Switch width={15} /> */}
                    </HeaderContainer>
                    <ContentContainer>
                        <InputContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">Name</DarkGrayText>
                            </RequireText>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={60}
                                        height={4}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        errorProps={!!errors.name}
                                        errorMessage={errors?.name?.message}
                                        placeholder=""
                                    />
                                )}
                            />
                        </InputContainer>

                        <DateContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">
                                    Date of Birth
                                </DarkGrayText>
                            </RequireText>
                            <Controller
                                name="DOB"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <DatePicker
                                            width={60}
                                            height={4}
                                            type="textinput"
                                            mode={'date'}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    );
                                }}
                            />
                        </DateContainer>

                        <PlaceContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">
                                    City/State
                                </DarkGrayText>
                            </RequireText>
                            <Controller
                                name="cityState"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <GooglePlacesInput
                                            onPress={(location, detail) => {
                                                onChange(location.description);
                                                setValue(
                                                    'geoLocation',
                                                    detail.geometry.location,
                                                );
                                            }}
                                            currentAddress={value}
                                            width={60}
                                            height={4}
                                            type="outline"
                                        />
                                    );
                                }}
                            />
                        </PlaceContainer>

                        <InputContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">Email</DarkGrayText>
                            </RequireText>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={60}
                                        height={4}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        errorProps={!!errors.email}
                                        errorMessage={errors?.email?.message}
                                        borderColor={theme.main.colors.gray}
                                        disabled={
                                            agent.action ===
                                                actions.DETAIL_PATIENT ||
                                            agent.action ===
                                                actions.EDIT_PATIENT
                                                ? true
                                                : false
                                        }
                                    />
                                )}
                            />
                        </InputContainer>

                        <InputContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">SSN</DarkGrayText>
                            </RequireText>
                            <Controller
                                name="SSN"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        width={60}
                                        height={4}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder=""
                                        borderColor={theme.main.colors.gray}
                                    />
                                )}
                            />
                        </InputContainer>

                        <DescriptionContainer>
                            <RequireText>
                                <DarkGrayText fontSize="16">
                                    description
                                </DarkGrayText>
                            </RequireText>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DescriptionInput
                                        height={20}
                                        width={90}
                                        value={value}
                                        onChangeText={(text) => onChange(text)}
                                        textAlignVertical="top"
                                        multiline={true}
                                        placeholder=""
                                    />
                                )}
                            />
                        </DescriptionContainer>
                    </ContentContainer>

                    <FlexBetweenView width={90} marginVertical={3}>
                        {console.log(dirtyFields, isValid)}
                        <Button
                            width={60}
                            text="Save and send notification"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            onPress={handleSubmit(onSubmit)}
                        />
                        <TouchableOpacity>
                            <Button
                                width={25}
                                text="Cancel"
                                onPress={() => navigation.goBack()}
                            />
                        </TouchableOpacity>
                    </FlexBetweenView>
                </InnerContainer>
            </WrapContainer>
        </ScrollView>
    );
};

export default AddPatient;
