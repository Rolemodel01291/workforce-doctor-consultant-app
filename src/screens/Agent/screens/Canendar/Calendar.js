import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import LoadingSpinner from '~/components/LoadingSpinner';
import {
    Container,
    InnerContainer,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { theme } from '../../../../app-config/theme';
import { BlackText, GrayText } from '../../../../layouts/globalLayout';
import Calendar from '../../../../components/Calendar';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import {
    CalendarContainer,
    Item,
    Items,
    TextContainer,
    VerticalLine,
} from '../../../../layouts/Agent/ScheduleCalendar';
import { TouchableOpacity, ScrollView } from 'react-native';
import { getDoctorSchedule } from '../../../../store/reducers/doctorReducer';

const ScheduleCalendar = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const weekItems = [ 'SUN','MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
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
        if (selectedDoctor.UID) {
            var tempMarkedDate = {};
            setState({ ...state, visible: true });
            dispatch(getDoctorSchedule(selectedDoctor.UID)).then((res) => {
                console.log(res.payload);
                const data = res.payload;
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
        }
    }, [dispatch]);

    const handleDate = (dateString) => {
        setScheduleDate(dateString);
    };

    return (
        <Container
            display="flex"
            align="center"
            justify="flex-start"
            color={theme.main.colors.white}>
            <LoadingSpinner isLoading={visible} text="Loading..." />
            <Calendar
                onDayPress={handleDate}
                currentDate={scheduleDate}
                markedDate={state.markedDate}
            />
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
                                            }>{`Metting with ${item.PatientName}`}</BlackText>
                                        <GrayText fontSize={12}>
                                            {`${moment(item.StartTime).format(
                                                'h:mm a',
                                            )} - ${moment(
                                                item.EndTime,
                                            ).format('h:mm a')}`}
                                        </GrayText>
                                    </TextContainer>
                                </Item>
                            );
                    })}
                </Items>
            </ScrollView>
        </Container>
    );
};

export default ScheduleCalendar;
