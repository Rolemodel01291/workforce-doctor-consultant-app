import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const AvatarContainer = styled.View((props) => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(2),
    paddingBottom: hp(2),
}));

export const SwitchContainer = styled.View((props) => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(3),
}));

export const CardContainer = styled.View((props) => ({
    height: props.height ? props.height : hp(9.5),
    width: props.weight ? props.weight : wp(96),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingLeft: wp(4),
    margin: hp(1.2),
    // borderColor: props.data.flag
    //     ? props.theme.main.colors.green
    //     : props.theme.main.colors.fauxBlackOlive,
    borderWidth: 1,
    borderRadius: 10,
}));

export const IconContainer = styled.View((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',   
    position: 'absolute',
    right: hp(-1),
    top: hp(-1),
    borderRadius: 100,
    backgroundColor: props.theme.main.colors.lightGray
}));

export const SendReminder = styled.View(props => ({
    height: hp(2.8),
    width: wp(24),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: props.theme.main.colors.green,
    borderRadius: 20,
    alignItems: 'center',
}));