import React from 'react';
import Font from './Font';
import Header from '../../../components/DrawHeader';
import { Routes } from '../../../app-config/constants';
import { IMLocalized } from '../../../services/localization/IMLocalization';

const FontConfig = {
    name: Routes.FONT,
    component: Font,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Font'} navigation={navigation} />
        ),
    },
};

export default FontConfig;
