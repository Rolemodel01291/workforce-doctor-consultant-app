import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import EyeIcon from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';
import { Container } from '../../../../layouts/globalLayout';
import GooglePlacesInput from '../../../../components/GooglePlaceAutoComplete';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    CardContainer,
    InputSection,
    ButtonContainer,
    SecretContainer,
    MapViewContainer,
} from '../../../../layouts/Agent/CreateDoctor';
import {
    DarkGrayText,
    RoundedImage,
    InputLabelText,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import TextInput from '../../../../components/TextInput';
import { StyledTextInput } from '../../../../layouts/components/TextInput';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import RequireText from '../../../../components/RequireText';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { doctorSchema } from '~/model';
import LoadingSpinner from '~/components/LoadingSpinner';
import { makeid } from '~/services/helpers';
import { addDoctor } from '../../../../store/reducers/doctorReducer';

const defaultValues = {
    Email: '',
    Name: '',
    Phone: '',
    Address: '',
    Description: '',
    Password: '',
    Avatar: '',
    Tech: '6',
    GeoLocation: {},
};

const CreateDoctor = ({ navigation }) => {
    const doctor = useSelector(({ doctor }) => doctor);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [avatar, setAvatar] = useState(doctorAvatarImg);
    const [coordinate, setCoordinate] = useState({
        latitude: 41.880032,
        longitude: -87.623177,
    });

    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(doctorSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        doctor.errors.forEach((error) => {
            setError(error.type, {
                type: 'manual',
                message: error.message,
            });
        });
    }, [doctor.errors, setError]);

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
            setValue('Avatar', url);
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

    const onSubmit = (model) => {
        setLoading(true);
        dispatch(addDoctor(model)).then((res) => {
            setLoading(false);
            if (!res.payload.error) {
                navigation.goBack();
            }
        });
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            listViewDisplayed={false}
            nestedScrollEnabled={true}>
            <View
                style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 30,
                }}>
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
                <SecretContainer>
                    <Controller
                        name="Email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                Rounded={true}
                                InnerGray={true}
                                placeholder="Email"
                                // value={value}
                                errorProps={!!errors.Email}
                                errorMessage={errors?.Email?.message}
                                onChangeText={(text) => onChange(text)}
                                leftIcon={
                                    <Icon name="mail" size={20} color="gray" />
                                }
                            />
                        )}
                    />
                    <Controller
                        name="Password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                Rounded={true}
                                InnerGray={true}
                                placeholder="Password"
                                secureTextEntry={showPassword}
                                errorProps={!!errors.Password}
                                errorMessage={errors?.Password?.message}
                                onChangeText={(text) => onChange(text)}
                                rightIcon={
                                    showPassword ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowPassword(false)
                                            }>
                                            <EyeIcon name="eye" size={20} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowPassword(true)
                                            }>
                                            <EyeIcon
                                                name="eye-with-line"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                                leftIcon={
                                    <Icon name="key" size={20} color="gray" />
                                }
                            />
                        )}
                    />
                </SecretContainer>

                <HeaderContainer>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <RoundedImage
                            backgroundColor={theme.main.colors.dark}
                            source={avatar}
                        />
                    </TouchableOpacity>
                    {/* <CustomSwitch /> */}
                </HeaderContainer>

                <CardContainer
                    backgroundColor={theme.main.colors.white}
                    paddingTop={10}
                    paddingBottom={10}
                    paddingLeft={10}
                    paddingRight={10}
                    width="100%">
                    <Controller
                        name="Name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                label="Full Name *"
                                borderColor={theme.main.colors.black}
                                errorProps={!!errors.Name}
                                errorMessage={errors?.Name?.message}
                                onChangeText={(text) => onChange(text)}
                            />
                        )}
                    />
                    <Controller
                        name="Phone"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                label="Phone *"
                                errorProps={!!errors.Phone}
                                errorMessage={errors?.Phone?.message}
                                onChangeText={(text) => onChange(text)}
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                    <Controller
                        name="AvailableBook"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                label="Available Book *"
                                keyboardType="number-pad"
                                errorProps={!!errors.AvailableBook}
                                errorMessage={errors?.AvailableBook?.message}
                                onChangeText={(text) => onChange(text)}
                            />
                        )}
                    />                  

                    <InputSection>
                        <InputLabelText fontSize={16}>Address *</InputLabelText>
                        <Controller
                            name="Address"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <GooglePlacesInput
                                    onPress={(location, detail) => {
                                        onChange(location.description);
                                        setValue(
                                            'GeoLocation',
                                            detail.geometry.location,
                                        );
                                        setCoordinate({
                                            ...coordinate,
                                            latitude:
                                                detail.geometry.location.lat,
                                            longitude:
                                                detail.geometry.location.lng,
                                        });
                                    }}
                                    currentAddress={value}
                                    width={75}
                                    height={8}
                                    type='bottomline'
                                />
                            )}
                        />
                    </InputSection>

                    <Controller
                        name="Description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledTextInput
                                label="Description *"
                                multiline={true}
                                errorProps={!!errors.Description}
                                errorMessage={errors?.Description?.message}
                                onChangeText={(text) => onChange(text)}
                            />
                        )}
                    />
                </CardContainer>
                <MapViewContainer>
                    <MapView
                        initialRegion={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        region={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        style={{ width: '100%', height: 200 }}>
                        <MapView.Marker.Animated
                            coordinate={coordinate}
                            onDragEnd={(e) => {
                                console.log(
                                    'dragEnd',
                                    e.nativeEvent.coordinate,
                                );
                            }}
                        />
                    </MapView>
                </MapViewContainer>

                <ButtonContainer>
                    <Button
                        height={5}
                        width={30}
                        margin={1}
                        text="Create"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onPress={handleSubmit(onSubmit)}
                        backgroundColor={theme.main.colors.green}
                        color={theme.main.colors.white}
                        borderRadius={15}
                    />
                </ButtonContainer>
            </View>
        </ScrollView>
    );
};

export default CreateDoctor;
