//import liraries
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMLocalized } from '~/services/localization/IMLocalization';
import {
    Banner,
    AvatarContainer,
    NavItemContainer,
    AvatarText,
    LinkContainer,
    Link,
} from '../layouts/components/DrawerContent';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { avatarImg } from '~/assets/images';
import { RoundedImage } from '../layouts/globalLayout';

const linkTexts = [
    'Popular Questions',
    'Help And Feedback',
    'Working InAMGAPP',
    'TermsOfUse',
    'Contacts',
    'FAQ',
];

const DrawerContent = (props) => {
    return (
        <DrawerContentScrollView>
            <Banner>
                <AvatarContainer>
                    <RoundedImage source={avatarImg} />
                    <AvatarText>{props.title}</AvatarText>
                </AvatarContainer>
            </Banner>

            <NavItemContainer>
                <DrawerItemList
                    {...props}                   
                    activeBackgroundColor="#6E78F7"
                    inactiveBackgroundColor="#fff"
                    labelStyle={{
                        color: '#000',
                        // lineHeight: hp(2.5)
                    }}
                    // itemStyle={{
                    //     height: hp(6),
                    //     marginBottom: 0.1,
                    // }}
                />
            </NavItemContainer>

            <LinkContainer>
                {linkTexts.map((text) => (
                    <Link paddingBottom={1.5}>{text}</Link>
                ))}
                <Link paddingTop={3}>{'@ 202102022 AMGAPP.'}</Link>
                <Link paddingTop={1}>{'All Rights Reserved'}</Link>
            </LinkContainer>
        </DrawerContentScrollView>
    );
};

export default DrawerContent;
