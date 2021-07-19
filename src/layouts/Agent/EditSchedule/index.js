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

ScheduleContainer

export const ScheduleContainer = styled.View((props) => ({
    width: wp(100),
    marginBottom: hp(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const RoundedBox = styled.View((props) => ({
    height: props.height ? props.height : hp(5.5),
    width: props.weight ? props.weight : wp(90),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: hp(1.2),
    paddingRight: wp(2),
    borderColor: props.theme.main.colors.fauxBlackOlive,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRadius: 20,
}));

export const RoundedInnerBox = styled.View((props) => ({
    height: props.height ? props.height : hp(5.5),
    width: props.weight ? props.weight : wp(35),
    backgroundColor: props.backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: props.theme.main.colors.green,
    borderWidth: 1,
    borderRadius: 20,
}));

export const OutCircleBage = styled.View(props => ({
    height: wp(5.5),
    width: wp(5.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.whiteSmoke,
    borderRadius: 20,
    position: 'absolute',
    top: hp(-1.8),
    right: wp(-1)
}));

export const InnerCircleBage = styled.View(props => ({
    height: wp(4),
    width: wp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.color,
    borderRadius: 20,
}));

export const BageNumber = styled.Text(props => ({
    fontSize: 11,
    color: props.theme.main.colors.white,
    fontWeight: 700,
}));