import React from 'react';
import AddPatient from './AddPatient';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const AddPatientConfig = {
    name: Routes.ADDPATIENT,
    component: AddPatient,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Add Patient'} navigation={navigation} color={theme.main.colors.white} />
        ),
    },
};

export default AddPatientConfig;
