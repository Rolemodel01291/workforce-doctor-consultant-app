import React from 'react';
import Privacy from './Privacy';
import Header from '../../../components/DrawHeader';
import { Routes } from '../../../app-config/constants';
import { IMLocalized } from '../../../services/localization/IMLocalization';

const PrivacyConfig = {
    name: Routes.PRIVACY,
    component: Privacy,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Privacy'} navigation={navigation} />
        ),
    },
};

export default PrivacyConfig;
