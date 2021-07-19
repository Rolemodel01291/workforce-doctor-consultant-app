import React, { useState } from 'react';
import {
    Container,
    DarkGrayText,
    ScrollView,
    InnerContainer,
    BlackText,
} from '../../../layouts/globalLayout';
import { IMLocalized } from '../../../services/localization/IMLocalization';
import { Routes } from '../../../app-config/constants';
import { TouchableOpacity } from 'react-native';
import { TitleContainer, ItemContainer, Item } from '../../../layouts/Settings/SettingsHome';
import Icon from 'react-native-vector-icons/Octicons';
import Switch from '../../../components/Switch';
import { settings } from './Settings';

const SettingsHome = ({ navigation }) => {
    const [open, setOpen] = useState(false);    

    function handlePress(item) {
        // if (item.type == 'DROPDOWN') {
        //     setOpen(!open);
        // }
        navigation.navigate(item.router);
    }

    return (
        <Container display="flex" align="center" justify="flex-start">
            <ScrollView>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start">
                    {settings.map((setting) => (
                        <ItemContainer>
                            <TitleContainer>
                                <BlackText fontSize={20}>
                                    {setting.title}
                                </BlackText>
                                <BlackText fontSize={12}>
                                    {setting.description}
                                </BlackText>
                            </TitleContainer>
                            {setting.items.map((item) => (
                                <>
                                    <Item>
                                        <DarkGrayText fontSize={16}>
                                            {item.title}
                                        </DarkGrayText>
                                        <TouchableOpacity
                                            onPress={() => handlePress(item)}>
                                            <Icon
                                                name="chevron-right"
                                                color="#000"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </Item>
                                    {item.items.map((subitem) => (
                                        <Item paddingLeft={6}>
                                            <DarkGrayText fontSize={16}>
                                                {subitem.title}
                                            </DarkGrayText>
                                            <TouchableOpacity>
                                                <Switch />
                                            </TouchableOpacity>
                                        </Item>
                                    ))}
                                </>
                            ))}
                        </ItemContainer>
                    ))}
                </InnerContainer>
            </ScrollView>
        </Container>
    );
};

export default SettingsHome;
