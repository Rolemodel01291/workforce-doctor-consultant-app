import React, {useEffect, useState} from 'react';
import {Text} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Container, AvatarImage } from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import { ButtonGroup } from '../../../../layouts/Agent/SchedulesDetail';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Card3 from '../../../../components/Card3';
import { getActiveCases } from '../../../../store/reducers/patientReducer';
import {
    setCase,
} from '../../../../store/reducers/agentReducer';

const MyActiveCase = ({ navigation }) => {
    const dispatch = useDispatch();
    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            if (isActive)
            dispatch(getActiveCases()).then(res=>{
                setLoading(false)
                setCases(res.payload)
            })   

            return () => {
                isActive = false;
            };
        }, []),
    );

    
    const goDetail = (data, route) => {
        dispatch(setCase(data));
        navigation.navigate(route);
    };

    return (
        <Container display="flex" align="center" justify="flex-start" color={theme.main.colors.lightGray}>
            {/* <ButtonGroup>
                <TouchableOpacity>
                    <Button
                        width={20}
                        height={4}
                        text="Today"
                        backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button
                        width={20}
                        height={4}
                        text="Today"
                        backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button
                        width={20}
                        height={4}
                        text="Today"
                        backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
            </ButtonGroup> */}
            <ScrollView>
                {/* {items.map((item) => (
                    <Card2
                        image={item.image}
                        name={item.name}
                        number={item.number}
                        time={item.time}
                        checked={item.checked}
                    />
                ))} */}
                {!loading&&cases.length===0&&<Text style={{marginTop:30}}>There is no active cases.</Text>}
                {!loading&&cases.map((item) => (
                        <Card3
                            title={item.notes[0].title}
                            description={item.notes[0].note}
                            onPress={() =>
                                    goDetail(item, Routes.PATIENTCASEDETAILS)
                                }
                        />
                    ))}
            </ScrollView>
        </Container>
    );
};

export default MyActiveCase;
