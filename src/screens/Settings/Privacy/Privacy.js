import React from 'react';
import { theme } from '../../../app-config/theme';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import { Content } from '../../../layouts/Settings/Privacy';
import { Container, DarkGrayText } from '../../../layouts/globalLayout';
import { privacy } from '../SettingsHome/Settings';

const Privacy = ({ navigation }) => {
    return (
        <Container display="flex" align="center" justify="flex-start">
            <Content>
                <DarkGrayText lineHeight={20}>{privacy}</DarkGrayText>
            </Content>
        </Container>
    );
};

export default Privacy;
