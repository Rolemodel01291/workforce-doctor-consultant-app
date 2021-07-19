import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { WrapContainer } from '../../../../layouts/globalLayout';
import { DarkGrayText } from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { Doctor } from '../../../../components/DoctorCard';
import {
    selectDoctor,
    setDoctorData,
} from '../../../../store/reducers/doctorReducer';
import { getSchedule } from '../../../../store/reducers/agentReducer';
import Calendar from '../../../../components/Calendar';
import LoadingSpinner from '~/components/LoadingSpinner';
import { Doctors } from '../../../../layouts/Agent/DoctorsHome';
import { theme } from '../../../../app-config/theme';

const SchedulesHome = ({ navigation }) => {
    const dispatch = useDispatch();
    let doctors = useSelector(selectDoctor);
    const [loading, setLoading] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(
        moment().format('YYYY-MM-DD'),
    );
    const [scheduleData, setScheduleData] = useState({
        markedDate: {},
        data: [],
    });
    const { data } = scheduleData;
    const getScheduleData = () => {
        var tempMarkedDate = {};
        setLoading(true);
        dispatch(getSchedule()).then((res) => {
            setLoading(false);
            res.payload.map((item) => {
                tempMarkedDate = {
                    ...tempMarkedDate,
                    [moment(item.StartTime).format('YYYY-MM-DD')]: {
                        marked: true,
                    },
                };
            });
            console.log(tempMarkedDate);
            setScheduleData({
                ...scheduleData,

                markedDate: tempMarkedDate,
            });
        });
    };

    useEffect(() => {
        doctors.map((doctor, index) => {
            doctors[index] = {
                ...doctor,
                open: false,
                index: index,
                test: index,
            };
        });
    }, [doctors]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
                dispatch(getSchedule()).then((res) => {
                    console.log(res.payload);
                    var tempMarkedDate = {};
                    new Promise.all(
                        res.payload.map(async (item, index) => {
                            tempMarkedDate = {
                                ...tempMarkedDate,
                                [moment(item.EndTime).format('YYYY-MM-DD')]: {
                                    marked: true,
                                },
                            };
                            let doctorData = await item.DoctorReference.get();
                            return {
                                ...doctorData.data(),
                                open: false,
                                StartTime: item.StartTime,
                            };
                        }),
                    ).then((data) => {
                        setLoading(false);
                        var temp = [];
                        console.log(data);
                        var tempArray = _.uniqWith(data, _.isEqual);
                        tempArray.map((item, index) => {
                            if (
                                moment(item.StartTime).format('YYYY-MM-DD') ===
                                moment(scheduleDate).format('YYYY-MM-DD')
                            )
                                temp.push({
                                    ...item,
                                    open: false,
                                    index: index,
                                    test: index,
                                });
                        });
                        console.log(tempMarkedDate);
                        setScheduleData({
                            ...scheduleData,
                            data: temp,
                            markedDate: tempMarkedDate,
                        });
                    });
                });
            return () => {
                isActive = false;
            };
        }, [scheduleDate]),
    );

    const handlePress = (doctor) => {
        let tempData = [...data];
        tempData[doctor.index] = {
            ...doctor,
            open: !doctor.open,
        };

        setScheduleData({
            ...scheduleData,
            data: tempData,
        });
    };

    const doctorDetail = (data) => {
        dispatch(setDoctorData(data));
        navigation.navigate(Routes.DOCTORDETAIL);
    };

    const handleDate = (dateString) => {
        setScheduleDate(dateString);
    };

    return (
        <>
            <LoadingSpinner isLoading={loading} text="Loading..." />
            <WrapContainer display="flex" align="center">
                <DarkGrayText fontSize={24}>Appointment</DarkGrayText>
                <Calendar
                    onDayPress={handleDate}
                    currentDate={scheduleDate}
                    markedDate={scheduleData.markedDate}
                />
            </WrapContainer>
            <ScrollView style={{ backgroundColor: theme.main.colors.white }}>
                <Doctors>
                    {data.map((doctor) => (
                        <Doctor
                            key={doctor.id}
                            data={doctor}
                            handleIconPress={(doctor) => handlePress(doctor)}
                            handleDetailPress={(doctor) => doctorDetail(doctor)}
                        />
                    ))}
                </Doctors>
            </ScrollView>
        </>
    );
};

export default SchedulesHome;
