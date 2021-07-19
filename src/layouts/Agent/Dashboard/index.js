import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const BackgroundContainer = styled.View((props) => ({
    height: hp(30),
    width: wp(100),
    position: 'absolute',
    top: 0,
}));

export const DoctorLogo = styled.Image({
    height: hp(30),
    width: wp(100),
    resizeMode: 'cover',
});

export const HeaderBackgroundContainer = styled.View((props) => ({
    height: hp(30),
    width: wp(100),
    background: props.theme.main.colors.main,
    position: 'absolute',
    top: 0,
    opacity: 0.4,
}));

export const HeaderContainer = styled.View((props) => ({
    height: hp(30),
    width: wp(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
}));

export const ButtonContainer = styled.View((props) => ({ 
    width: wp(94),
    paddingTop: hp(2),
    paddingBottom: hp(1),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const CaseViewContainer = styled.View((props) => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: hp(3)
}));
