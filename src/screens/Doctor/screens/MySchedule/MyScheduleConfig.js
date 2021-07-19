import React from 'react';
import MySchedule from './MySchedule';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const MyScheduleConfig = {
    name: Routes.MYSCHEDULE,
    component: MySchedule,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'My Schedule'} navigation={navigation} />
        ),
    },
};

export default MyScheduleConfig;
