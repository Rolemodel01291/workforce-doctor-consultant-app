import React from 'react';
import ScheduleView from './ScheduleView';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const ScheduleViewConfig = {
    name: Routes.SCHEDULEVIEW,
    component: ScheduleView,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Schedule View'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default ScheduleViewConfig;
