import React from 'react';
import { Container, InnerContainer } from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    ContentHeaderContainer,
    ContentContainer,
} from '../../../../layouts/PatientsHome';
import { FlexBetweenView, Divider } from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg, newImg } from '../../../../assets/images';
import IconButton from '../../../../components/IconButton';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

const PatientsHome = ({ navigation }) => {
    const users = [
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
        {
            image: avatarImg,
            name: 'Eddie Sparks',
            text: 'Please do not say that...',
            time: '11:45 AM',
        },
    ];

    return (
        <Container display="flex" align="center" justify="flex-start">
            <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Routes.ADDPATIENT)}>
                    <IconButton source={newImg} text="add new" fontSize={11} />
                </TouchableOpacity>
            </FlexBetweenView>
            <Divider marginBottom={3} />
            <ContentHeaderContainer>
                <FlexBetweenView
                    width="100%"
                    paddingLeft={1}
                    paddingRight={1}
                    paddingBottom={1}
                    justifyContent="space-around">
                    <TouchableOpacity>
                        <Button height={4} width={20} text="Name" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button height={4} width={20} text="Case" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button height={4} width={15} text="Date" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button height={4} width={25} text="Current Status" />
                    </TouchableOpacity>
                </FlexBetweenView>
            </ContentHeaderContainer>
            <ScrollView>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start"
                    paddingBottom={5}>
                    {users.map((user) => (
                        <MainCard
                            textGroupWidth={40}
                            image={user.image}
                            title={user.name}
                            text={user.text}
                            time={user.time}
                            type="TEXT_BUTTON"
                            navigation={navigation}
                            route={Routes.CASEDETAILS}
                            route2={Routes.CREATECASE}
                        />
                    ))}
                </InnerContainer>
            </ScrollView>
        </Container>
    );
};

export default PatientsHome;
