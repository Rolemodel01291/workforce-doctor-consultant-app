import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Container, Divider } from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import GradientButton from '../../../../components/GradientButton';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    TopButtonContainer,
    ButtonContainer,
    BottomButtonContainer,
    ContentContainer,
} from '../../../../layouts/Agent/CaseFile';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { attachmentImg } from '../../../../assets/images';
import LoadingSpinner from '~/components/LoadingSpinner';
import { makeid } from '~/services/helpers';
import { setCaseFile } from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';

const CaseFile = ({ navigation }) => {
    const agent = useSelector(({ agent }) => agent);
    const auth = useSelector(({ auth }) => auth.userData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const updateAvatar = (response) => {
        setLoading(true);
        const fileName = makeid(20);
        const reference = storage().ref(`caseFiles/${fileName}.png`);
        const pathToFile = response.assets[0].uri;
        const task = reference.putFile(pathToFile);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
        });
        task.then(async () => {
            setLoading(false);
            const url = await storage()
                .ref(`caseFiles/${fileName}.png`)
                .getDownloadURL();
            dispatch(
                setCaseFile({
                    UploadTime: new Date(),
                    author: auth.Name,
                    label: 'label',
                    scanFileUrl: url,
                }),
            );
            console.log(url);
        });
    };

    const openCamera = () => {
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
        launchImageLibrary(
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

    const downloadFile = (downloadUrl) => {
        console.log(downloadUrl);
        let dirs = RNFetchBlob.fs.dirs;

        RNFetchBlob.config({
            path: dirs.DownloadDir + '/' + makeid(20),
            fileCache: true,
        })
            .fetch('GET', downloadUrl)
            .then((res) => {
                Toast.show('Downloaded Successfully !', Toast.LONG);
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                Toast.show(errorMessage, Toast.LONG);
            });
    };

    return (
        <>
            <LoadingSpinner isLoading={loading} text="Uploading..." />

            <TopButtonContainer>
                {agent.action !== actions.DETAIL_FILE && (
                    <Button
                        height={5}
                        width={25}
                        text="Scan files"
                        backgroundColor={theme.main.colors.green}
                        color={theme.main.colors.white}
                        onPress={openCamera}
                    />
                )}
                {agent.action !== actions.DETAIL_FILE && (
                    <Button
                        height={5}
                        width={25}
                        text="Upload files"
                        backgroundColor={theme.main.colors.green}
                        color={theme.main.colors.white}
                        onPress={openLibrary}
                    />
                )}
            </TopButtonContainer>
            {/* <Divider paddingVertical={1} /> */}
            <ButtonContainer>
                <GradientButton height={4} width={15} text="Label" />
                <GradientButton height={4} width={20} text="Author" />
                <GradientButton height={4} width={25} text="Uplaod Time" />
                <GradientButton height={4} width={15} text="File" />
            </ButtonContainer>
            <ScrollView>
                <ContentContainer>
                    {agent.case.CaseFiles.map((item, index) => (
                        <MainCard
                            key={index}
                            buttonGroupWidth={40}
                            textGroupWidth={40}
                            title={item.label}
                            text={item.author}
                            time={item.UploadTime}
                            type="ICON_BUTTON"
                            direction="row"
                            icon="attachment"
                            iconPress={() => downloadFile(item.scanFileUrl)}
                        />
                    ))}
                </ContentContainer>
                {/* <Divider marginBottom={2} /> */}
                <BottomButtonContainer>
                    <Button
                        height={6}
                        width={96}
                        marginVertical={2}
                        text="UPLOAD PATIENT FILES"
                        fontSize={18}
                        fontWeight={400}
                        backgroundColor={theme.main.colors.green}
                        color={theme.main.colors.white}
                        borderRadius={15}
                        onPress={() =>
                            navigation.navigate(Routes.PATIENTUPLOADPATIENTFILE)
                        }
                    />
                    {agent.action !== actions.DETAIL_FILE && (
                        <Button
                            height={6}
                            width={96}
                            text="PACK AND SHARE"
                            fontSize={18}
                            fontWeight={400}
                            backgroundColor={theme.main.colors.green}
                            color={theme.main.colors.white}
                            borderRadius={15}
                        />
                    )}
                </BottomButtonContainer>
            </ScrollView>
        </>
    );
};

export default CaseFile;
