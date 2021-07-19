import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';
import { theme } from '../../../../app-config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextContainer } from '../../../../layouts/Agent/CaseDetails';
import {
    Container,
    InnerContainer,
    ScrollView,
    FlexBetweenView,
    DarkGrayText,
    Divider,
    GreenText,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import {
    doctor1Img,
    editGreenImg,
    addImg,
    avatarImg,
} from '../../../../assets/images';
import { TouchableOpacity } from 'react-native';
import CaseDetail from './CaseDetail';
import {
    setDetailCaseFile,
    setAction,
    setDetailNote,
} from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';
import _ from 'lodash';
import { getCaseDetail } from '../../../../store/reducers/doctorReducer';

const CaseDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = {
        image: doctor1Img,
        name: 'Eddie Spaker',
        text: '1993/04/29',
    };
    const selectedCase = useSelector(({ agent }) => agent.selectedCase);

    const [caseDetail, setCaseDetail] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            if (isActive)
                dispatch(
                    getCaseDetail({
                        caseId: selectedCase.caseId,
                    }),
                ).then((res) => {
                    setCaseDetail(res.payload);
                    setLoading(false);
                });

            return () => {
                isActive = false;
            };
        }, [selectedCase]),
    );

    const caseFileDetail = () => {
        dispatch(setAction(actions.DETAIL_FILE));
        dispatch(setDetailCaseFile(caseDetail.CaseFiles));
        navigation.navigate(Routes.DOCTORCASEFILE);
    };

    const detailNote = (note) => {
        dispatch(setAction(actions.DETAIL_NOTE));
        dispatch(setDetailNote(note));
        navigation.navigate(Routes.ADDNOTES);
    };

    if (loading) {
        return (
            <Container
                display="flex"
                align="center"
                justify="flex-start"></Container>
        );
    }

    return (
        <ScrollView>
            <WrapContainer display="flex" align="center" justify="flex-start" paddingBottom={3}>
                <TextContainer>
                    <DarkGrayText fontSize="16">Patient</DarkGrayText>
                </TextContainer>
                <MainCard
                    image={
                        caseDetail.patientInfo.avatar
                            ? { uri: caseDetail.patientInfo.avatar }
                            : avatarImg
                    }
                    title={caseDetail.patientInfo.name}
                    text={caseDetail.patientInfo.description}
                    time={caseDetail.patientInfo.DOB}
                    buttonImage={editGreenImg}
                    navigation={navigation}
                    route={Routes.ADDPATIENT}
                    onPress={() => {}}
                />
                {!_.isEmpty(caseDetail.pcDoctorInfo) && (
                    <TextContainer>
                        <DarkGrayText fontSize="16">Doctor</DarkGrayText>
                    </TextContainer>
                )}

                {!_.isEmpty(caseDetail.pcDoctorInfo) && (
                    <MainCard
                        image={
                            caseDetail.pcDoctorInfo.Avatar
                                ? { uri: caseDetail.pcDoctorInfo.Avatar }
                                : avatarImg
                        }
                        title={caseDetail.pcDoctorInfo.Name}
                        text={caseDetail.pcDoctorInfo.Description}
                        // time={user}
                        // type="ICON_BUTTON"
                        icon="square-edit-outline"
                        iconColor={theme.main.colors.green}
                        navigation={navigation}
                        route={Routes.ADDPATIENT}
                        onPress={() => {}}
                    />
                )}

                <CaseDetail navigation={navigation} data={caseDetail} />

                <Button
                    height={5}
                    width={40}
                    text="Case file"
                    backgroundColor={theme.main.colors.green}
                    color={theme.main.colors.white}
                    onPress={caseFileDetail}
                />

                <Divider marginVertical={2} />

                <FlexBetweenView
                    width="94"
                    justify="space-between"
                    paddingBottom={1}>
                    <DarkGrayText fontSize="16">Notes</DarkGrayText>

                    <FlexBetweenView>
                        {/* <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(Routes.ALLNOTES)
                                }>
                                <GreenText>See all</GreenText>
                            </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setAction(actions.ADD_NOTE));
                                navigation.navigate(Routes.DOCTORADDNOTES);
                            }}>
                            <Icon
                                style={{ marginLeft: 15 }}
                                color={theme.main.colors.fauxBlackOlive}
                                name="ios-add-circle-outline"
                                size={20}
                            />
                        </TouchableOpacity>
                    </FlexBetweenView>
                </FlexBetweenView>

                {caseDetail.notes.map((item) => (
                    <MainCard
                        textGroupWidth={40}
                        image={
                            item.authorId === caseDetail.caseAgent.agentID
                                ? doctor1Img
                                : caseDetail.pcDoctorInfo.avatar
                                ? {
                                      uri: caseDetail.pcDoctorInfo.avatar,
                                  }
                                : doctor1Img
                        }
                        title={item.authorName}
                        text={item.note}
                        time={item.createDate}
                        onPress={() => detailNote(item)}
                    />
                ))}
            </WrapContainer>
        </ScrollView>
    );
};

export default CaseDetails;
