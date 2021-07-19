import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Overlay } from 'react-native-elements';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import Toast from 'react-native-simple-toast';
import {
    AvatarContainer,
    ScheduleContainer,
    RoundedBox,
    RoundedInnerBox,
    SendReminder,
    SwitchContainer,
    OutCircleBage,
    InnerCircleBage,
    BageNumber,
} from '../../../../layouts/Agent/EditSchedule';
import {
    Container as ModalContainer,
    ButtonGroup,
} from '../../../../layouts/Logout';

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
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { addImg } from '../../../../assets/images';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { doctorAvatarImg } from '../../../../assets/images';
import { CustomSwitch } from '../../../../layouts/components/Switch';
import Week from '../../../../components/Week';
import { Text, TouchableOpacity } from 'react-native';
import { Routes } from '../../../../app-config/constants';
import { WeekContainer } from '../../../../layouts/components/Week';
import {
    setOpenDialog,
    bookDoctors,
} from '../../../../store/reducers/agentReducer';
import {
    setTimeSlot,
    getActiveCases,
} from '../../../../store/reducers/patientReducer';

import {
    getDoctorSchedule,
    setSchedules,
} from '../../../../store/reducers/doctorReducer';
import Calendar from '../../../../components/Calendar';
import LoadingSpinner from '~/components/LoadingSpinner';

const EditSchedule = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedWeekDay = useSelector(({ doctor }) => doctor.selectedWeekDay);
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    const selectedCases = useSelector(({ agent }) => agent.selectedCases);
    const schedules = useSelector(({ doctor }) => doctor.schedules);
    const startTime = useSelector(({ patient }) => patient.startTime);
    const endTime = useSelector(({ patient }) => patient.endTime);
    const openDialog = useSelector(({ agent }) => agent.openDialog);
    const [loading, setLoading] = useState(false);
    const [scheduleData, setScheduleData] = useState({
        firstSlot: [],
        secondSlot: [],
        thirdSlot: [],
        markedDate: {},
    });
    const [scheduleDate, setScheduleDate] = useState(
        moment().format('YYYY-MM-DD'),
    );
    const [state, setState] = useState({
        visible: false,
    });

    useEffect(() => {
        if (!_.isEmpty(selectedDoctor)) {
            getScheduleData();
        }
    }, [selectedDoctor, scheduleDate]);

    const { visible } = state;

    const handleDate = (dateString) => {
        setScheduleDate(dateString);
    };

    const toggleOverlay = () => {
        dispatch(setOpenDialog(!openDialog));
    };

    const handleClose = () => {
        toggleOverlay();
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

    const handleSet = () => {
        toggleOverlay();
        setLoading(true);

        if (selectedCases.length > 0) {
            dispatch(
                bookDoctors({
                    doctor: selectedDoctor,
                    cases: selectedCases,
                    startTime,
                    endTime,
                }),
            ).then((res) => {
                setLoading(false);
                getScheduleData();
                console.log(res.payload);
            });
        } else {
            setLoading(false);
            Toast.show("You don't have any active cases !", Toast.LONG);
        }
    };
    return (
        <ScrollView>
            <LoadingSpinner isLoading={loading} text="Loading..." />

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
                    {`DR.${selectedDoctor.Name}`}
                </DarkGrayText>
                <GrayText>{selectedDoctor.Address}</GrayText>
                <SwitchContainer>{/* <CustomSwitch /> */}</SwitchContainer>
                <FlexBetweenView width={94}>
                    <GrayText>Schedules</GrayText>
                    <TouchableOpacity
                        onPress={(ev) => navigation.navigate(Routes.CALENDAR)}>
                        <GreenText>Canender</GreenText>
                    </TouchableOpacity>
                </FlexBetweenView>

                <FlexBetweenView marginVertical={3}>
                    <Calendar
                        onDayPress={handleDate}
                        currentDate={scheduleDate}
                        markedDate={scheduleData.markedDate}
                    />
                    {/* <Week onPress={(data) => handlePress(data)} /> */}
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
                            onPress={(ev) => {
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
                                navigation.navigate(Routes.PATIENTSLIST);
                            }}>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                    <RoundedBox>
                        <RoundedInnerBox
                            backgroundColor={theme.main.colors.green}>
                            {scheduleData.secondSlot.length > 0 && (
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
                                navigation.navigate(Routes.PATIENTSLIST);
                            }}>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                    <RoundedBox>
                        <RoundedInnerBox
                            backgroundColor={theme.main.colors.green}>
                            {scheduleData.thirdSlot.length > 0 && (
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
                                navigation.navigate(Routes.PATIENTSLIST);
                            }}>
                            <IconImage source={addImg} />
                        </TouchableOpacity>
                    </RoundedBox>
                </ScheduleContainer>

                {/* <TouchableOpacity>
                    <Button
                        height={6}
                        width={40}
                        marginVertical={4}
                        text="Save"
                        backgroundColor={theme.main.colors.main}
                        color={theme.main.colors.white}
                    />
                </TouchableOpacity> */}
            </WrapContainer>
            <Overlay
                isVisible={openDialog}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                    borderRadius: 10,
                }}>
                <ModalContainer>
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
                </ModalContainer>
            </Overlay>
        </ScrollView>
    );
};

export default EditSchedule;
