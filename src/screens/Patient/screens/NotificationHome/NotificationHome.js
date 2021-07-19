import React from 'react';
import {
    Container,
    AvatarImage,
    InnerContainer,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import { ButtonGroup } from '../../../../layouts/Patient/NotificationHome';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Card3 from '../../../../components/Card3';

const NotificationHome = ({ navigation }) => {
    const items = [
        {
            title: 'General Physician @99',
            description: 'Cold, fever, cough or flu Chat with a doctor now',
        },
        {
            title: 'General Physician @99',
            description: 'Cold, fever, cough or flu Chat with a doctor now',
        },
        {
            title: 'General Physician @99',
            description: 'Cold, fever, cough or flu Chat with a doctor now',
        },
        {
            title: 'General Physician @99',
            description: 'Cold, fever, cough or flu Chat with a doctor now',
        },
        {
            title: 'General Physician @99',
            description: 'Cold, fever, cough or flu Chat with a doctor now',
        },
    ];

    function onChange(text) {
        console.log(text);
    }

    return (
        <Container display="flex" align="center" justify="flex-start">
            <ScrollView>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start"
                    paddingTop={3}
                    paddingBottom={5}>
                    {items.map((item) => (
                        <Card3
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </InnerContainer>
            </ScrollView>
        </Container>
    );
};

export default NotificationHome;
