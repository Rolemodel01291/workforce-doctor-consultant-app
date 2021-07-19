import React from 'react';
import AddNotes from './AddNotes';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const AddNotesConfig = {
    name: Routes.ADDNOTES,
    component: AddNotes,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Add Notes'} navigation={navigation} />
        ),
    },
};

export default AddNotesConfig;
