import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    AvatarContainer,
    RoundedBox,
    RoundedInnerBox,
    SendReminder,
    SwitchContainer,
} from '../../../../layouts/Agent/EditSchedule';
import {
    Container,
    IconImage,
    FlexBetweenView,
    RoundedImage,
    GrayText,
    GreenText,
    DarkGrayText,
    WhiteText,
    ScrollView,
} from '../../../../layouts/globalLayout';
import { addImg } from '../../../../assets/images';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import Week from '../../../../components/Week';
import { Text, TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import { WeekContainer } from '../../../../layouts/components/Week';

const MySchedule = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedWeekDay = useSelector(({ doctor }) => doctor.selectedWeekDay);
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const schedules = useSelector(({ doctor }) => doctor.schedules);
    const items = [
        {
            time: '9.00-11.00 am',
            flag: true,
        },
        {
            time: '9.00-11.00 am',
            flag: true,
        },
        {
            time: '9.00-11.00 am',
            flag: false,
        },
        {
            time: '9.00-11.00 am',
            flag: true,
        },
    ];

    function handlePress(data) {
        console.log(data);
    }

    return (
        <ScrollView>
            <Container
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.lightGray}>
                <AvatarContainer>
                    <RoundedImage
                        backgroundColor={theme.main.colors.fauxBlackOlive}
                        source={doctorAvatarImg}
                    />
                </AvatarContainer>
                <DarkGrayText fontSize={24}> DR.Ronald Joseph</DarkGrayText>
                <GrayText>neurosurgeon specialist</GrayText>
                <SwitchContainer>{/* <CustomSwitch /> */}</SwitchContainer>
                <FlexBetweenView width={94}>
                    <GrayText>Schedules</GrayText>
                    <TouchableOpacity
                        onPress={(ev) =>
                            navigation.navigate(Routes.SCHEDULECALENDAR)
                        }>
                        <GreenText>Canender</GreenText>
                    </TouchableOpacity>
                </FlexBetweenView>

                <WeekContainer>
                    <Week onPress={(data) => handlePress(data)} />
                </WeekContainer>

                {items.map((item) => (
                    <RoundedBox data={item}>
                        <RoundedInnerBox
                            backgroundColor={
                                item.flag
                                    ? theme.main.colors.green
                                    : theme.main.colors.white
                            }>
                            {item.flag ? (
                                <WhiteText>{item.time}</WhiteText>
                            ) : (
                                <GrayText fontSize={12}>{item.time}</GrayText>
                            )}
                        </RoundedInnerBox>
                        <TouchableOpacity
                            onPress={(ev) =>
                                navigation.navigate(Routes.PATIENTSLIST)
                            }>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                ))}

                <TouchableOpacity>
                    <Button
                        height={6}
                        width={40}
                        marginVertical={4}
                        text="Save"
                        backgroundColor={theme.main.colors.main}
                        color={theme.main.colors.white}
                    />
                </TouchableOpacity>
            </Container>
        </ScrollView>
    );
};

export default MySchedule;
