import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Input, Button } from 'react-native-elements';

export const Text = styled.Text((props) => ({
    color: props.theme.main.colors.lightDark,
    fontSize: 14,
    fontWeight: 700,
    paddingBottom: props.padding ? 50 : 20,
    width: wp(80),
    textAlign: 'center',
}));

export const TextInput = styled(Input).attrs((props) => ({
    inputContainerStyle: {
        backgroundColor: props.theme.main.colors.lightGray,
        borderColor:props.theme.main.colors.lightGray,
        borderRadius:10,
        paddingHorizontal: 10
    },
    labelStyle: {
        color: props.theme.main.colors.white,
    },
    errorStyle: {
        color: props.theme.main.colors.red,
    },
}))`
    color: ${(props) => props.theme.main.colors.dark};
    border-color: ${(props) => props.theme.main.colors.white};
`;

export const FormContainer = styled.View`
    width: ${wp(90)}px;
    display: flex;
    align-items: center;
`;

export const SubmitButton = styled(Button).attrs((props) => ({
    buttonStyle: {
        backgroundColor: props.theme.main.colors.lightGray,
        borderColor: props.theme.main.colors.lightDark,
        height: hp(7),
        width: wp(50),
        // borderRadius:15
    },
    titleStyle: {
        color: props.theme.main.colors.black,
    },
}))``;
