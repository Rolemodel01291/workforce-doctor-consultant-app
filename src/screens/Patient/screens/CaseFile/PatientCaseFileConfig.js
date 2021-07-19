import React from 'react';
import CaseFile from './CaseFile';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const PatientCaseFileConfig = {
    name: Routes.PATIENTCASEFILE,
    component: CaseFile,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Case File(Patient)'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default PatientCaseFileConfig;
