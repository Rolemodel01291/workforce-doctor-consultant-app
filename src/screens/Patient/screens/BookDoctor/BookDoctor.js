import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Container } from '../../../../layouts/globalLayout';
import { theme } from '../../../../app-config/theme';
import { avatarImg, locationImg } from '../../../../assets/images';
import MainCard from '../../../../components/MainCard';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { ScrollView } from '../../../../layouts/globalLayout';
import { Routes } from '../../../../app-config/constants';

import {getDoctor, selectDoctor, setDoctorData} from '../../../../store/reducers/doctorReducer'

const BookDoctor = ({ navigation }) => {
    const dispatch = useDispatch()
    const doctors = useSelector(selectDoctor)

    useEffect(()=>{
        dispatch(getDoctor()).then(()=>{

        })
    },[])


    const goDoctorDetail=(data, route)=>{
        dispatch(setDoctorData(data))
        navigation.replace(route)
    }

    return (
        <ScrollView>
            <Container
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.lightGray}>
                {doctors.map((item) => (
                    <MainCard
                        image={{uri:item.Avatar}}
                        title={item.Name}
                        text={item.Description}
                        icon='map-marker'
                        iconColor={theme.main.colors.green}
                        route={Routes.PATIENTDOCTORDETAIL}
                        type="ICON_BUTTON"
                        onPress={()=>goDoctorDetail(item, Routes.PATIENTDOCTORDETAIL)}
                        iconPress={()=>goDoctorDetail(item, Routes.PATIENTDOCTORDETAIL)}
                    />
                ))}
            </Container>
        </ScrollView>
    );
};

export default BookDoctor;
