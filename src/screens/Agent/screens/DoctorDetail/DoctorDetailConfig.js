import React from 'react';
import DoctorDetail from './DoctorDetail';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const DoctorDetailConfig = {
    name: Routes.DOCTORDETAIL,
    component: DoctorDetail,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Doctor Info'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default DoctorDetailConfig;
