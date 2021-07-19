import React from 'react';
import { theme } from '../../../app-config/theme';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import { Content } from '../../../layouts/Settings/UserAgreement';
import { Container, DarkGrayText } from '../../../layouts/globalLayout';
import { agreement } from '../SettingsHome/Settings';

const UserAgreement = ({ navigation }) => {
    return (
        <Container display="flex" align="center" justify="flex-start">
            <Content>
                <DarkGrayText lineHeight={20}>{agreement}</DarkGrayText>
            </Content>
        </Container>
    );
};

export default UserAgreement;
