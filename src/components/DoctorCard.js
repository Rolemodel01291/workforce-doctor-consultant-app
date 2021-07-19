import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Button from './Button';
import { theme } from '../app-config/theme';
import { RoundedContainer, TextContainer } from '../layouts/Agent/DoctorsHome';
import {
    FlexBetweenView,
    GrayText,
    DarkGrayText,
    BlackText,
} from '../layouts/globalLayout';
import Icon from 'react-native-vector-icons/Octicons';
import { IMLocalized } from '../services/localization/IMLocalization';
import { Routes } from '../app-config/constants';
import { doctorAvatarImg } from '../assets/images';
import { RoundedImage } from '../layouts/globalLayout';

export const Doctor = (props) => (
    <RoundedContainer>
        <TouchableOpacity onPress={() => props.handleIconPress(props.data)}>
        <FlexBetweenView justifyContent="space-between">
            <FlexBetweenView paddingBottom={2} justifyContent="flex-start">
                <RoundedImage
                    backgroundColor={theme.main.colors.dark}
                    source={
                        props.data.Avatar
                            ? { uri: props.data.Avatar }
                            : doctorAvatarImg
                    }
                />
                <TextContainer flexDirection="column">
                    <DarkGrayText fontSize={24}>
                        {`Dr. ${props.data.Name}`}
                    </DarkGrayText>
                    <GrayText>{props.data.Description}</GrayText>
                </TextContainer>
            </FlexBetweenView>
            
                {props.data.open ? <Icon
                    name="chevron-down"
                    color={theme.main.colors.gray}
                    size={20}
                /> : <Icon
                name="chevron-right"
                color={theme.main.colors.gray}
                size={20}
            />}
        </FlexBetweenView>
        <FlexBetweenView paddingBottom={2} justifyContent="flex-start">
            <DarkGrayText>{`${props.data.Tech} years exp. `}</DarkGrayText>
            <BlackText>{`| Consultation: `}</BlackText>
            <GrayText>{props.data.consultation}</GrayText>
        </FlexBetweenView>

        {props.data.open && (
            <>
                <DarkGrayText>{`Description: ${props.data.Description}`}</DarkGrayText>
                <TouchableOpacity>
                    <FlexBetweenView justifyContent="flex-end">
                        <Button
                            onPress={() => props.handleDetailPress(props.data)}
                            height={5}
                            width={25}
                            text={'Detail'}
                            backgroundColor={theme.main.colors.green}
                            color={theme.main.colors.white}
                            borderRadius={12}
                        />
                    </FlexBetweenView>
                </TouchableOpacity>
            </>
        )}</TouchableOpacity>
    </RoundedContainer>
);
