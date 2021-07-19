import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ItemContainer = styled.View((props) => ({
    width: wp(90),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    marginTop: hp(3)   
}));

export const TextContainer = styled.View((props) => ({
    height: hp(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',    
}));

export const VerticalLine = styled.View((props) => ({
    height: hp(8),
    borderColor: props.theme.main.colors.blue,
    borderLeftWidth: 1,
    marginLeft: wp(4),
    marginRight: wp(4)
}));

