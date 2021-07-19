import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const BottomButtonContainer = styled.View((props) => ({
    width: wp(100),
    marginVertical: hp(2),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 1,
}));

export const ContentContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 1,
}));
