import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const ContentContainer = styled.View(props => ({
    width: wp(100),
    // height: hp(70),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5)
}));

export const DatePickerContainer = styled.View(props => ({
    width: wp(90),
    height: hp(7.5),
    paddingLeft: wp(2),
    marginBottom: hp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: props.theme.main.colors.gray,
    borderWidth: 1,
    borderRadius: 10
}));
