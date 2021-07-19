import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ItemContainer = styled.View((props) => ({
    width: wp(90),
    paddingVertical: hp(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const TitleContainer = styled.View((props) => ({
    width: wp(90),
    height: hp(9),
    paddingVertical: hp(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const Item = styled.View((props) => ({
    width: wp(90),
    paddingLeft: props.paddingLeft ? wp(props.paddingLeft) : 0,
    paddingVertical: hp(1.5),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));
