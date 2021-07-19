import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Container, ScrollView, WrapContainer } from '../../../../layouts/globalLayout';
import { theme } from '../../../../app-config/theme';
import { avatarImg, checkImg } from '../../../../assets/images';
import MainCard from '../../../../components/MainCard';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routes } from '../../../../app-config/constants';
import { getBookedCase } from '../../../../store/reducers/agentReducer';
import { getActiveCases, setSeletedCases, setOpenDialog } from '../../../../store/reducers/agentReducer';

const PatientsList = ({ navigation }) => {
    const dispatch = useDispatch();
    const [patients, setPatients] = useState([]);
    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(false)
    const selectedCases = useSelector(({agent})=>agent.selectedCases)
    const selectedDoctor = useSelector(({ doctor }) => doctor.selectedDoctor);
    console.log(selectedDoctor);
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

    const handlePress = (ev) => {
        // navigation.navigate(Routes.CASEDETAILS);
    };

    const handleCheck = (item) => {
        console.log('====================',item);
        dispatch(setSeletedCases([item]))
        dispatch(setOpenDialog(true))
        navigation.goBack()
    };
    console.log(selectedCases.length)

    return (
        <ScrollView>
            <WrapContainer
                display="flex"
                align="center"
                justify="flex-start"
                color={theme.main.colors.lightGray}>
                {cases.map((item, index) => (
                    <MainCard
                        image={
                            item.patientInfo.avatar
                                ? { uri: item.patientInfo.avatar }
                                : avatarImg
                        }
                        title={item.patientInfo.name}
                        text={item.notes[0].title}
                        time={item.caseCreateTime.toDate()}
                        type="CHECK_BUTTON"
                        onPress={(ev) => handlePress(ev)}
                        onCheck={handleCheck}
                        selectedCases={selectedCases}
                        data={item}
                        key={index}
                    />
                ))}
            </WrapContainer>
        </ScrollView>
    );
};

export default PatientsList;
