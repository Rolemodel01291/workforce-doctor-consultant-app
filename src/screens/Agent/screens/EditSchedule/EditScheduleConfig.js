import React from 'react';
import EditSchedule from './EditSchedule';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const EditScheduleConfig = {
    name: Routes.EDITSCHEDULE,
    component: EditSchedule,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Edit Schedule'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default EditScheduleConfig;
