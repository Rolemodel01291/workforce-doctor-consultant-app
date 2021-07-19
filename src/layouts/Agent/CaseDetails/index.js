import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const TextContainer = styled.View((props) => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    paddingTop: hp(2),
}));

export const WeekContainer = styled.View((props) => ({
    width: wp(96),
    height: hp(15),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: hp(3)
}));

export const ScheduleContentContainer = styled.View((props) => ({
    width: wp(96),
    height: hp(15),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));

export const LeftTextContainer = styled.View((props) => ({
    width: wp(40),
    display: 'flex',
    flexDirection:'column',
    alignItems:'flex-start',
}));
export const RightTextContainer = styled.View((props) => ({
    width: wp(60),
    display: 'flex',
    flexDirection:'column',
    alignItems:'flex-start',
}));

export const CheckboxContainer = styled.View(props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}));

export const ContentContainer = styled.View((props) => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    paddingTop: hp(2),
    paddingBottom: hp(4),
}));
