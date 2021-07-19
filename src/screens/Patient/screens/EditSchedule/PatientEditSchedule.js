import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import { Overlay } from 'react-native-elements';
import {
    AvatarContainer,
    RoundedBox,
    RoundedInnerBox,
    OutCircleBage,
    InnerCircleBage,
    BageNumber,
    ScheduleContainer,
} from '../../../../layouts/Agent/EditSchedule';
import {
    WrapContainer,
    IconImage,
    FlexBetweenView,
    RoundedImage,
    GrayText,
    GreenText,
    DarkGrayText,
    WhiteText,
    ScrollView,
} from '../../../../layouts/globalLayout';
import { Container, ButtonGroup } from '../../../../layouts/Logout';
import { addImg } from '../../../../assets/images';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import Calendar from '../../../../components/Calendar';
import LoadingSpinner from '~/components/LoadingSpinner';
import {
    getDoctorSchedule,
    setSchedules,
} from '../../../../store/reducers/doctorReducer';
import {
    setTimeSlot,
    getActiveCases,
    bookDoctors,
} from '../../../../store/reducers/patientReducer';

const PatientEditSchedule = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const startTime = useSelector(({ patient }) => patient.startTime);
    const endTime = useSelector(({ patient }) => patient.endTime);
    const [loading, setLoading] = useState(false);
    const [scheduleData, setScheduleData] = useState({
        firstSlot: [],
        secondSlot: [],
        thirdSlot: [],
        markedDate: {},
    });
    // console.log(
    //     startTime.format('YYYY-MM-DD HH:MM:SS'),
    //     endTime.format('YYYY-MM-DD HH:MM:SS'),
    // );
    const [scheduleDate, setScheduleDate] = useState(
        moment().format('YYYY-MM-DD'),
    );
    const [state, setState] = useState({
        visible: false,
    });

    const { visible } = state;

    const handleDate = (dateString) => {
        setScheduleDate(dateString);
    };

    const handlePress = (data) => {
        navigation.goBack();
    };

    const handleSet = () => {
        toggleOverlay();
        console.log(startTime);
        setLoading(true);
        dispatch(getActiveCases()).then((res) => {
            if (res.payload.length > 0) {
                dispatch(
                    bookDoctors({
                        doctor: selectedDoctor,
                        cases: res.payload,
                        startTime,
                        endTime,
                    }),
                ).then(() => {
                    setLoading(false);
                    getScheduleData();
                    console.log(res.payload);
                });
            } else {
                setLoading(false);
                Toast.show("You don't have any active cases !", Toast.LONG);
            }
        });
    };

    const handleClose = () => {
        toggleOverlay();
    };

    const toggleOverlay = () => {
        setState({ ...state, visible: !state.visible });
    };

    const getScheduleData = () => {
        var tempFirstSlot = [];
        var tempSecondSlot = [];
        var tempThirdSlot = [];
        var tempMarkedDate = {};
        setLoading(true);
        dispatch(getDoctorSchedule(selectedDoctor.UID)).then((res) => {
            setLoading(false);
            res.payload.map((item) => {
                tempMarkedDate = {
                    ...tempMarkedDate,
                    [moment(item.StartTime).format('YYYY-MM-DD')]: {
                        marked: true,
                    },
                };
                if (
                    item.StartTime ===
                        moment(scheduleDate)
                            .set({ hour: 9, minute: 0, second: 0 })
                            .valueOf() &&
                    item.EndTime ===
                        moment(scheduleDate)
                            .set({ hour: 11, minute: 0, second: 0 })
                            .valueOf()
                ) {
                    tempFirstSlot.push(item);
                } else if (
                    item.StartTime ===
                        moment(scheduleDate)
                            .set({ hour: 11, minute: 0, second: 0 })
                            .valueOf() &&
                    item.EndTime ===
                        moment(scheduleDate)
                            .set({ hour: 14, minute: 0, second: 0 })
                            .valueOf()
                ) {
                    tempSecondSlot.push(item);
                } else if (
                    item.StartTime ===
                        moment(scheduleDate)
                            .set({ hour: 14, minute: 0, second: 0 })
                            .valueOf() &&
                    item.EndTime ===
                        moment(scheduleDate)
                            .set({ hour: 16, minute: 0, second: 0 })
                            .valueOf()
                ) {
                    tempThirdSlot.push(item);
                }
            });
            console.log(tempMarkedDate);
            setScheduleData({
                ...scheduleData,
                firstSlot: tempFirstSlot,
                secondSlot: tempSecondSlot,
                thirdSlot: tempThirdSlot,
                markedDate: tempMarkedDate,
            });
        });
    };

    useEffect(() => {
        if (!_.isEmpty(selectedDoctor)) {
            getScheduleData();
        }
    }, [selectedDoctor, scheduleDate]);

    return (
        <ScrollView>
            <LoadingSpinner isLoading={loading} text="Loading..." />

            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                    borderRadius: 10,
                }}>
                <Container>
                    <DarkGrayText>Do you really Book?</DarkGrayText>
                    <ButtonGroup>
                        <TouchableOpacity>
                            <Button
                                width={20}
                                text="No"
                                onPress={handleClose}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Button width={20} text="Yes" onPress={handleSet} />
                        </TouchableOpacity>
                    </ButtonGroup>
                </Container>
            </Overlay>
            <WrapContainer
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
                <DarkGrayText fontSize={24}>
                    {`DR. ${selectedDoctor.Name}`}
                </DarkGrayText>
                <GrayText>{selectedDoctor.Description}</GrayText>
                <FlexBetweenView marginVertical={3}>
                    <Calendar
                        onDayPress={handleDate}
                        currentDate={scheduleDate}
                        markedDate={scheduleData.markedDate}
                    />
                </FlexBetweenView>

                <ScheduleContainer>
                    <RoundedBox>
                        <RoundedInnerBox
                            backgroundColor={theme.main.colors.green}>
                            {scheduleData.firstSlot.length > 0 && (
                                <OutCircleBage>
                                    <InnerCircleBage
                                        color={
                                            selectedDoctor.AvailableBook <=
                                            scheduleData.firstSlot.length
                                                ? 'red'
                                                : 'green'
                                        }>
                                        <BageNumber>
                                            {scheduleData.firstSlot.length}
                                        </BageNumber>
                                    </InnerCircleBage>
                                </OutCircleBage>
                            )}
                            <WhiteText>{`09.00 am - 11.00 am`}</WhiteText>
                        </RoundedInnerBox>
                        <TouchableOpacity
                            onPress={(ev) =>
                                // navigation.navigate(Routes.PATIENTSLIST)
                                {
                                    console.log(scheduleDate);
                                    dispatch(
                                        setTimeSlot({
                                            startTime: moment(scheduleDate)
                                                .set({
                                                    hour: 9,
                                                    minute: 0,
                                                    second: 0,
                                                })
                                                .valueOf(),
                                            endTime: moment(scheduleDate)
                                                .set({
                                                    hour: 11,
                                                    minute: 0,
                                                    second: 0,
                                                })
                                                .valueOf(),
                                        }),
                                    );
                                    toggleOverlay();
                                }
                            }>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                    <RoundedBox>
                        <RoundedInnerBox
                            backgroundColor={theme.main.colors.green}>
                            {scheduleData.secondSlot?.length > 0 && (
                                <OutCircleBage>
                                    <InnerCircleBage
                                        color={
                                            selectedDoctor.AvailableBook <=
                                            scheduleData.secondSlot.length
                                                ? 'red'
                                                : 'green'
                                        }>
                                        <BageNumber>
                                            {scheduleData.secondSlot.length}
                                        </BageNumber>
                                    </InnerCircleBage>
                                </OutCircleBage>
                            )}
                            <WhiteText>{`11.00 am - 02.00 pm`}</WhiteText>
                        </RoundedInnerBox>
                        <TouchableOpacity
                            onPress={(ev) => {
                                console.log(scheduleDate);
                                dispatch(
                                    setTimeSlot({
                                        startTime: moment(scheduleDate)
                                            .set({
                                                hour: 11,
                                                minute: 0,
                                                second: 0,
                                            })
                                            .valueOf(),
                                        endTime: moment(scheduleDate)
                                            .set({
                                                hour: 14,
                                                minute: 0,
                                                second: 0,
                                            })
                                            .valueOf(),
                                    }),
                                );
                                toggleOverlay();
                            }}>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                    <RoundedBox>
                        <RoundedInnerBox
                            backgroundColor={theme.main.colors.green}>
                            {scheduleData.thirdSlot?.length > 0 && (
                                <OutCircleBage>
                                    <InnerCircleBage
                                        color={
                                            selectedDoctor.AvailableBook <=
                                            scheduleData.thirdSlot.length
                                                ? 'red'
                                                : 'green'
                                        }>
                                        <BageNumber>
                                            {scheduleData.thirdSlot.length}
                                        </BageNumber>
                                    </InnerCircleBage>
                                </OutCircleBage>
                            )}
                            <WhiteText>{`02.00 pm - 04.00 pm`}</WhiteText>
                        </RoundedInnerBox>
                        <TouchableOpacity
                            onPress={(ev) => {
                                console.log(scheduleDate);
                                dispatch(
                                    setTimeSlot({
                                        startTime: moment(scheduleDate)
                                            .set({
                                                hour: 14,
                                                minute: 0,
                                                second: 0,
                                            })
                                            .valueOf(),
                                        endTime: moment(scheduleDate)
                                            .set({
                                                hour: 16,
                                                minute: 0,
                                                second: 0,
                                            })
                                            .valueOf(),
                                    }),
                                );
                                toggleOverlay();
                            }}>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                </ScheduleContainer>

                <Button
                    height={6}
                    width={40}
                    marginVertical={4}
                    text="Save"
                    backgroundColor={theme.main.colors.main}
                    color={theme.main.colors.white}
                    onPress={(ev) => handlePress(ev)}
                />
            </WrapContainer>
        </ScrollView>
    );
};

export default PatientEditSchedule;
