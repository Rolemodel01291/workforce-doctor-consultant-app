import React from 'react';
import AddNotes from './AddNotes';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const DoctorAddNotesConfig = {
    name: Routes.DOCTORADDNOTES,
    component: AddNotes,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Add Notes(Doctor)'} navigation={navigation} />
        ),
    },
};

export default DoctorAddNotesConfig;
