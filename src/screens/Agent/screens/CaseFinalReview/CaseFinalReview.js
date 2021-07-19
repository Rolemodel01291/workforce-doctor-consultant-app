import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    Container,
    FlexBetweenView,
    Divider,
    GreenText,
    WrapContainer,
} from '../../../../layouts/globalLayout';
import MainCard from '../../../../components/MainCard';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import { theme } from '../../../../app-config/theme';
import {
    ContentContainer,
    RoundedView,
    CheckBoxContainer,
} from '../../../../layouts/Agent/CaseFinalReview';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
    setAction,
    setCase,
    updateCaseStatus,
    setAttorneyInfo,
    setInsuranceInfo,
} from '../../../../store/reducers/agentReducer';

const CaseFinalReview = ({ navigation }) => {
    const dispatch = useDispatch();
    const caseDetail = useSelector(({ agent }) => agent.selectedCase);
    const [items, setItems] = useState([
        {
            index: 0,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 1,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 2,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 3,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: false,
        },
        {
            index: 4,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: false,
        },
        {
            index: 5,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 6,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: false,
        },
        {
            index: 7,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 8,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
        {
            index: 9,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: false,
        },
        {
            index: 10,
            label: 'Eddie...',
            name: 'Wilson',
            time: '11:45 AM',
            checked: true,
        },
    ]);

    const [data, setData] = useState(items);

    function handleCheck(index) {
        let items = [...data];
        items[index] = { ...items[index], checked: !items[index].checked };
        setData(items);
    }

    const setStatus = (value) => {
        dispatch(
            setCase({
                ...caseDetail,
                caseStatus: parseInt(value),
            }),
        );
        dispatch(
            updateCaseStatus({
                ...caseDetail,
                caseStatus: parseInt(value),
            }),
        );
        navigation.goBack();
    };

    return (
        <ScrollView>
            <WrapContainer display="flex" align="center" justify="flex-start">
                <ContentContainer>
                    {data.map((item, index) => (
                        <RoundedView
                            borderColor={theme.main.colors.gray}
                            borderWidth={1}
                            justifyContent="center">
                            <GreenText>One a day</GreenText>
                            <CheckBoxContainer>
                                <Checkbox
                                    item={item}
                                    checked={item.checked}
                                    onPress={() => handleCheck(index)}
                                />
                            </CheckBoxContainer>
                        </RoundedView>
                    ))}
                </ContentContainer>
                <Divider marginBottom={2} />
                <TouchableOpacity>
                    <FlexBetweenView
                        width={94}
                        marginVertical={3}
                        justifyContent="center">
                        <Button
                            height={7}
                            width={90}
                            text="SAVE/DISCHARGED CASE"
                            fontSize={18}
                            fontWeight={400}
                            backgroundColor={theme.main.colors.green}
                            color={theme.main.colors.white}
                            borderRadius={15}
                            onPress={() => setStatus(4)}
                        />
                    </FlexBetweenView>
                </TouchableOpacity>
            </WrapContainer>
        </ScrollView>
    );
};

export default CaseFinalReview;
