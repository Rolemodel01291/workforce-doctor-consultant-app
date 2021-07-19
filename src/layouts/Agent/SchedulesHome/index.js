import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const RoundedContainer = styled.View((props) => ({
    width: wp(100),
    padding: hp(2.5),
    borderColor: props.theme.main.colors.gray,
    borderWidth: 1,
    borderRadius: 30,
    margin: hp(2)
}));

export const TextContainer = styled.View((props) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: wp(3)
}));



