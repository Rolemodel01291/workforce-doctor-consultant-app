import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
    flatImg,
    nurseImg,
    microscopeImg,
    adsDoctorImg,
    doctor3Img,
} from '../../../../assets/images';
import { theme } from '../../../../app-config/theme';
import {
    TopContainer,
    ShadowImage,
    CenterContainer,
    BottomContainer,
    TopContainerItemView,
    TopContainerTextView,
    BottomContainerItemView,
    AdsImageView,
    LandingView,
    DescriptionView,
    BottomContainerView,
} from '../../../../layouts/Patient/Dashboard';
import {
    Container,
    FlexBetweenView,
    BlackText,
    GrayText,
    AvatarImage,
    RoundedImage,
    CircleView,
    ScrollView,
    IconImage,
    BlueText,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
    getDoctor,
    selectDoctor,
    setDoctorData,
} from '../../../../store/reducers/doctorReducer';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const DashboardHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector(({ auth }) => auth.userData);
    const [loading, setLoading] = useState(true);
    console.log(userData);
    const navigateActiveCase = () => {
        navigation.navigate(Routes.MYACTIVECASE);
    };
    const navigateHistoryCase = () => {
        navigation.navigate(Routes.CASEHISTORYHOME);
    };

    const doctors = useSelector(selectDoctor);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            let isActive = true;
            if (isActive)
                dispatch(getDoctor()).then(() => {
                    setLoading(false);
                });

            return () => {
                isActive = false;
            };
        }, []),
    );
    const TopContainerItem = ({ image, title, subtitle }) => (
        <TopContainerItemView>
            <ShadowImage>
                <AvatarImage width={5} height={5} source={image}></AvatarImage>
            </ShadowImage>
            <BlackText>{title}</BlackText>
            <TopContainerTextView>
                <GrayText textAlign="center" fontSize={10}>
                    {subtitle}
                </GrayText>
            </TopContainerTextView>
        </TopContainerItemView>
    );

    const BottomContainerItem = ({ image, title, name, availableBook }) => (
        <BottomContainerItemView>
            <CircleView width={8} height={8} top={-3}>
                <RoundedImage
                    source={image ? { uri: image } : doctor3Img}
                    borderRadius={100}></RoundedImage>
            </CircleView>
            <DescriptionView>
                <BlackText>{`Dr, ${name}`}</BlackText>
                <GrayText fontSize={12}>{title}</GrayText>
                <FlexBetweenView flexDirection="row" width={26}>
                    {/* <IconImage source={starImg} /> */}
                    <GrayText fontSize={12}>{`Available Book:`}</GrayText>
                    <GrayText fontSize={12}>{availableBook}</GrayText>
                </FlexBetweenView>
            </DescriptionView>
        </BottomContainerItemView>
    );

    return (
        <Container
            display="flex"
            align="center"
            justify="flex-start"
            color={theme.main.colors.whiteSmoke}>
            <TopContainer>
                <TouchableOpacity onPress={navigateHistoryCase}>
                    <TopContainerItem
                        image={microscopeImg}
                        title="Previous case"
                        subtitle="Look at your recent case"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateActiveCase}>
                    <TopContainerItem
                        image={flatImg}
                        title="Active case"
                        subtitle="treatment ongoing"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Routes.BOOKDOCTOR)}>
                    <TopContainerItem
                        image={nurseImg}
                        title="Book doctor"
                        subtitle="Search doctor around you"
                    />
                </TouchableOpacity>
            </TopContainer>

            <CenterContainer>
                <ScrollView horizontal={true}>
                    <LandingView>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(Routes.SCHEDULESDETAIL)
                            }>
                            <AdsImageView source={adsDoctorImg} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(Routes.SCHEDULESDETAIL)
                            }>
                            <AdsImageView source={adsDoctorImg} />
                        </TouchableOpacity>
                    </LandingView>
                </ScrollView>
            </CenterContainer>

            <BottomContainer>
                <FlexBetweenView width={86}>
                    <BlueText>Dectors nearby you</BlueText>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Routes.DOCTORSHOME)}>
                        <BlueText>See All</BlueText>
                    </TouchableOpacity>
                </FlexBetweenView>
                <ScrollView horizontal={true}>
                    <BottomContainerView>
                        {loading ? (
                            <View
                                style={{
                                    width: widthPercentageToDP(100),
                                    alignItems: 'center',
                                }}>
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                />
                            </View>
                        ) : (
                            doctors.map((doctor, index) => (
                                <TouchableOpacity onPress={() => navigation.navigate(Routes.PATIENTDOCTORDETAIL)}>
                                    <BottomContainerItem
                                        key={index}
                                        image={doctor.Avatar}
                                        title={doctor.Address}
                                        name={doctor.Name}
                                        availableBook={doctor.AvailableBook}
                                    />
                                </TouchableOpacity>
                            ))
                            // <LandingView height={27}>
                            //     <TouchableOpacity
                            //         onPress={() =>
                            //             navigation.navigate(Routes.BOOKDOCTOR)
                            //         }>
                            //         <BottomContainerItem
                            //             image={microscopeImg}
                            //             title="Previous case"
                            //             subtitle="Look at your recent case"
                            //         />
                            //     </TouchableOpacity>

                            //     <BottomContainerItem
                            //         image={microscopeImg}
                            //         title="Previous case"
                            //         subtitle="Look at your recent case"
                            //     />
                            // </LandingView>
                        )}
                    </BottomContainerView>
                </ScrollView>
            </BottomContainer>
        </Container>
    );
};

export default DashboardHome;
