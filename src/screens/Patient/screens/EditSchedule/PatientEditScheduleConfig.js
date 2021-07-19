import React from 'react';
import PatientEditSchedule from './PatientEditSchedule';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const PatientEditScheduleConfig = {
    name: Routes.PATIENTEDITSCHEDULE,
    component: PatientEditSchedule,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Edit Schedule'} navigation={navigation} />
        ),
    },
};

export default PatientEditScheduleConfig;
