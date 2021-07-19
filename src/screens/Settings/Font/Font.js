import React, { useState } from 'react';
import { theme } from '../../../app-config/theme';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import { Content, FontSize } from '../../../layouts/Settings/Font';
import { Container, DarkGrayText } from '../../../layouts/globalLayout';
import Checkbox from '../../../components/Checkbox';
import TextInput from '../../../components/TextInput';
import { fonts } from '../SettingsHome/Settings';

const Font = ({ navigation }) => {
    function handleCheck() {}

    return (
        <Container display="flex" align="center" justify="flex-start">
            <Content>
                <DarkGrayText>Font</DarkGrayText>
                {fonts.map((font) => (
                    <Checkbox
                        key={font}
                        type="radiobox"
                        title={font}
                        checked={true}
                        onPress={(ev) => handleCheck(ev)}
                    />
                ))}
                <FontSize>
                    <DarkGrayText>Font Size</DarkGrayText>
                    <TextInput width={50} height={4} />
                </FontSize>
            </Content>
        </Container>
    );
};

export default Font;
