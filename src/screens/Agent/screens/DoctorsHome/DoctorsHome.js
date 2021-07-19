import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, ScrollView } from 'react-native';
import _ from 'lodash';
import {
    Container,
    InnerContainer,
    FlexBetweenView,
    Divider,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { Doctor } from '../../../../components/DoctorCard';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { newImg } from '../../../../assets/images';
import IconButton from '../../../../components/IconButton';
import {
    getDoctor,
    selectDoctor,
    setDoctorData,
} from '../../../../store/reducers/doctorReducer';
import { theme } from '../../../../app-config/theme';
import { Doctors } from '../../../../layouts/Agent/DoctorsHome';

const DoctorsHome = ({ navigation }) => {
    const dispatch = useDispatch();
    let doctors = useSelector(selectDoctor);
    const [data, setData] = useState(doctors);
    console.log('--', doctors);
    const [selected, setSelected] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doctors.map((doctor, index) => {
            doctors[index] = {
                ...doctor,
                open: false,
                index: index,
                test: index,
            };
        });
        setData(doctors);
    }, [doctors]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
                dispatch(getDoctor()).then(() => {
                    setLoading(false);
                });
            return () => {
                isActive = false;
            };
        }, []),
    );

    function handlePress(doctor) {
        let tempData = data;
        tempData[doctor.index] = {
            ...doctor,
            open: !doctor.open,
        };
        setSelected(doctor);
        // setData(tempData)
    }

    const doctorDetail = (data) => {
        dispatch(setDoctorData(data));
        navigation.navigate(Routes.DOCTORDETAIL);
    };

    return (
        <>
            <InnerContainer backgroundColor={theme.main.colors.white}>
                <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                    <IconButton
                        onPress={() => navigation.navigate(Routes.CREATEDOCTOR)}
                        source={newImg}
                        text="add doctor"
                        fontSize={11}
                    />
                </FlexBetweenView>
                <Divider marginVertical={3} />
            </InnerContainer>
            <ScrollView style={{backgroundColor: theme.main.colors.white}}>
                <Doctors>
                    {loading && (
                        <ActivityIndicator size="large" color="#00ff00" />
                    )}
                    {!loading &&
                        data.map((doctor) => (
                            <Doctor
                                key={doctor.id}
                                data={doctor}
                                handleIconPress={(doctor) =>
                                    handlePress(doctor)
                                }
                                handleDetailPress={(doctor) =>
                                    doctorDetail(doctor)
                                }
                            />
                        ))}
                </Doctors>
            </ScrollView>
        </>
    );
};

export default DoctorsHome;
