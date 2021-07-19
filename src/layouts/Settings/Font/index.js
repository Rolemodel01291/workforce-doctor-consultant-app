import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Content = styled.View((props) => ({
    width: wp(80),
    paddingTop: hp(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}));

export const FontSize = styled.View((props) => ({
    width: wp(80),
    height: hp(6),
    marginTop: hp(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}));
