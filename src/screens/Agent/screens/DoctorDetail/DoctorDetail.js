import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { ScrollView, View } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import {
    TopContainer,
    AvatarContainer,
    CardContainer,
    ButtonContainer,
    TextContainer,
    AccountInfoContainer,
    Telephone,
} from '../../../../layouts/Agent/DoctorDetail';
import {
    Container,
    ShadowContainer,
    FlexBetweenView,
    RoundedImage,
    GrayText,
    BlackText,
    GreenText,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import RequireText from '../../../../components/RequireText';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
// import MapView from 'react-native-maps'

const DoctorDetail = ({ navigation }) => {
    const [coordinate, setCoordinate] = useState({
        latitude: 41.880032,
        longitude: -87.623177,
    });
    const doctorData = useSelector(({ doctor }) => doctor.selectedDoctor);
    console.log(doctorData);
    return (
        <ScrollView>
            <WrapContainer
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.lightGray}>
                <TopContainer>
                    <ShadowContainer height={20}>
                        <AvatarContainer>
                            <RoundedImage
                                backgroundColor={
                                    theme.main.colors.fauxBlackOlive
                                }
                                borderRadius={15}
                                source={
                                    doctorData.Avatar
                                        ? { uri: doctorData.Avatar }
                                        : doctorAvatarImg
                                }
                            />
                            {/* <CustomSwitch /> */}
                        </AvatarContainer>
                        <CardContainer>
                            <BlackText fontSize={16}>
                                {`DR. ${doctorData.Name}`}
                            </BlackText>
                            <GrayText fontSize={14}>
                                {doctorData.Address}
                            </GrayText>
                            <GrayText fontSize={14} lineHeight={8}>
                                16 yrs. Experience
                            </GrayText>
                            {/* <FlexBetweenView width={75}>
                        <RoundedImage source={doctor1Img} />
                        <RoundedImage source={doctor2Img} />
                        <RoundedImage source={doctor1Img} />
                        <RoundedImage source={doctor2Img} />
                    </FlexBetweenView> */}
                        </CardContainer>
                    </ShadowContainer>
                </TopContainer>
                <View
                    style={{
                        height: hp(30),
                        width: wp(100),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <MapView
                        initialRegion={{
                            latitude: doctorData.GeoLocation?.lat
                                ? doctorData.GeoLocation?.lat
                                : 41.880032,
                            longitude: doctorData.GeoLocation?.lng
                                ? doctorData.GeoLocation?.lng
                                : -87.623177,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        style={{ width: 350, height: 200 }}>
                        <MapView.Marker.Animated
                            coordinate={{
                                latitude: doctorData.GeoLocation?.lat
                                    ? doctorData.GeoLocation?.lat
                                    : 41.880032,
                                longitude: doctorData.GeoLocation?.lng
                                    ? doctorData.GeoLocation?.lng
                                    : -87.623177,
                            }}
                            onDragEnd={(e) => {
                                console.log(
                                    'dragEnd',
                                    e.nativeEvent.coordinate,
                                );
                            }}
                        />
                    </MapView>
                </View>

                <TextContainer>
                    <Telephone>
                        <BlackText fontSize={16}>Tel</BlackText>
                        <GrayText fontSize={14}>{doctorData.Phone}</GrayText>
                    </Telephone>

                    <AccountInfoContainer>
                        <BlackText fontSize={16}>Account Info</BlackText>
                        <FlexBetweenView
                            width={70}
                            paddingLeft={6}
                            marginTop={1.5}>
                            <RequireText>
                                <GrayText fontSize={14}>Email</GrayText>
                            </RequireText>
                            <GrayText fontSize={14}>
                                {doctorData.Email}
                            </GrayText>
                        </FlexBetweenView>
                        <FlexBetweenView
                            width={70}
                            paddingLeft={6}
                            marginTop={1.5}>
                            <RequireText>
                                <GrayText fontSize={14}>Password*</GrayText>
                            </RequireText>
                            <GrayText fontSize={14}>
                                {doctorData.Password}
                            </GrayText>
                        </FlexBetweenView>
                        <FlexBetweenView
                            width={70}
                            paddingLeft={6}
                            marginVertical={1.5}>
                            <RequireText>
                                <GrayText fontSize={14}>
                                    Available book
                                </GrayText>
                            </RequireText>
                            <GrayText fontSize={14}>
                                {doctorData.AvailableBook}
                            </GrayText>
                        </FlexBetweenView>
                        <BlackText fontSize={16}>Description</BlackText>
                        <FlexBetweenView
                            width={70}
                            paddingLeft={6}
                            marginTop={1.5}>
                            <GrayText fontSize={14}>
                                {doctorData.Description}
                            </GrayText>
                        </FlexBetweenView>
                        <FlexBetweenView width={80} marginTop={1.5}>
                            <BlackText fontSize={16}>Schedule</BlackText>
                            <FlexBetweenView width={15}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Routes.SCHEDULEVIEW)
                                    }>
                                    <GreenText fontSize={12}>View</GreenText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Routes.EDITSCHEDULE)
                                    }>
                                    <GreenText fontSize={12}>Edit</GreenText>
                                </TouchableOpacity>
                            </FlexBetweenView>
                        </FlexBetweenView>
                    </AccountInfoContainer>
                </TextContainer>
            </WrapContainer>
        </ScrollView>
    );
};

export default DoctorDetail;
