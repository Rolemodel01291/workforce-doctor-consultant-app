import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const TopButtonContainer = styled.View((props) => ({
    width: wp(100),
    marginVertical: hp(2),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

}));

export const ButtonContainer = styled.View((props) => ({
    width: wp(100),
    marginVertical: hp(2),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

}));

export const BottomButtonContainer = styled.View((props) => ({
    width: wp(100),
    marginBottom: hp(10),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const ContentContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));
