import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const HeaderContainer = styled.View((props) => ({
    width: wp(100),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(5),
}));

export const InputContainer = styled.View(props => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));

export const PlaceContainer = styled.View(props => ({
    width: wp(90),
    marginBottom: hp(4.5),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));

export const DateContainer = styled.View(props => ({
    width: wp(90),
    paddingBottom: hp(4),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const DescriptionContainer = styled.View(props => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));

export const MultilineInputContainer = styled.View(props => ({
    height: hp(30),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
}));

export const ContentContainer = styled.View(props => ({
    width: wp(96),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));