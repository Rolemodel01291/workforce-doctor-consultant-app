import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Container, WrapContainer } from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    AvatarContainer,
    CardContainer,
    IconContainer,
    SendReminder,
    SwitchContainer,
} from '../../../../layouts/Agent/ScheduleView';
import {
    FlexBetweenView,
    RoundedImage,
    GrayText,
    GreenText,
    DarkGrayText,
    WhiteText,
} from '../../../../layouts/globalLayout';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import Week from '../../../../components/Week';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import {
    getDoctorSchedule,
    setWeekDay,
} from '../../../../store/reducers/doctorReducer';
import { WeekContainer } from '../../../../layouts/components/Week';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduleView = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedWeekDay = useSelector(({ doctor }) => doctor.selectedWeekDay);
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const schedules = useSelector(({ doctor }) => doctor.schedules);
    const [daySchedule, setDaySchedule] = useState([]);
    const weekItems = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

    useEffect(() => {
        if (selectedDoctor.UID)
            dispatch(getDoctorSchedule(selectedDoctor.UID)).then((res) => {
            });
    }, [selectedDoctor.UID]);

    useEffect(() => {
        if (schedules.length > 0) {
            const todaySchedule = schedules.filter((o) => {
                console.log(
                    moment(o.StartTime).format('YYYY-MM-DD ddd'),
                    weekItems[moment(o.StartTime).day()],
                    selectedWeekDay,
                );
                if (
                    weekItems[moment(o.StartTime).day()] === selectedWeekDay &&
                    moment(o.StartTime).isSame(new Date(), 'week')
                ) {
                    return o;
                }
            });

            setDaySchedule(todaySchedule);
        }
    }, [selectedWeekDay]);

    function handlePress(data) {
        dispatch(setWeekDay(weekItems[data]));
    }

    return (
        <>
            <WrapContainer display="flex" align="center">
                <AvatarContainer>
                    <RoundedImage
                        backgroundColor={theme.main.colors.fauxBlackOlive}
                        source={doctorAvatarImg}
                    />
                </AvatarContainer>
                <DarkGrayText fontSize={24}>
                    {`Dr. ${selectedDoctor.Name}`}
                </DarkGrayText>
                <SwitchContainer>{/* <CustomSwitch /> */}</SwitchContainer>
                <FlexBetweenView width={94}>
                    <GrayText fontSize={14}>Schedules</GrayText>
                    <TouchableOpacity
                        onPress={(ev) => navigation.navigate(Routes.CALENDAR)}>
                        <GreenText fontSize={12}>Canender</GreenText>
                    </TouchableOpacity>
                </FlexBetweenView>

                <WeekContainer>
                    <Week
                        onPress={(data) => handlePress(data)}
                        value={weekItems[moment(new Date()).day()]}
                    />
                </WeekContainer>
            </WrapContainer>

            <ScrollView style={{backgroundColor:theme.main.colors.white}}>
                {daySchedule.map((schedule) => (
                    <CardContainer>
                        <IconContainer>
                            <Icon
                                color={theme.main.colors.red}
                                name="check-circle"
                                size={20}
                            />
                        </IconContainer>
                        <FlexBetweenView width={80}>
                            <DarkGrayText fontSize={18}>
                                {schedule.CaseName}
                            </DarkGrayText>
                            <GrayText
                                fontSize={
                                    14
                                }>{`Patient: ${schedule.PatientName}`}</GrayText>
                        </FlexBetweenView>
                        <FlexBetweenView width={85}>
                            <GrayText fontSize={14}>{`${moment(
                                schedule.StartTime,
                            ).format('HH')}:00-${moment(
                                schedule.EndTime,
                            ).format('HH')}:00`}</GrayText>
                        </FlexBetweenView>
                    </CardContainer>
                ))}
            </ScrollView>
        </>
    );
};

export default ScheduleView;
