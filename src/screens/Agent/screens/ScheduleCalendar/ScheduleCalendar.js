import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { BlackText, GrayText } from '../../../../layouts/globalLayout';
import Calendar from '../../../../components/Calendar';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { TouchableOpacity, ScrollView } from 'react-native';

const ScheduleCalendar = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedWeekDay = useSelector(({ doctor }) => doctor.selectedWeekDay);
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const schedules = useSelector(({ doctor }) => doctor.schedules);
    const items = [
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 4,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 6,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
        {
            number: 7,
            day: 'NOV',
            text: 'Metting with Jim and Pam',
            time: '900-11.00 AM',
        },
    ];

    function handlePress(ev, item) {
        console.log(item);
    }

    return (
        <>
            <InnerContainer>
                <CalendarContainer>
                    <Calendar />
                </CalendarContainer>
            </InnerContainer>
            <ScrollView>
                <Items>
                    {items.map((item) => (
                        <Item>
                            <TextContainer>
                                <BlackText fontSize={12}>
                                    {item.number}
                                </BlackText>
                                <BlackText fontSize={12}>{item.day}</BlackText>
                            </TextContainer>
                            <VerticalLine />
                            <TextContainer>
                                <BlackText fontSize={12}>{item.text}</BlackText>
                                <GrayText fontSize={12}>{item.time}</GrayText>
                            </TextContainer>
                        </Item>
                    ))}
                </Items>
            </ScrollView>
        </>
    );
};

export default ScheduleCalendar;
