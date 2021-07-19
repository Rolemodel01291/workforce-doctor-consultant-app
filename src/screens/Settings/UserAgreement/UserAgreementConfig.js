import React from 'react';
import UserAgreement from './UserAgreement';
import Header from '../../../components/DrawHeader';
import { Routes } from '../../../app-config/constants';
import { IMLocalized } from '../../../services/localization/IMLocalization';

const UserAgreementConfig = {
    name: Routes.USERAGREEMENT,
    component: UserAgreement,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'User Agreement'} navigation={navigation} />
        ),
    },
};

export default UserAgreementConfig;
