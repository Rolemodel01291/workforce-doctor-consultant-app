import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const TitleContainer = styled.View((props) => ({
    width: wp(90), 
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}));

export const PatiantContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const CaseInfoContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(2),
}));
