import React from 'react';
import CreateDoctor from './CreateDoctor';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const CreateDoctorConfig = {
    name: Routes.CREATEDOCTOR,
    component: CreateDoctor,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Create Doctor Account'} navigation={navigation} color={theme.main.colors.white} />
        ),
    },
};

export default CreateDoctorConfig;
