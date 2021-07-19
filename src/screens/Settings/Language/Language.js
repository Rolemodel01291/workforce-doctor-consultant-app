import React, { useState } from 'react';
import { theme } from '../../../app-config/theme';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import { Content } from '../../../layouts/Settings/Language';
import { Container, DarkGrayText } from '../../../layouts/globalLayout';
import Checkbox from '../../../components/Checkbox';
import { languages } from '../SettingsHome/Settings';

const Language = ({ navigation }) => {
    function handleCheck() {}

    return (
        <Container display="flex" align="center" justify="flex-start">
            <Content>
                <DarkGrayText>Language</DarkGrayText>
                {languages.map((language) => (
                    <Checkbox
                        key={language}
                        type="radiobox"
                        title={language}
                        checked={true}
                        onPress={(ev) => handleCheck(ev)}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default Language;
