import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ContentContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: hp(2),
    opacity: 1,
}));

export const RoundedView = styled.View((props) => ({
    width: wp(65),
    height: hp(6),
    margin: hp(1),
    paddingHorizontal: wp(1),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: '30'
}));

export const CheckBoxContainer = styled.View((props) => ({   
   
}));
