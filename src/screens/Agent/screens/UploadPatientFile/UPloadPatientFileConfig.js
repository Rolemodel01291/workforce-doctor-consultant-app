import React from 'react';
import UploadPatientFile from './UploadPatientFile';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { theme } from '../../../../app-config/theme';

const UploadPatientFileConfig = {
    name: Routes.UPLOADPATIENTFILE,
    component: UploadPatientFile,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Upload Patient File'} navigation={navigation} color={theme.main.colors.lightGray} />
        ),
    },
};

export default UploadPatientFileConfig;
