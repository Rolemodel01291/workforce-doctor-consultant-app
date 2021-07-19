import React from 'react';
import Calendar from './Calendar';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const CalendarConfig = {
    name: Routes.CALENDAR,
    component: Calendar,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Calendar'} navigation={navigation} />
        ),
    },
};

export default CalendarConfig;
