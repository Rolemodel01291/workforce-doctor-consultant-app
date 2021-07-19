import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-simple-toast';
import { Container } from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import GradientButton from '../../../../components/GradientButton';
import Checkbox from '../../../../components/Checkbox';
import { theme } from '../../../../app-config/theme';
import {
    BottomButtonContainer,
    ContentContainer,
} from '../../../../layouts/Agent/UploadPatientFile';
import { FlexBetweenView, Divider } from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { attachmentImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import LoadingSpinner from '~/components/LoadingSpinner';
import { makeid } from '~/services/helpers';
import {
    setPatientCaseFile,
    updatePatientCaseFile,
    getPatientFiles,
} from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';
import RNFetchBlob from 'rn-fetch-blob';

const UploadPatientFile = ({ navigation }) => {
    const agent = useSelector(({ agent }) => agent);
    const auth = useSelector(({ auth }) => auth.userData);
    console.log(auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [data, setData] = useState(agent.selectedCase.patientUploadFile);

    const handleCheck = (item, index) => {
        let uploadFiles = [...data];
        uploadFiles[index] = {
            ...uploadFiles[index],
            approved: !item.approved,
        };
        setData(uploadFiles);
    };

    const uploadPatientCaseFile = (response) => {
        setLoading(true);
        const fileName = makeid(20);
        const reference = storage().ref(`patientCaseFiles/${fileName}.png`);
        const pathToFile = response.assets[0].uri;
        const task = reference.putFile(pathToFile);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
        });
        task.then(async () => {
            const url = await storage()
                .ref(`patientCaseFiles/${fileName}.png`)
                .getDownloadURL();
            dispatch(
                updatePatientCaseFile({
                    UploadTime: new Date(),
                    author: auth.name,
                    label: 'label',
                    scanFileUrl: url,
                    approved: false,
                    caseId: agent.selectedCase.caseId,
                }),
            ).then(() => {
                setLoading(false);
                dispatch(getPatientFiles(agent.selectedCase.caseId)).then(
                    (res) => {
                        setFiles(res.payload);
                    },
                );
            });

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
                if (!response.didCancel) uploadPatientCaseFile(response);
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
                console.log(response);
                if (!response.didCancel) uploadPatientCaseFile(response);
            },
        );
    };

    const onSave = () => {
        console.log(agent.selectedCase);
        // dispatch(updatePatientCaseFile(agent.selectedCase)).then(() => {
        navigation.goBack();
        // });
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

    useEffect(() => {
        dispatch(getPatientFiles(agent.selectedCase.caseId)).then((res) => {
            setFiles(res.payload);
        });
    }, []);

    return (
        <>
            <LoadingSpinner isLoading={loading} text="Uploading..." />
            <FlexBetweenView
                width="100%"
                marginTop={2}
                justifyContent="space-around">
                <Button
                    height={5}
                    width={25}
                    text="Scan files"
                    backgroundColor={theme.main.colors.green}
                    color={theme.main.colors.white}
                    onPress={openCamera}
                />

                <Button
                    height={5}
                    width={25}
                    text="Upload files"
                    backgroundColor={theme.main.colors.green}
                    color={theme.main.colors.white}
                    onPress={openLibrary}
                />
            </FlexBetweenView>
            <Divider marginVertical={1} />
            <FlexBetweenView
                width="100%"
                paddingHorizontal={1}
                paddingBottom={2}
                justifyContent="space-around">
                <GradientButton height={4} width={15} text="Label" />
                {/* <GradientButton height={4} width={18} text="Author" /> */}
                <GradientButton height={4} width={25} text="Uplaod Time" />
                <GradientButton height={4} width={15} text="File" />
                <GradientButton height={4} width={18} text="Approved" />
            </FlexBetweenView>
            <ScrollView>
                <ContentContainer>
                    {files.map((item, index) => (
                        <MainCard
                            key={index}
                            buttonGroupWidth={40}
                            textGroupWidth={40}
                            title={item.label}
                            text={item.author}
                            time={item.UploadTime}
                            type="ICON_BUTTON"
                            direction="row"
                            iconPress={() => downloadFile(item.scanFileUrl)}
                            icon="attachment">
                            <Checkbox
                                checked={item.approved}
                                onPress={() => handleCheck(item, index)}
                            />
                        </MainCard>
                    ))}
                </ContentContainer>
                {/* <Divider marginBottom={2} /> */}
                <BottomButtonContainer>
                    <Button
                        height={7}
                        width={96}
                        text="SAVE"
                        fontSize={18}
                        fontWeight={400}
                        backgroundColor={theme.main.colors.green}
                        color={theme.main.colors.white}
                        borderRadius={15}
                        onPress={onSave}
                    />
                </BottomButtonContainer>
            </ScrollView>
        </>
    );
};

export default UploadPatientFile;
