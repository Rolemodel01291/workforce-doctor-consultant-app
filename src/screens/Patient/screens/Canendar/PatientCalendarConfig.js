import React from 'react';
import Calendar from './Calendar';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const PatientCalendarConfig = {
    name: Routes.PATIENTCALENDAR,
    component: Calendar,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Calendar(Patient)'} navigation={navigation} />
        ),
    },
};

export default PatientCalendarConfig;
