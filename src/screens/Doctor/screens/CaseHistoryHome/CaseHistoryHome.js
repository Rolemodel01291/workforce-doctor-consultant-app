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
import { setCase } from '../../../../store/reducers/agentReducer';
import { getDoctorCaseHistory } from '../../../../store/reducers/doctorReducer';

const CaseHistoryHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const uid = useSelector(({ auth }) => auth.userData.uid);
    console.log(uid);
    const [cases, setCases] = useState([]);
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
                dispatch(getDoctorCaseHistory(uid)).then((res) => {
                    setLoading(false);
                    console.log(res.payload);
                    setCases(res.payload);
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

    const goUploadFile = () => {
        navigation.navigate(Routes.DOCTORCASEFILE);
    }

    const caseFile = (route, data) => {
        dispatch(setCase(data));
        navigation.navigate(route);
    }

    const caseDetail = (route, data) => {
        dispatch(setCase(data));
        navigation.navigate(route);
    };

    return (
        <Container display="flex" align="center" justify="flex-start">
            {/* <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                <IconButton
                    source={newImg}
                    text="add new"
                    fontSize={11}
                    onPress={addPatient}
                />
            </FlexBetweenView>
            <Divider marginBottom={3} /> */}
            <ContentHeaderContainer>
                <FlexBetweenView
                    width="100%"
                    paddingLeft={1}
                    paddingRight={1}
                    paddingBottom={1}
                    paddingTop={2}
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
                            text="Status"
                            onPress={() => handleRequestSort('case')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <GradientButton
                            height={4}
                            width={15}
                            text="Date"
                            onPress={() => handleRequestSort('DOB')}
                        />
                    </TouchableOpacity>
                </FlexBetweenView>
            </ContentHeaderContainer>
            <ScrollView>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start"
                    paddingBottom={5}>
                    {loading && (
                        <ActivityIndicator size="large" color="#00ff00" />
                    )}
                    {!loading &&
                        _.orderBy(
                            cases,
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
                            return (
                                <MainCard
                                    textGroupWidth={40}
                                    image={
                                        user.avatar
                                            ? { uri: user.avatar }
                                            : avatarImg
                                    }
                                    title={user.patientInfo.name}
                                    text={user.notes[0].title}
                                    time={user.caseCreateTime}
                                    type="TEXT_BUTTON"
                                    navigation={navigation}
                                    // route={Routes.ADDPATIENT}
                                    buttonText2='Upload file'
                                    route2={Routes.CREATECASE}
                                    createPress={() =>
                                        caseFile(
                                            Routes.DOCTORCASEFILE,
                                            user,
                                        )
                                    }
                                    detailPress={() =>
                                        caseDetail(
                                            Routes.DOCTORCASEDETAILS,
                                            user,
                                        )
                                    }
                                    onPress={()=>{}}
                                />
                            );
                        })}
                </InnerContainer>
            </ScrollView>
        </Container>
    );
};

export default CaseHistoryHome;
