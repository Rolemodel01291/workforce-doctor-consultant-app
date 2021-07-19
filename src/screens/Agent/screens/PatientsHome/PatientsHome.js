import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import _ from 'lodash';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import GradientButton from '../../../../components/GradientButton';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    ContentHeaderContainer,
    ContentContainer,
} from '../../../../layouts/Agent/PatientsHome';
import {
    Container,
    InnerContainer,
    FlexBetweenView,
    Divider,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { actions, Routes } from '../../../../app-config/constants';
import { avatarImg, newImg } from '../../../../assets/images';
import IconButton from '../../../../components/IconButton';
import {
    getPatient,
    selectPatient,
} from '../../../../store/reducers/patientReducer';
import {
    setError,
    setAction,
    setPatient,
    setPatientInfo,
    setCleanCase,
} from '../../../../store/reducers/agentReducer';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const PatientsHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const patients = useSelector(selectPatient);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'name',
    });
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
                dispatch(getPatient()).then(() => {
                    setLoading(false);
                });

            return () => {
                isActive = false;
            };
        }, []),
    );

    function handleRequestSort(property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }
        console.log(id, direction);
        setOrder({
            direction,
            id,
        });
    }

    const addPatient = () => {
        dispatch(setAction(actions.ADD_PATIENT));
        navigation.navigate(Routes.ADDPATIENT);
    };

    const patientDetail = (action, route, data) => {
        dispatch(setError([]));
        dispatch(setAction(action));
        dispatch(setPatient(data));
        navigation.navigate(route);
    };

    const createCase = (route, data) => {
        dispatch(setCleanCase());
        dispatch(setPatientInfo(data));
        navigation.navigate(route);
    };

    return (
        <>
            <WrapContainer>
                <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                    <IconButton
                        source={newImg}
                        text="add new"
                        fontSize={11}
                        onPress={addPatient}
                    />
                </FlexBetweenView>
                <Divider marginVertical={1} />
                <ContentHeaderContainer>
                    <FlexBetweenView
                        width="100%"
                        paddingLeft={1}
                        paddingRight={1}
                        paddingBottom={1}
                        justifyContent="space-around">
                        <TouchableOpacity>
                            <GradientButton
                                height={4}
                                width={20}
                                text="Name"
                                onPress={() => handleRequestSort('name')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <GradientButton
                                height={4}
                                width={20}
                                text="Case"
                                onPress={() => handleRequestSort('case')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <GradientButton
                                height={4}
                                width={15}
                                text="DOB"
                                onPress={() => handleRequestSort('DOB')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <GradientButton
                                height={4}
                                width={25}
                                text="Current Status"
                            />
                        </TouchableOpacity>
                    </FlexBetweenView>
                </ContentHeaderContainer>
            </WrapContainer>
            <ScrollView style={{ backgroundColor: theme.main.colors.white }}>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start"
                    paddingBottom={3}>
                    {loading && (
                        <ActivityIndicator size="large" color="#00ff00" />
                    )}
                    {!loading &&
                        _.orderBy(
                            patients,
                            [
                                (o) => {
                                    if (order.id === 'cases') {
                                        return String(o['cases'].length);
                                    }
                                    return o[order.id];
                                },
                            ],
                            [order.direction],
                        ).map((user) => {
                            console.log(user.DOB)
                            return (
                                <MainCard
                                    textGroupWidth={40}
                                    image={
                                        user.avatar
                                            ? { uri: user.avatar }
                                            : avatarImg
                                    }
                                    title={user.name}
                                    text={`Case: ${user.Schedule?.length>0?`Scheduled`:user.cases.length>0?`New`:`N/A`}`}
                                    time={moment(user.DOB.toDate()).format('MM/DD/YYYY')}
                                    type="TEXT_BUTTON"
                                    navigation={navigation}
                                    route={Routes.ADDPATIENT}
                                    route2={user.cases.length>0?null:Routes.CREATECASE}
                                    createPress={() =>
                                        {
                                            user.cases.length>0?()=>{}:createCase(Routes.CREATECASE, user)
                                        }
                                        
                                    }
                                    detailPress={() =>
                                        patientDetail(
                                            actions.EDIT_PATIENT,
                                            Routes.ADDPATIENT,
                                            user,
                                        )
                                    }
                                    onPress={()=>{}}
                                />
                            );
                        })}
                </InnerContainer>
            </ScrollView>
        </>
    );
};

export default PatientsHome;
