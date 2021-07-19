import React from 'react';
import AddAttorney from './AddAttorney';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const AddAttorneyConfig = {
    name: Routes.ADDATTORNEY,
    component: AddAttorney,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Add Attorney Info'} navigation={navigation} />
        ),
    },
};

export default AddAttorneyConfig;
