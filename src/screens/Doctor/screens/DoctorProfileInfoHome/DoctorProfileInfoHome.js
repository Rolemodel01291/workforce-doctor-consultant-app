import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { View } from 'react-native';
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
} from '../../../../layouts/globalLayout';
import RequireText from '../../../../components/RequireText';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import { ScrollView } from '../../../../layouts/globalLayout';
import { getDoctorProfile } from '../../../../store/reducers/doctorReducer';
// import MapView from 'react-native-maps'

const DoctorProfileInfoHome = ({ navigation }) => {
    const [coordinate, setCoordinate] = useState({
        latitude: 41.880032,
        longitude: -87.623177,
    });
    const [doctorData, setDoctorData] = useState({});
    const dispatch = useDispatch();
    const uid = useSelector(({ auth }) => auth.userData.uid);
    useEffect(() => {
        if (uid) {
            dispatch(getDoctorProfile(uid)).then((res) => {
                setDoctorData(res.payload);
                setCoordinate({
                    latitude: res.payload.GeoLocation.lat,
                    longitude: res.payload.GeoLocation.lng,
                });
            });
        }
    }, [uid]);
    return (
        <ScrollView>
            <Container
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
                                {doctorData.Description}
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
                            latitude: 41.880032,
                            longitude: -87.623177,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        style={{ width: 350, height: 200 }}>
                        <MapView.Marker.Animated
                            coordinate={coordinate}
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
                            marginVertical={1.5}>
                            <RequireText>
                                <GrayText fontSize={14}>Password*</GrayText>
                            </RequireText>
                            <GrayText fontSize={14}>
                                {doctorData.Password}
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
                        <FlexBetweenView width={80} marginVertical={1.5}>
                            <BlackText fontSize={16}>Schedule</BlackText>
                            <FlexBetweenView width={15}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Routes.SCHEDULEVIEW)
                                    }>
                                    {/* <GreenText fontSize={12}>View</GreenText> */}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            Routes.DOCTORCALENDAR,
                                        )
                                    }>
                                    <GreenText fontSize={12}>View</GreenText>
                                </TouchableOpacity>
                            </FlexBetweenView>
                        </FlexBetweenView>
                    </AccountInfoContainer>
                </TextContainer>
            </Container>
        </ScrollView>
    );
};

export default DoctorProfileInfoHome;
