import React from 'react';
import CaseFinalReview from './CaseFinalReview';
import Header from '../../../../components/DrawHeader';
import { Routes } from '../../../../app-config/constants';
import { IMLocalized } from '../../../../services/localization/IMLocalization';

const CaseFinalReviewConfig = {
    name: Routes.CASEFINALREVIEW,
    component: CaseFinalReview,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Case Final Review'} navigation={navigation} />
        ),
    },
};

export default CaseFinalReviewConfig;
