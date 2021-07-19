import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { theme } from '../../../../app-config/theme';
import {
    HeaderContainer,
    MiddleContainer,
} from '../../../../layouts/Doctor/Dashboard';
import {
    Container,
    GrayText,
    DarkBlueText,
    ScrollView,
    InnerContainer,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { TouchableOpacity } from 'react-native';
import CaseCard from './CaseCard';
import ScheduleCard from './ScheduleCard';
import { getSchedule } from '../../../../store/reducers/doctorReducer';
import { setCase } from '../../../../store/reducers/agentReducer';

const DashboardHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const uid = useSelector(({ auth }) => auth.userData.uid);
    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const today = moment().set({ hour: 0, minute: 0, second: 0 }).valueOf();
    const tomorrow = moment()
        .add(1, 'days')
        .set({ hour: 0, minute: 0, second: 0 })
        .valueOf();
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
                dispatch(
                    getSchedule({
                        uid,
                    }),
                ).then((res) => {
                    console.log({
                        today: moment()
                            .set({ hour: 0, minute: 0, second: 0 })
                            .valueOf(),
                        tomorrow: moment()
                            .add(1, 'days')
                            .set({ hour: 0, minute: 0, second: 0 })
                            .valueOf(),
                        uid,
                    });
                    setSchedules(res.payload);
                });

            return () => {
                isActive = false;
            };
        }, []),
    );

    const caseInfo = {
        date: '02/02/2021',
        total: 50,
        time: '5:00 pm',
    };

    const schedule = {
        date: 20,
        month: 'Feb',
        time: '11:00 am',
    };

    const handleCaseDetailPress = async (CaseReference) => {
        const caseData = await CaseReference.get();
        dispatch(setCase(caseData.data()));
        navigation.navigate(Routes.DOCTORCASEDETAILS);
    };

    const handleSendReminderPress = (ev) => {};

    return (
        <ScrollView style={{backgroundColor: theme.main.colors.white}}>
            <WrapContainer
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.whiteSmoke}>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start">
                    <HeaderContainer>
                        <DarkBlueText fontSize={24}>Hello Doctor</DarkBlueText>
                    </HeaderContainer>
                    <CaseCard {...caseInfo} />
                    <MiddleContainer>
                        <DarkBlueText fontSize={14}>
                            Today's schedule
                        </DarkBlueText>
                        <GrayText>...</GrayText>
                    </MiddleContainer>
                    {schedules.map((schedule, index) => {
                        if (
                            schedule.StartTime > today &&
                            schedule.StartTime < tomorrow
                        ) {
                            return (
                                <ScheduleCard
                                    key={index}
                                    {...schedule}
                                    onCaseDetailPress={handleCaseDetailPress}
                                    onSendReminderPress={
                                        handleSendReminderPress
                                    }
                                />
                            );
                        }
                    })}
                </InnerContainer>
            </WrapContainer>
        </ScrollView>
    );
};

export default DashboardHome;
