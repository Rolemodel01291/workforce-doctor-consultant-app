import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import {
    Container,
    InnerContainer,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { theme } from '../../../../app-config/theme';
import {
    CalendarContainer,
    Item,
    Items,
    TextContainer,
    VerticalLine,
} from '../../../../layouts/Agent/ScheduleCalendar';
import LoadingSpinner from '~/components/LoadingSpinner';
import { BlackText, GrayText } from '../../../../layouts/globalLayout';
import Calendar from '../../../../components/Calendar';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { getPatientSchedule } from '../../../../store/reducers/patientReducer';

const ScheduleCalendar = ({ navigation }) => {
    const dispatch = useDispatch();
    const uid = useSelector(({ auth }) => auth.userData.uid);
    const weekItems = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    const [scheduleDate, setScheduleDate] = useState(
        moment().format('YYYY-MM-DD'),
    );

    const [state, setState] = useState({
        visible: false,
        scheduleData: [],
        markedDate: {},
    });

    const { visible } = state;

    useEffect(() => {
        if (uid) {
            var tempMarkedDate = {};
            setState({ ...state, visible: true });
            dispatch(getPatientSchedule(uid)).then((res) => {
                new Promise.all(
                    res.payload.map(async (scheduleReference) => {
                        const scheduleData = await scheduleReference.get();
                        return scheduleData.data();
                    }),
                ).then((data) => {
                    data.map((item) => {
                        tempMarkedDate = {
                            ...tempMarkedDate,
                            [moment(item.StartTime).format('YYYY-MM-DD')]: {
                                marked: true,
                            },
                        };
                    });
                    setState({
                        ...state,
                        scheduleData: data,
                        markedDate: tempMarkedDate,
                        visible: false,
                    });
                });
            });
        }
    }, [dispatch, uid]);

    // useEffect(()=>{},[setScheduleDate])

    const handleDate = (dateString) => {
        setScheduleDate(dateString);
    };

    return (
        <>
            <InnerContainer>
                <CalendarContainer>
                    <Calendar
                        onDayPress={handleDate}
                        currentDate={scheduleDate}
                        markedDate={state.markedDate}
                    />
                </CalendarContainer>
            </InnerContainer>
            <LoadingSpinner isLoading={visible} text="Loading..." />
            <ScrollView>
                <Items>
                    {state.scheduleData.map((item, index) => {
                        if (
                            scheduleDate ===
                            moment(item.StartTime).format('YYYY-MM-DD')
                        )
                            return (
                                <Item key={index}>
                                    <TextContainer>
                                        <BlackText fontSize={12}>
                                            {index + 1}
                                        </BlackText>
                                        <BlackText fontSize={12}>
                                            {
                                                weekItems[
                                                    moment(item.EndTime).day() 
                                                ]
                                            }
                                        </BlackText>
                                    </TextContainer>
                                    <VerticalLine />
                                    <TextContainer>
                                        <BlackText
                                            fontSize={
                                                12
                                            }>{`Metting with ${item.DoctorName}`}</BlackText>
                                        <GrayText fontSize={12}>
                                            {`${moment(item.StartTime).format(
                                                'HH',
                                            )}:00 - ${moment(
                                                item.EndTime,
                                            ).format('h:mm a')}`}
                                        </GrayText>
                                    </TextContainer>
                                </Item>
                            );
                    })}
                </Items>
            </ScrollView>
        </>
    );
};

export default ScheduleCalendar;
