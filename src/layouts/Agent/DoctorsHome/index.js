import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Doctors = styled.View((props) => ({
    backgroundColor: props.theme.main.colors.white,
    width: wp(100),
    display: 'flex',
    alignItems: 'center',
    paddingBottom: hp(2)
}));

export const RoundedContainer = styled.View((props) => ({
    width: wp(100),
    padding: hp(2.5),
    paddingBottom: hp(1),
    borderColor: props.theme.main.colors.gray,
    borderWidth: 1,
    borderRadius: 30,
    margin: hp(2)
}));

export const TextContainer = styled.View((props) => ({
    // backgroundColor: 'green',
    width: wp(70),
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: wp(3)
}));



