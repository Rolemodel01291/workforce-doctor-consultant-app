import React from 'react';
import Language from './Language';
import Header from '../../../components/DrawHeader';
import { Routes } from '../../../app-config/constants';
import { IMLocalized } from '../../../services/localization/IMLocalization';

const LanguageConfig = {
    name: Routes.LANGUAGE,
    component: Language,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Language'} navigation={navigation} />
        ),
    },
};

export default LanguageConfig;
