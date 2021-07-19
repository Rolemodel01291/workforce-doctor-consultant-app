import React from 'react';
import { theme } from '../../../app-config/theme';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import {
    Content,
    TextInputContainer,
} from '../../../layouts/Settings/ContactUs';
import { Container, GrayText, ScrollView } from '../../../layouts/globalLayout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';

const ContactUs = ({ navigation }) => {
    return (
        <ScrollView>
            <Container display="flex" align="center" justify="flex-start">
                <Content>
                    <TextInputContainer>
                        <GrayText>TEL</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <TextInputContainer>
                        <GrayText>E-mail</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <TextInputContainer>
                        <GrayText>Address line1</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <TextInputContainer>
                        <GrayText>Address line2</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <TextInputContainer>
                        <GrayText>City</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <TextInputContainer>
                        <GrayText>City Code</GrayText>
                        <TextInput width={90} height={6} borderRad={0} />
                    </TextInputContainer>

                    <Button
                        width={90}
                        height={6}
                        borderRadius={10}
                        text="Contant US"
                    />
                </Content>
            </Container>
        </ScrollView>
    );
};

export default ContactUs;
