//import liraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "~/layouts/globalLayout";
import { Routes } from "~/app-config/constants";
import { BlockContainer } from "~/layouts/Role";
import { doctorImg } from "~/assets/images";
import {
    DoctorLogo,
    BagIcon,
    TextSection,
    RoleButton,
    ButtonText,
    BottomText,
} from "~/layouts/Role";
import { cureBagImg } from "~/assets/icons";
import { IMLocalized } from "~/services/localization/IMLocalization";
import { setRole } from "~/store/reducers/authReducer";

// create a component
const RoleScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const rememberMe = useSelector(({auth})=>auth.rememberMe)

    const onClickButton = (role) => {
        dispatch(setRole(role));
        if(!rememberMe){
            navigation.replace(Routes.LOGIN)
        }
    };

    return (
        <Container>
            <BlockContainer
                display="flex"
                align="center"
                justify="center"
                background={true}
                borderBottom={true}
            >
                <DoctorLogo source={doctorImg} />
                <BagIcon source={cureBagImg} />
                <TextSection>
                    {IMLocalized("advanced medical group")}
                </TextSection>
            </BlockContainer>
            <BlockContainer
                display="flex"
                align="center"
                justify="space-around"
            >
                <RoleButton onPress={() => onClickButton(Routes.AGENT)}>
                    <ButtonText purple>{IMLocalized("agent")}</ButtonText>
                </RoleButton>
                <RoleButton onPress={() => onClickButton(Routes.PATIENT)}>
                    <ButtonText main>{IMLocalized("patient")}</ButtonText>
                </RoleButton>
                <RoleButton onPress={() => onClickButton(Routes.DOCTOR)}>
                    <ButtonText>{IMLocalized("doctor")}</ButtonText>
                </RoleButton>
                <BottomText>{IMLocalized("agreeTerm")}</BottomText>
            </BlockContainer>
        </Container>
    );
};

//make this component available to the app
export default RoleScreen;
