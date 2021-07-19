import React from 'react';
import BookDoctor from './BookDoctor';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const BookDoctorConfig = {
    name: Routes.BOOKDOCTOR,
    component: BookDoctor,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Book Doctor'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default BookDoctorConfig;
