import React from 'react';
import ContactUs from './ContactUs';
import Header from '../../../components/DrawHeader';
import { Routes } from '../../../app-config/constants';
import { IMLocalized } from '../../../services/localization/IMLocalization';

const ContactUsConfig = {
    name: Routes.CONTACTUS,
    component: ContactUs,
    options: {
        header: ({ navigation, scene }) => (
            <Header title={'Contact US'} navigation={navigation} />
        ),
    },
};

export default ContactUsConfig;
