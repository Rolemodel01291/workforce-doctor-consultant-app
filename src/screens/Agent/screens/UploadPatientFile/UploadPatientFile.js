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
    updatePatientFileStatus,
    getPatientFiles
} from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';
import RNFetchBlob from 'rn-fetch-blob';

const UploadPatientFile = ({ navigation }) => {
    let agent = useSelector(({ agent }) => agent);
    const auth = useSelector(({ auth }) => auth.userData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleCheck = (item, index) => {
        let uploadFiles = [...data];
        uploadFiles[index] = {
            ...uploadFiles[index],
            approved: !item.approved,

        };
        dispatch(updatePatientFileStatus({data:uploadFiles, caseId: agent.selectedCase.caseId}))
        dispatch(getPatientFiles(agent.selectedCase.caseId)).then((res) => {
            setData(res.payload);
        });
    };


    useEffect(() => {
        dispatch(getPatientFiles(agent.selectedCase.caseId)).then((res) => {
            setData(res.payload);
        });
    }, []);

    const onSave = () => {
        console.log(agent.selectedCase);
        // dispatch(updatePatientCaseFile({data, caseId: agent.selectedCase.caseId})).then(() => {
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

    return (
        <>
            <LoadingSpinner isLoading={loading} text="Uploading..." />
            {/* <FlexBetweenView
                width="100%"
                paddingTop={4}
                paddingLeft={1}
                paddingRight={1}
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
            <Divider marginTop={3} marginBottom={3} /> */}
            <FlexBetweenView
                width="100%"
                marginVertical={1}
                paddingHorizontal={1}
                justifyContent="space-around">
                <GradientButton height={4} width={15} text="Label" />
                <GradientButton height={4} width={18} text="Author" />
                <GradientButton height={4} width={25} text="Uplaod Time" />
                <GradientButton height={4} width={15} text="File" />
                <GradientButton height={4} width={18} text="Approved" />
            </FlexBetweenView>
            <ScrollView>
                <ContentContainer>
                    {data.map((item, index) => (
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
                <Divider marginVertical={1} />
                <BottomButtonContainer>
                    <Button
                        height={7}
                        width={96}
                        marginBottom={2}
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
