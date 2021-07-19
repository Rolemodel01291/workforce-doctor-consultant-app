import React from 'react';
import Calendar from './Calendar';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const DoctorCalendarConfig = {
    name: Routes.DOCTORCALENDAR,
    component: Calendar,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Calendar(Doctor)'} navigation={navigation} />
        ),
    },
};

export default DoctorCalendarConfig;
