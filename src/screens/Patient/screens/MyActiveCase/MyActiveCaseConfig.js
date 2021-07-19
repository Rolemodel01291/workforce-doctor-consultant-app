import React from 'react';
import MyActiveCase from './MyActiveCase';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const MyActiveCaseConfig = {
    name: Routes.MYACTIVECASE,
    component: MyActiveCase,
    options: {
        header: ({ navigation, scene }) => (
            <Header
                title={'My Active Case'}
                navigation={navigation}
                subtitle="Calender"
                router={Routes.PATIENTCALENDAR}
                color={theme.main.colors.lightGray}
            />
        ),
    },
};

export default MyActiveCaseConfig;
