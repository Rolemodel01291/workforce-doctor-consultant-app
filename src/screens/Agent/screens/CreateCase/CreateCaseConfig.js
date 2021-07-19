import React from 'react';
import CreateCase from './CreateCase';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const CreateCaseConfig = {
    name: Routes.CREATECASE,
    component: CreateCase,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Create Case'} navigation={navigation} />
        ),
    },
};

export default CreateCaseConfig;
