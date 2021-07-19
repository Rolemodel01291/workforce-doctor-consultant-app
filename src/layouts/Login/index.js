import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import { Input, Button, CheckBox } from "react-native-elements";

export const LoginText = styled.Text((props) => ({
    fontSize: 40,
    fontWeight: 700,
    color: props.theme.main.colors.white,
    marginBottom: 50,
    alignSelf: "flex-start",
    marginLeft: 70,
}));

export const FormContainer = styled.View`
    width: ${wp(80)}px;
`;

export const TextInput = styled(Input).attrs((props) => ({
    inputContainerStyle: {
        borderColor: props.theme.main.colors.white,
        padding: 0,
        margin: 0,
    },
    labelStyle: {
        color: props.theme.main.colors.white,
    },
    errorStyle:{
        color: props.theme.main.colors.red
    }
}))`
    color: ${(props) => props.theme.main.colors.white};
    border-color: ${(props) => props.theme.main.colors.white};
`;

export const SubmitButton = styled(Button).attrs((props) => ({
    buttonStyle: {
        backgroundColor: props.theme.main.colors.main,
        borderColor: props.theme.main.colors.white,
        height: hp(7),
        marginHorizontal: 10,
    },
    titleStyle: {
        color: props.theme.main.colors.white,
    },
}))``;

export const RememberCheckBox = styled(CheckBox).attrs((props) => ({
    containerStyle: {
        width: wp(40),
        backgroundColor: props.theme.main.colors.main,
        borderWidth: 0,
        paddingHorizontal: 0,
    },
    textStyle: {
        color: props.theme.main.colors.white,
    },
}))``;

export const WhiteText = styled.Text((props) => ({
    color: props.theme.main.colors.white,
}));

export const ForgetButton = styled.TouchableOpacity((props)=>({
    width:wp(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
