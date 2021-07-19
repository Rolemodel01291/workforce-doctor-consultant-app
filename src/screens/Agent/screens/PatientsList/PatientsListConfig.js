import React from 'react';
import PatientsList from './PatientsList';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const PatientsListConfig = {
    name: Routes.PATIENTSLIST,
    component: PatientsList,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Patients List'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default PatientsListConfig;
