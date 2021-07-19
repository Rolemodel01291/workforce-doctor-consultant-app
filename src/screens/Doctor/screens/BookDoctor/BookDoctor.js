import React from 'react';
import { Container } from '../../../../layouts/globalLayout';
import { theme } from '../../../../app-config/theme';
import { avatarImg, locationImg } from '../../../../assets/images';
import MainCard from '../../../../components/MainCard';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { ScrollView } from '../../../../layouts/globalLayout';
import { Routes } from '../../../../app-config/constants';

const BookDoctor = ({ navigation }) => {
    const items = [
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            time: '11:45 AM',
            checked: true,
        },
    ];

    return (
        <ScrollView>
            <Container
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.lightGray}>
                {items.map((item) => (
                    <MainCard
                        image={item.image}
                        title={item.name}
                        text={item.time}
                        icon='map-marker'
                        iconColor={theme.main.colors.green}
                        route={Routes.PATIENTDOCTORDETAIL}
                        type="ICON_BUTTON"
                    />
                ))}
            </Container>
        </ScrollView>
    );
};

export default BookDoctor;
