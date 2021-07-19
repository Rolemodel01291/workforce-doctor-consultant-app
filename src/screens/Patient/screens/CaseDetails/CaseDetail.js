import React from 'react';
import { useDispatch } from 'react-redux';
import {
    ContentContainer,
    LeftTextContainer,
    RightTextContainer,
    CheckboxContainer,
    WeekContainer,
} from '../../../../layouts/Agent/CaseDetails';
import {
    FlexBetweenView,
    GrayText,
    DarkGrayText,
    GreenText,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { TouchableOpacity } from 'react-native';
import Checkbox from '../../../../components/Checkbox';
import Week from '../../../../components/Week';
import { theme } from '../../../../app-config/theme';
import moment from 'moment';
import {
    setAction,
    setCase,
    updateCaseStatus,
    setAttorneyInfo,
    setInsuranceInfo,
} from '../../../../store/reducers/agentReducer';
import { actions } from '../../../../app-config/constants';
import _ from 'lodash';

const CaseDetail = (props) => {
    const dispatch = useDispatch();
    function handlePress(ev) {
        props.navigation.navigate(Routes.CASEFINALREVIEW);
        // console.log('handlePress')
    }

    function handleWeekPress(ev, item) {}

    const setStatus = (value) => {
        dispatch(
            setCase({
                ...props.data,
                caseStatus: parseInt(value),
            }),
        );
        dispatch(
            updateCaseStatus({
                ...props.data,
                caseStatus: parseInt(value),
            }),
        );
    };

    const attorneyDetail = () => {
        dispatch(setAction(actions.DETAIL_ATTORNEY));
        dispatch(setAttorneyInfo(props.data.attorneyInfo));
        props.navigation.navigate(Routes.ADDATTORNEY);
    };

    const insuranceDetail = () => {
        dispatch(setAction(actions.DETAIL_INSURANCE));
        dispatch(setInsuranceInfo(props.data.InsuranceInfo));
        props.navigation.navigate(Routes.ADDINSURANCE);
    };

    return (
        <ContentContainer>
            <FlexBetweenView width={90}>
                <DarkGrayText fontSize="16">Status</DarkGrayText>
                <DarkGrayText fontSize="16">
                    Case start time :{' '}
                    {moment(props.data.caseCreateTime).format('YYYY-MM-DD')}
                </DarkGrayText>
            </FlexBetweenView>

            <FlexBetweenView paddingBottom={2}>
                <CheckboxContainer>
                    <Checkbox
                        title="New case"
                        checked={props.data.caseStatus >= 0}
                        onPress={() => {}}
                    />
                    <Checkbox
                        title="Waiting schedule"
                        checked={props.data.caseStatus >= 1}
                        onPress={() => {}}
                    />
                    <Checkbox
                        title="Scheduled"
                        checked={props.data.caseStatus >= 2}
                        onPress={() => {}}
                    />
                </CheckboxContainer>
                <CheckboxContainer>
                    <Checkbox
                        title="Treatment"
                        checked={props.data.caseStatus >= 3}
                        onPress={() => {}}
                    />
                    <Checkbox
                        title="Case final review"
                        checked={props.data.caseStatus >= 4}
                        onPress={() => {}}
                        color={theme.main.colors.green}
                    />
                    <Checkbox
                        title="Discharged"
                        checked={props.data.caseStatus >= 5}
                        onPress={() => {}}
                    />
                </CheckboxContainer>
            </FlexBetweenView>

            <FlexBetweenView paddingBottom={3}>
                <LeftTextContainer>
                    <DarkGrayText fontSize="16">Date of Injury</DarkGrayText>
                </LeftTextContainer>
                <RightTextContainer>
                    <DarkGrayText fontSize="16">
                        {moment(props.data.dateOfInjury).format('YYYY.MM.DD')}
                    </DarkGrayText>
                </RightTextContainer>
            </FlexBetweenView>

            <FlexBetweenView paddingBottom={3}>
                <LeftTextContainer>
                    <DarkGrayText fontSize="16">Attorney Info</DarkGrayText>
                </LeftTextContainer>
                <TouchableOpacity onPress={attorneyDetail}>
                    <RightTextContainer>
                        <GreenText underline="underline" fontSize="16">
                            Detail
                        </GreenText>
                    </RightTextContainer>
                </TouchableOpacity>
            </FlexBetweenView>

            <FlexBetweenView paddingBottom={3}>
                <LeftTextContainer>
                    <DarkGrayText fontSize="16">Insurance Info</DarkGrayText>
                </LeftTextContainer>
                <TouchableOpacity onPress={insuranceDetail}>
                    <RightTextContainer>
                        <GreenText underline="underline" fontSize="16">
                            Detail
                        </GreenText>
                    </RightTextContainer>
                </TouchableOpacity>
            </FlexBetweenView>
            {!_.isEmpty(props.data.schedule) && (
                <>
                    <FlexBetweenView>
                        <LeftTextContainer>
                            <DarkGrayText fontSize="16">Schedule</DarkGrayText>
                        </LeftTextContainer>
                        <RightTextContainer>
                            <DarkGrayText fontSize="16"></DarkGrayText>
                        </RightTextContainer>
                    </FlexBetweenView>
                    <FlexBetweenView paddingLeft={3} marginVertical={1}>
                        <LeftTextContainer>
                            <DarkGrayText fontSize="16">Date</DarkGrayText>
                        </LeftTextContainer>
                        <RightTextContainer>
                            <DarkGrayText fontSize="16">
                                {moment(props.data.schedule.StartTime).format(
                                    'MM/DD/YYYY',
                                )}
                            </DarkGrayText>
                        </RightTextContainer>
                    </FlexBetweenView>
                    <FlexBetweenView paddingLeft={3} marginVertical={1}>
                        <LeftTextContainer>
                            <DarkGrayText fontSize="16">Time</DarkGrayText>
                        </LeftTextContainer>
                        <RightTextContainer>
                            <DarkGrayText fontSize="16">
                                {`${moment(
                                    props.data.schedule.StartTime,
                                ).format('h:mm a')}-${moment(
                                    props.data.schedule.EndTime,
                                ).format('h:mm a')}`}
                            </DarkGrayText>
                        </RightTextContainer>
                    </FlexBetweenView>
                    <FlexBetweenView paddingLeft={3} marginVertical={1}>
                        <LeftTextContainer>
                            <DarkGrayText fontSize="16">Doctor</DarkGrayText>
                        </LeftTextContainer>
                        <RightTextContainer>
                            <DarkGrayText fontSize="16">{`Dr.${props.data.schedule.DoctorName}`}</DarkGrayText>
                        </RightTextContainer>
                    </FlexBetweenView>
                </>
            )}
        </ContentContainer>
    );
};

export default CaseDetail;
