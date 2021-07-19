import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { Overlay } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import { Container, WrapContainer } from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    CardContainer,
    InputSection,
    ButtonContainer,
} from '../../../../layouts/Agent';
import { DarkGrayText, RoundedImage } from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { avatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import TextInput from '../../../../components/TextInput';
import { Text } from 'react-native';
import RequireText from '../../../../components/RequireText';
import { agentSchema } from '~/model';
import { makeid } from '~/services/helpers';

const defaultValues = {
    Name: '',
    Phone: '',
    email: '',
    Address: '',
    avatar: '',
};

const AgentHome = () => {
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }) => auth.userData);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(avatarImg);

    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(agentSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            firestore()
                .collection('Agents')
                .doc(auth.uid)
                .collection('BusinessAgent')
                .doc(auth.uid)
                .get()
                .then((snapShot) => {
                    if (isActive) {
                        setValue('Name', snapShot.data().Name);
                        setValue('Phone', snapShot.data().Phone);
                        setValue('email', snapShot.data().email);
                        setValue('Address', snapShot.data().Address);
                        setValue('avatar', snapShot.data().avatar);
                        setAvatar({ uri: snapShot.data().avatar });
                    }
                });

            return () => {
                isActive = false;
            };
        }, []),
    );

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

    const onSubmit = (model) => {
        console.log(model);
        firestore()
            .collection('Agents')
            .doc(auth.uid)
            .collection('BusinessAgent')
            .doc(auth.uid)
            .update({
                ...model,
                Role: 'agent',
            })
            .then(() => {
                Toast.show('Saved Successfully !', Toast.LONG);
            });
    };

    return (
        <ScrollView style={{backgroundColor: theme.main.colors.white}}>
            <WrapContainer display="flex" align="center" justify="flex-start" marginBottom={3}>
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
                <HeaderContainer>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <RoundedImage source={avatar} borderRadius={100} />
                    </TouchableOpacity>
                    {/* <CustomSwitch /> */}
                </HeaderContainer>
                <CardContainer
                    backgroundColor={theme.main.colors.whiteSmoke}
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={2}
                    paddingRight={2}
                    width="100%">
                    <InputSection>
                        <RequireText>
                            <DarkGrayText fontSize="16">Name</DarkGrayText>
                        </RequireText>
                        <Controller
                            name="Name"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={75}
                                    height={6}
                                    borderWid={0}
                                    color={theme.main.colors.gray}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                    errorProps={!!errors.Name}
                                    errorMessage={errors?.Name?.message}
                                />
                            )}
                        />
                    </InputSection>

                    <InputSection>
                        <RequireText>
                            <DarkGrayText fontSize="16">Email</DarkGrayText>
                        </RequireText>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={75}
                                    height={6}
                                    borderWid={0}
                                    color={theme.main.colors.gray}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    errorProps={!!errors.email}
                                    errorMessage={errors?.email?.message}
                                    disabled
                                />
                            )}
                        />
                    </InputSection>

                    <InputSection>
                        <RequireText>
                            <DarkGrayText fontSize="16">Tel</DarkGrayText>
                        </RequireText>

                        <Controller
                            name="Phone"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={75}
                                    height={6}
                                    borderWid={0}
                                    color={theme.main.colors.gray}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    errorProps={!!errors.Phone}
                                    errorMessage={errors?.Phone?.message}
                                />
                            )}
                        />
                    </InputSection>

                    <InputSection>
                        <RequireText>
                            <DarkGrayText fontSize="16">Location</DarkGrayText>
                        </RequireText>
                        <Controller
                            name="Address"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    width={75}
                                    height={6}
                                    borderWid={0}
                                    color={theme.main.colors.gray}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    errorProps={!!errors.Address}
                                    errorMessage={errors?.Address?.message}
                                />
                            )}
                        />
                    </InputSection>

                    <ButtonContainer>
                        {/* <Button
                        width={20}
                        marginHorizontal={1}
                        text="EDIT"
                        backgroundColor={theme.main.colors.main}
                        borderRadius={6}
                    /> */}
                        <Button
                            width={20}
                            marginHorizontal={1}
                            text="SAVE"
                            onPress={handleSubmit(onSubmit)}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            backgroundColor={theme.main.colors.main}
                            borderRadius={6}
                        />
                    </ButtonContainer>
                </CardContainer>
            </WrapContainer>
        </ScrollView>
    );
};

export default AgentHome;
