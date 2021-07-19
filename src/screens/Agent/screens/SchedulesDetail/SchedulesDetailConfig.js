import React from 'react';
import SchedulesDetail from './SchedulesDetail';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const SchedulesDetailConfig = {
    name: Routes.SCHEDULESDETAIL,
    component: SchedulesDetail,
    options: {
        header: ({ navigation, scene }) => (
            <Header
                title={'Detail'}
                navigation={navigation}
                subtitle="Calender"
                router={Routes.SCHEDULESSEARCH}
                color={theme.main.colors.white}
            />
        ),
    },
};

export default SchedulesDetailConfig;
