import React from 'react';
import ForgetPassword from './ForgetPassword';
import Header from '../../components/DrawHeader';
import { Routes } from '../../app-config/constants';
import { IMLocalized } from '~/services/localization/IMLocalization';

const ForgetPasswordConfig = {
    name: Routes.FORGETPASSWORD,
    component: ForgetPassword,
    options: {
        header: ({ navigation, scene }) => (
            <Header
                title={IMLocalized('ForgotPassword')}
                navigation={navigation}
            />
        ),
    },
};

export default ForgetPasswordConfig;
