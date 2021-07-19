import React from 'react';
import moment from 'moment';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import {
    DateCardContainer,
    ScheduleCardContainer,
    ScheduleCardTextContainer,
} from '../../../../layouts/Doctor/Dashboard';
import {
    FlexBetweenView,
    LightBlueText,
    WhiteText,
} from '../../../../layouts/globalLayout';
import { TouchableOpacity } from 'react-native';
const ScheduleCard = (props) => {
    const { StartTime, onCaseDetailPress, onSendReminderPress, PatientName, CaseReference } = props;
    console.log(moment(moment()
    .set({
        hour: 14,
        minute: 0,
        second: 0,
    })
    .valueOf()).format('hh:mm a'))
    return (
        <ScheduleCardContainer>
            <DateCardContainer>
                <LightBlueText fontSize={20}>{`${moment(StartTime).format('Do')}`}</LightBlueText>
                <LightBlueText fontSize={20}>{`${moment(StartTime).format('ddd')}`}</LightBlueText>
                <LightBlueText fontSize={12}>{`${moment(StartTime).format('hh:mm a')}`}</LightBlueText>
            </DateCardContainer>
            <ScheduleCardTextContainer>
                <WhiteText fontSize={24}>{PatientName}</WhiteText>
                <FlexBetweenView width={50}>
                    <TouchableOpacity onPress={()=>onCaseDetailPress(CaseReference)}>
                        <WhiteText underline="underline" fontSize={12}>
                            View case detail
                        </WhiteText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCaseDetailPress}>
                        <WhiteText underline="underline" fontSize={12}>
                            Send reminder
                        </WhiteText>
                    </TouchableOpacity>
                </FlexBetweenView>
            </ScheduleCardTextContainer>
        </ScheduleCardContainer>
    );
};

export default ScheduleCard;
