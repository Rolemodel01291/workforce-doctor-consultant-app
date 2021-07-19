import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import Toast from 'react-native-simple-toast';
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
    WrapContainer,
} from '../../../../layouts/globalLayout';
import RequireText from '../../../../components/RequireText';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import { ScrollView } from '../../../../layouts/globalLayout';
import {
    getActiveCases,
    bookDoctors,
} from '../../../../store/reducers/patientReducer';

const DoctorDetail = ({ navigation }) => {
    const [coordinate, setCoordinate] = useState({
        latitude: 41.880032,
        longitude: -87.623177,
    });
    const dispatch = useDispatch();
    const doctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    console.log(doctor);
    const bookDoctor = () => {
        dispatch(getActiveCases()).then((res) => {
            if (res.payload.length > 0) {
                var cases = res.payload;
                // dispatch(bookDoctors({doctor, cases})).then(()=>{
                //     console.log(res.payload)
                // })

                navigation.navigate(Routes.PATIENTEDITSCHEDULE);
            } else {
                Toast.show("You don't have activated case yet !", Toast.LONG);
            }
        });
    };
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
                                    doctor.Avatar
                                        ? { uri: doctor.Avatar }
                                        : doctorAvatarImg
                                }
                            />
                            {/* <CustomSwitch /> */}
                        </AvatarContainer>
                        <CardContainer>
                            <BlackText fontSize={16}>
                          
                                {`DR. ${doctor.Name}`}
                            </BlackText>
                            <GrayText fontSize={14}>
                                {doctor.Description}
                                
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
                        <GrayText fontSize={14}>{doctor.Phone}</GrayText>
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
                            <GrayText fontSize={14}>{doctor.Email}</GrayText>
                        </FlexBetweenView>
                        <FlexBetweenView
                            width={70}
                            paddingLeft={6}
                            marginVertical={1.5}>
                            <RequireText>
                                <GrayText fontSize={14}>
                                    Available Book*
                                </GrayText>
                            </RequireText>
                            <GrayText fontSize={14}>
                                {doctor.AvailableBook}
                            </GrayText>
                        </FlexBetweenView>
                        <BlackText fontSize={16}>Description</BlackText>
                    </AccountInfoContainer>
                </TextContainer>
                <FlexBetweenView width={70} paddingLeft={6} marginTop={1.5}>
                    <GrayText fontSize={14}>{doctor.Description}</GrayText>
                </FlexBetweenView>
                <FlexBetweenView marginVertical={3}>
                    <Button width={30} text="BOOK" onPress={bookDoctor} />
                </FlexBetweenView>
            </WrapContainer>
        </ScrollView>
    );
};

export default DoctorDetail;
