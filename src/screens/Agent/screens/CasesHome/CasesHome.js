import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    Container,
    FlexBetweenView,
    Divider,
} from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import GradientButton from '../../../../components/GradientButton';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    ContentHeaderContainer,
    ContentContainer,
} from '../../../../layouts/Agent/CasesHome';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg, newImg, checkImg } from '../../../../assets/images';
import IconButton from '../../../../components/IconButton';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import DatePicker from '../../../../components/DatePicker';
import {
    setCleanCase,
    selectCase,
    getCase,
    setCase,
} from '../../../../store/reducers/agentReducer';

const CasesHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }) => auth.userData);
    const cases = useSelector(selectCase);

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'patientInfo.name',
    });
    
    const addCase = () => {
        dispatch(setCleanCase());
        navigation.navigate(Routes.CREATECASE);
    };

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

    const goDetail = (data, route) => {
        dispatch(setCase(data));
        navigation.navigate(route);
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

    return (
        <Container display="flex" align="center" justify="flex-start">
            <FlexBetweenView width="100%" paddingLeft={1} paddingRight={1}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Routes.CREATECASE)}>
                    <IconButton
                        onPress={addCase}
                        source={newImg}
                        text="add cases"
                        fontSize={11}
                    />
                </TouchableOpacity>
            </FlexBetweenView>
            <Divider marginBottom={3} />
            <ContentHeaderContainer>
                <FlexBetweenView
                    width="100%"
                    marginVertical={1}
                    paddingHorizontal={2}
                    justifyContent="space-between">
                        <GradientButton
                            height={4}
                            width={20}
                            text="Case"
                            onPress={() =>
                                handleRequestSort('patientInfo.name')
                            }
                        />
                        <GradientButton
                            height={4}
                            width={15}
                            text="Date"
                            onPress={() =>
                                handleRequestSort('patientInfo.name')
                            }
                        />
                        <GradientButton
                            height={4}
                            width={30}
                            text="Current Status"
                            onPress={() => handleRequestSort('caseStatus')}
                        />
                </FlexBetweenView>
            </ContentHeaderContainer>
            <ScrollView>
                <ContentContainer>
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
                        ).map((user) => (
                            <MainCard
                                textGroupWidth={40}
                                image={
                                    user.patientInfo.avatar
                                        ? { uri: user.patientInfo.avatar }
                                        : avatarImg
                                }
                                title={user.patientInfo.name}
                                text={user.notes[0].title}
                                time={user.caseCreateTime}
                                type="TEXT_BUTTON"
                                navigation={navigation}
                                route={Routes.CASEDETAILS}
                                isShowCheck={true}
                                checked={user.checked}
                                detailPress={() =>
                                    goDetail(user, Routes.CASEDETAILS)
                                }
                                onPress={()=>{}}
                            />
                        ))}
                </ContentContainer>
            </ScrollView>
        </Container>
    );
};

export default CasesHome;
