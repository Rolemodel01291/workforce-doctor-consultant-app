import React from 'react';
import BookDoctor from './BookDoctor';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const BookDoctorConfig = {
    name: Routes.BOOKDOCTOR,
    component: BookDoctor,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Book Doctor'} navigation={navigation} />
        ),
    },
};

export default BookDoctorConfig;
