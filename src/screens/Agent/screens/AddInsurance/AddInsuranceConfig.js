import React from 'react';
import AddInsurance from './AddInsurance';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const AddInsuranceConfig = {
    name: Routes.ADDINSURANCE,
    component: AddInsurance,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Add Insurance Info'} navigation={navigation} />
        ),
    },
};

export default AddInsuranceConfig;
