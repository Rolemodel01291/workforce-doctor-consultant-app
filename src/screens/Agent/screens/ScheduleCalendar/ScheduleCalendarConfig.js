import React from 'react';
import ScheduleCalendar from './ScheduleCalendar';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const ScheduleCalendarConfig = {
    name: Routes.SCHEDULECALENDAR,
    component: ScheduleCalendar,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Calendar'} navigation={navigation} />
        ),
    },
};

export default ScheduleCalendarConfig;
