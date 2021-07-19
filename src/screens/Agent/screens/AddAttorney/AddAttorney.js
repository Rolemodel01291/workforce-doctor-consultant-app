import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import _ from 'lodash';
import {
    Container,
    RoundedImage,
    InnerContainer,
    FlexBetweenView,
    GrayText,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import InputCard from '../../../../components/InputCard';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    ContentContainer,
} from '../../../../layouts/Agent/AddAttorney';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes, actions } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Switch from '../../../../components/Switch';
import RequireText from '../../../../components/RequireText';
import PhoneInput from '../../../../components/lib';
import { attorneySchema } from '~/model';
import { setAttorneyInfo } from '../../../../store/reducers/agentReducer';
import { makeid } from '~/services/helpers';

const defaultValues = {
    attorneyName: '',
    attorneyEmail: '',
    attorneyCityState: '',
    attorneyAddress: '',
    attorneyFax: '',
    attorneyPhone: '',
    attorneyZip: '',
    attorneyAvatar: '',
};

const AddAttorney = ({ navigation }) => {
    const agent = useSelector(({ agent }) => agent);
    console.log('--------------action, ', agent.action);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(avatarImg);
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(attorneySchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        if (
            !_.isEmpty(agent.case.attorneyInfo) ||
            agent.action === actions.DETAIL_ATTORNEY
        ) {
            setValue('attorneyName', agent.case.attorneyInfo.attorneyName);
            setValue('attorneyEmail', agent.case.attorneyInfo.attorneyEmail);
            setValue(
                'attorneyCityState',
                agent.case.attorneyInfo.attorneyCityState,
            );
            setValue(
                'attorneyAddress',
                agent.case.attorneyInfo.attorneyAddress,
            );
            setValue('attorneyFax', agent.case.attorneyInfo.attorneyFax);
            setValue('attorneyPhone', agent.case.attorneyInfo.attorneyPhone);
            setValue('attorneyZip', agent.case.attorneyInfo.attorneyZip);
            setValue('attorneyAvatar', agent.case.attorneyInfo.attorneyAvatar);
            if (agent.case.attorneyInfo.attorneyAvatar) {
                setAvatar({ uri: agent.case.attorneyInfo.attorneyAvatar });
            }
        }
    }, [agent.case]);

    const onSubmit = (model) => {
        dispatch(setAttorneyInfo(model));
        navigation.goBack();
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
            setValue('attorneyAvatar', url);
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
        <ScrollView>
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
            <InnerContainer display="flex" align="center" justify="flex-start">
                <HeaderContainer>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <RoundedImage source={avatar} borderRadius={30} />
                    </TouchableOpacity>
                    {/* <Switch width={15} /> */}
                </HeaderContainer>
                <ContentContainer>
                    <InputCard>
                        <RequireText>
                            <GrayText fontSize="16">Full Name</GrayText>
                        </RequireText>
                        <Controller
                            name="attorneyName"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    width={83}
                                    height={6}
                                    errorProps={!!errors.attorneyName}
                                    errorMessage={errors?.attorneyName?.message}
                                    onChangeText={(text) => onChange(text)}
                                    placeholder=""
                                    borderWid={0}
                                />
                            )}
                        />
                    </InputCard>

                    <InputCard>
                        <RequireText>
                            <GrayText fontSize="16">Email</GrayText>
                        </RequireText>
                        <Controller
                            name="attorneyEmail"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    value={value}
                                    errorProps={!!errors.attorneyEmail}
                                    errorMessage={
                                        errors?.attorneyEmail?.message
                                    }
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
                            name="attorneyAddress"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    value={value}
                                    errorProps={!!errors.attorneyAddress}
                                    errorMessage={
                                        errors?.attorneyAddress?.message
                                    }
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
                            name="attorneyCityState"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    value={value}
                                    errorProps={!!errors.attorneyCityState}
                                    errorMessage={
                                        errors?.attorneyCityState?.message
                                    }
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
                            name="attorneyZip"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    value={value}
                                    keyboardType="numeric"
                                    errorProps={!!errors.attorneyZip}
                                    errorMessage={errors?.attorneyZip?.message}
                                    onChangeText={(text) => onChange(text)}
                                    placeholder=""
                                    borderWid={0}
                                />
                            )}
                        />
                    </InputCard>

                    {/* <InputCard>
                        <RequireText>
                            <GrayText fontSize="16">Tel</GrayText>
                        </RequireText>
                        <PhoneInput />
                    </InputCard> */}

                    <InputCard>
                        <RequireText>
                            <GrayText fontSize="16">Tel</GrayText>
                        </RequireText>
                        <Controller
                            name="attorneyPhone"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    value={value}
                                    keyboardType="numeric"
                                    errorProps={!!errors.attorneyPhone}
                                    errorMessage={
                                        errors?.attorneyPhone?.message
                                    }
                                    onChangeText={(text) => onChange(text)}
                                    placeholder=""
                                    borderWid={0}
                                />
                            )}
                        />
                    </InputCard>

                    <InputCard>
                        <RequireText>
                            <GrayText fontSize="16">Fax</GrayText>
                        </RequireText>
                        <Controller
                            name="attorneyFax"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={83}
                                    height={6}
                                    errorProps={!!errors.attorneyFax}
                                    errorMessage={errors?.attorneyFax?.message}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    placeholder=""
                                    borderWid={0}
                                />
                            )}
                        />
                    </InputCard>
                </ContentContainer>
                <FlexBetweenView width={80} marginVertical={2}>
                    {console.log(agent.action !== actions.DETAIL_ATTORNEY)}
                    {agent.action !== actions.DETAIL_ATTORNEY && (
                        <TouchableOpacity>
                            <Button
                                width={30}
                                text="Save"
                                onPress={handleSubmit(onSubmit)}
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                            />
                        </TouchableOpacity>
                    )}
                    {agent.action !== actions.DETAIL_ATTORNEY && (
                        <TouchableOpacity>
                            <Button
                                width={30}
                                text="Cancel"
                                onPress={() => navigation.goBack()}
                            />
                        </TouchableOpacity>
                    )}
                </FlexBetweenView>
            </InnerContainer>
        </ScrollView>
    );
};

export default AddAttorney;
