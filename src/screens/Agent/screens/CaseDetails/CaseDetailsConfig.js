import React from 'react';
import CaseDetails from './CaseDetails';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const CaseDetailsConfig = {
    name: Routes.CASEDETAILS,
    component: CaseDetails,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Case details'} navigation={navigation} />
        ),
    },
};

export default CaseDetailsConfig;
