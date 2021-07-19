import React from 'react';
import CaseDetails from './CaseDetails';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const PatientCaseDetailsConfig = {
    name: Routes.PATIENTCASEDETAILS,
    component: CaseDetails,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Case details(Patient)'} navigation={navigation} />
        ),
    },
};

export default PatientCaseDetailsConfig;
