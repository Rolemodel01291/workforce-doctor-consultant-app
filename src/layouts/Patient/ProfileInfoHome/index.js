import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const HeaderContainer = styled.View((props) => ({
    width: wp(90),
    marginBottom: hp(3),
    marginTop: hp(3),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
}));

export const ContentContainer = styled.View(props => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));