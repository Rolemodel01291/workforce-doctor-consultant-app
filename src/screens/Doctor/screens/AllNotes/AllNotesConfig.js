import React from 'react';
import AllNotes from './AllNotes';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const AllNotesConfig = {
    name: Routes.ALLNOTES,
    component: AllNotes,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'All Notes'} navigation={navigation} />
        ),
    },
};

export default AllNotesConfig;
