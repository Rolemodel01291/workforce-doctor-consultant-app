import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {
    Container,
    AvatarImage,
    InnerContainer,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import { ButtonGroup } from '../../../../layouts/Patient/AllNotes';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Card3 from '../../../../components/Card3';
import { getCaseHistory } from '../../../../store/reducers/patientReducer';
import {

    setCase,
} from '../../../../store/reducers/agentReducer';

const AllNotes = ({ navigation }) => {
    const dispatch = useDispatch();
    const [cases, setCases] = useState([])
    useEffect(() => {
        dispatch(getCaseHistory()).then(res=>{
            setCases(res.payload)
        })
        
    }, [])


    const goDetail = (data, route) => {
        dispatch(setCase(data));
        navigation.navigate(route);
    };

    return (
        <Container display="flex" align="center" justify="flex-start">
            {/* <ButtonGroup>
                <TouchableOpacity>
                    <Button width={25} text="Recent"></Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button width={25} text="Today"></Button>
                </TouchableOpacity>
            </ButtonGroup> */}
            <ScrollView>
                <InnerContainer
                    display="flex"
                    align="center"
                    justify="flex-start"
                    paddingBottom={5}>
                    {cases.map((item) => (
                        <Card3
                            title={item.notes[0].title}
                            description={item.notes[0].description}
                            onPress={() =>
                                    goDetail(item, Routes.PATIENTCASEDETAILS)
                                }
                        />
                    ))}
                </InnerContainer>
            </ScrollView>
        </Container>
    );
};

export default AllNotes;
