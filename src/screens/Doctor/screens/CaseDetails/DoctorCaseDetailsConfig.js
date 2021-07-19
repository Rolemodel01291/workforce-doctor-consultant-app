import React from 'react';
import CaseDetails from './CaseDetails';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const DoctorCaseDetailsConfig = {
    name: Routes.DOCTORCASEDETAILS,
    component: CaseDetails,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Case details(Doctor)'} navigation={navigation} />
        ),
    },
};

export default DoctorCaseDetailsConfig;
