import React from 'react';
import UploadPatientFile from './UploadPatientFile';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const PatientUploadPatientFileConfig = {
    name: Routes.PATIENTUPLOADPATIENTFILE,
    component: UploadPatientFile,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Upload Patient File(Patient)'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default PatientUploadPatientFileConfig;
