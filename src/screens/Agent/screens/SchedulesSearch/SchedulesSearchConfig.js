import React from 'react';
import SchedulesSearch from './SchedulesSearch';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const SchedulesSearchConfig = {
    name: Routes.SCHEDULESSEARCH,
    component: SchedulesSearch,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Calendar'} navigation={navigation} />
        ),
    },
};

export default SchedulesSearchConfig;
