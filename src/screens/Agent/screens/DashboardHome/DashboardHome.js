import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
    Container,
    FlexBetweenView,
    GrayText,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import GradientButton from '../../../../components/GradientButton';
import { theme } from '~/app-config/theme';
import {
    CaseViewContainer,
    ButtonContainer,
} from '../../../../layouts/Agent/Dashboard';
import { IMLocalized } from '~/services/localization/IMLocalization';
import { Routes } from '~/app-config/constants';
import { avatarImg } from '~/assets/images';
import { ScrollView } from 'react-native';
import DashboardHeader from './DashboardHeader';
import { TouchableOpacity } from 'react-native';
import RequireText from '../../../../components/RequireText';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    getCase,
    selectCase,
    setCleanCase,
    setCase,
} from '../../../../store/reducers/agentReducer';

const DashboardHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }) => auth.userData);
    const [loading, setLoading] = useState(false);
    const cases = useSelector(selectCase);
    const [headerData, setHeaderData] = useState([0, 0, 0]);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'patientInfo.name',
    });

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
                dispatch(getCase(auth.uid)).then(() => {
                    setLoading(false);
                });

            return () => {
                isActive = false;
            };
        }, []),
    );

    useEffect(()=>{
        if(cases.length>0){
            var activeCases =  0
            var thisYears = 0
            var resolvedCases = 0
            cases.map(item=>{
                if(item.caseStatus<2){
                    ++activeCases ;
                } else if(item.caseStatus===5){
                    resolvedCases ++
                }
                
            })
            thisYears = cases.length
            setHeaderData([activeCases, thisYears, resolvedCases])
        }
    },[cases])

    const addCase = () => {
        dispatch(setCleanCase());
        navigation.navigate(Routes.CREATECASE);
    };

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

    const goDetail = (data, route) => {
        dispatch(setCase(data));
        navigation.navigate(route);
    };

    return (
        <>
            <DashboardHeader data={headerData} />
            <FlexBetweenView
                width={100}
                height={8}
                paddingHorizontal={2}
                backgroundColor={theme.main.colors.white}>
                <RequireText>
                    <GrayText fontSize={14}>Ongoing case</GrayText>
                </RequireText>
                <Icon
                    color={theme.main.colors.fauxBlackOlive}
                    name="ios-add-circle-outline"
                    size={20}
                    onPress={addCase}
                />
            </FlexBetweenView>
            <ButtonContainer>
                <GradientButton
                    width={18}
                    text="Case"
                    onPress={() => handleRequestSort('patientInfo.name')}
                />
                <GradientButton
                    width={18}
                    text="Date"
                    onPress={() => handleRequestSort('caseCreateTime')}
                />
                <GradientButton
                    width={30}
                    text="Current status"
                    onPress={() => handleRequestSort('caseStatus')}
                />
            </ButtonContainer>
            <ScrollView>
                <CaseViewContainer>
                    {loading && (
                        <ActivityIndicator size="large" color="#00ff00" />
                    )}
                    {!loading &&
                        _.orderBy(
                            cases,
                            [
                                (o) => {
                                    if (order.id.includes('.')) {
                                        return o[order.id.split('.')[0]][
                                            order.id.split('.')[1]
                                        ];
                                    }
                                    return o[order.id];
                                },
                            ],
                            [order.direction],
                        ).map((item, index) => (
                            <MainCard
                                key={index}
                                image={
                                    item.patientInfo.avatar
                                        ? { uri: item.patientInfo.avatar }
                                        : avatarImg
                                }
                                title={item.patientInfo.name}
                                text={item.notes[0].title}
                                isShowCheck={true}
                                checked={!item.checked}
                                time={item.caseCreateTime}
                                type="TEXT_BUTTON"
                                data={item}
                                route={Routes.CASEDETAILS}
                                detailPress={() =>
                                    goDetail(item, Routes.CASEDETAILS)
                                }
                            />
                        ))}
                </CaseViewContainer>
            </ScrollView>
        </>
    );
};

export default DashboardHome;
