import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ButtonGroup = styled.View((props) => ({
    width: wp(100),
    paddingTop: hp(2),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',    
}));
