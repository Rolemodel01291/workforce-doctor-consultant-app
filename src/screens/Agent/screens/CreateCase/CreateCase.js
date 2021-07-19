import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import {
    addCase,
    setAction,
    setCleanCase,
    getCase,
    setPatient,
} from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';
import {
    WrapContainer,
    Container,
    GreenText,
} from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    TitleContainer,
    PatiantContainer,
    CaseInfoContainer,
} from '../../../../layouts/Agent/CreateCase';
import {
    FlexBetweenView,
    DarkGrayText,
    GrayText,
    Divider,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import {
    avatarImg,
    newImg,
    editGreenImg,
    addImg,
} from '../../../../assets/images';
import IconButton from '../../../../components/IconButton';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import DatePicker from '../../../../components/DatePicker';
import moment from 'moment';
import LoadingSpinner from '~/components/LoadingSpinner';

const CreateCase = ({ navigation }) => {
    const dispatch = useDispatch();
    const agent = useSelector(({ agent }) => agent.case);
    const auth = useSelector(({ auth }) => auth.userData);
    const [injuryTime, setInjuryTime] = useState(new Date());
    const [loading, setLoading] = useState(false);

    function goAddPatient() {
        dispatch(setAction(actions.ADD_PATIENT));
        navigation.navigate(Routes.ADDPATIENT);
    }
    console.log('====================',agent.patientInfo.DOB)
    const checkValid = () => {
        if (
            agent.CaseFiles.length > 0 &&
            agent.notes.length > 0 &&
            !_.isEmpty(agent.InsuranceInfo) &&
            !_.isEmpty(agent.attorneyInfo) &&
            !_.isEmpty(agent.patientInfo)
        )
            return true;

        return false;
    };
    const onSaveCase = () => {
        if (checkValid()) {
            setLoading(true);
            const caseData = {
                ...agent,
                caseAgent: {
                    agentID: auth.uid,
                    agentName: auth.Name,
                    agentReference: firestore()
                        .collection('Agents')
                        .doc(auth.uid)
                        .collection('BusinessAgent')
                        .doc(auth.uid),
                },
                caseCreateTime: new Date(),
                dateOfInjury: injuryTime,
                caseStatus: 0,
                caseWaring: ['PATIENT_FILE_WAITING_REVIEW'],
                patientUploadFile: [],
                pcDoctorInfo: {},
                schedule: {},
                businessId: '',
            };
            
            dispatch(addCase(caseData)).then(() => {
                setLoading(false);
                dispatch(setCleanCase());
                navigation.goBack();
            });
        } else {
        }
    };

    const editPatient = (action, route) => {
        dispatch(setAction(action));
        dispatch(setPatient(agent.patientInfo));
        navigation.navigate(route);
    };

    const addInfo = (action, route) => {
        dispatch(setAction(action));
        navigation.navigate(route);
    };

    const addInsurance = (action, route) => {
        dispatch(setAction(action));
        navigation.navigate(route);
    };

    const addNote = (action, route) => {
        dispatch(setAction(action));
        navigation.navigate(route);
    };

    const addCaseFile = (action, route) => {
        dispatch(setAction(action));
        navigation.navigate(route);
    };

    return (
        <>
            <WrapContainer display="flex" align="center" justify="flex-start">
                <LoadingSpinner isLoading={loading} text="Add Case..." />
                <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                    <IconButton
                        source={newImg}
                        text="add new"
                        fontSize={11}
                        onPress={goAddPatient}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(Routes.PATIENTSLIST)
                        }>
                        <IconButton
                            onPress={() =>
                                navigation.navigate(Routes.AGENT, {
                                    screen: Routes.PATIENTSHOME,
                                })
                            }
                            source={newImg}
                            text="choose from current case"
                            fontSize={11}
                        />
                    </TouchableOpacity>
                </FlexBetweenView>
                <Divider />
                <PatiantContainer>
                    
                    {!_.isEmpty(agent.patientInfo) && (
                        <MainCard
                            image={
                                agent.patientInfo.avatar
                                    ? { uri: agent.patientInfo.avatar }
                                    : avatarImg
                            }
                            title={agent.patientInfo?.name}
                            text={agent.patientInfo?.description}
                            time={moment(agent.patientInfo.DOB)}
                            type="ICON_BUTTON"
                            icon='square-edit-outline'
                            iconColor={theme.main.colors.green}
                            navigation={navigation}
                            route={Routes.ADDPATIENT}
                            data={agent.patientInfo}
                            iconPress={() =>
                                editPatient(
                                    actions.EDIT_PATIENT,
                                    Routes.ADDPATIENT,
                                )
                            }
                        />
                    )}
                </PatiantContainer>
            </WrapContainer>
            <ScrollView>
                <WrapContainer
                    display="flex"
                    align="center"
                    justify="flex-start">
                    <CaseInfoContainer>
                        <TitleContainer>
                            <DarkGrayText fontSize={20}>Case Info</DarkGrayText>
                        </TitleContainer>

                        <MainCard type="HAS_CHILDREN">
                            <DarkGrayText fontSize={16}>
                                Created time:
                            </DarkGrayText>
                            <DarkGrayText>
                                {moment(new Date()).format('YYYY/MM/DD')}
                            </DarkGrayText>
                        </MainCard>
                        <MainCard type="HAS_CHILDREN">
                            <DarkGrayText fontSize={16}>
                                Date of Injury:
                            </DarkGrayText>
                            <DatePicker
                                mode={'date'}
                                value={injuryTime || new Date()}
                                onChange={setInjuryTime}
                            />
                        </MainCard>
                        <MainCard
                            title="Attorney Info:"
                            type="ICON_BUTTON"
                            icon='plus-circle-outline'
                            navigation={navigation}
                            action={actions.ADD_ATTORNEY}
                            route={Routes.ADDATTORNEY}
                            iconPress={() =>
                                addInfo(
                                    actions.ADD_ATTORNEY,
                                    Routes.ADDATTORNEY,
                                )
                            }
                        />
                        <MainCard
                            title="Insurance Info:"
                            type="ICON_BUTTON"
                            icon='plus-circle-outline'
                            navigation={navigation}
                            action={actions.ADD_INSURANCE}
                            route={Routes.ADDINSURANCE}
                            iconPress={() =>
                                addInsurance(
                                    actions.ADD_INSURANCE,
                                    Routes.ADDINSURANCE,
                                )
                            }
                        />
                        <MainCard
                            title="Notes"
                            type="ICON_BUTTON"
                            icon='plus-circle-outline'
                            navigation={navigation}
                            action={actions.ADD_NOTE}
                            route={Routes.ADDNOTES}
                            iconPress={() =>
                                addNote(actions.ADD_NOTE, Routes.ADDNOTES)
                            }
                        />
                        <TouchableOpacity
                            onPress={() =>
                                addCaseFile(actions.ADD_FILE, Routes.CASEFILE)
                            }>
                            <MainCard
                                title="Case Files:"
                                type="NO_BUTTON"
                                navigation={navigation}
                                action={actions.ADD_FILE}
                                route={Routes.CASEFILE}
                            />
                        </TouchableOpacity>
                    </CaseInfoContainer>

                    <FlexBetweenView width={94} marginVertical={3}>
                        <TouchableOpacity>
                            <Button
                                height={5}
                                width={60}
                                text="Save and send notification"
                                backgroundColor={theme.main.colors.green}
                                color={theme.main.colors.white}
                                onPress={onSaveCase}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Button
                                height={5}
                                width={25}
                                text="Cancel"
                                backgroundColor={theme.main.colors.green}
                                color={theme.main.colors.white}
                            />
                        </TouchableOpacity>
                    </FlexBetweenView>
                </WrapContainer>
            </ScrollView>
        </>
    );
};

export default CreateCase;
