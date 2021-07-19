import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Content = styled.View((props) => ({
    width: wp(90),
    paddingTop: hp(5),
    // paddingBottom: hp(45),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const TextInputContainer = styled.View((props) => ({
    width: wp(90),
    height: hp(12),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));
