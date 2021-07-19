
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ContentHeaderContainer = styled.View((props) => ({
    width: wp(100),
    
}));

export const ContentContainer = styled.View((props) => ({
    width: wp(100),
    paddingBottom: hp(5),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 1,
}));
