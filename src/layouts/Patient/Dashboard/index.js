import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const TopContainer = styled.View((props) => ({
    paddingTop: hp(10),
    paddingBottom: hp(4),
    width: wp(88),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.whiteSmoke
}));

export const TopContainerItemView = styled.View((props) => ({
    height: hp(18),
    width: wp(25),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
}));

export const TopContainerTextView = styled.View((props) => ({
    width: wp(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
}));

export const ShadowImage = styled.View((props) => ({
    height: props.height ? hp(props.height) : hp(11),
    width: props.width ? hp(props.width) : hp(11),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.white,  
    borderRadius: 100,

    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 100,
    opacity: 1,
    elevation: 2,
}));

export const CenterContainer = styled.View((props) => ({
    width: wp(90),
    marginBottom: hp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const LandingView = styled.View((props) => ({
    height: props.height ? hp(props.height) : hp(22),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const AdsImageView = styled.Image((props) => ({
    height: hp(22),
    width: wp(90),
    marginRight: wp(2),
    resizeMode: 'cover',
}));

export const BottomContainer = styled.View((props) => ({
    height: hp(33),
    width: wp(90),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.whiteSmoke
}));

export const BottomContainerView = styled.View((props) => ({
    display: 'flex',
    flexDirection: 'row',
    marginRight: wp(5),
}));

export const BottomContainerItemView = styled.View((props) => ({
    height: hp(21),
    width: wp(34),
    marginTop: hp(5),
    marginLeft: wp(5),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: '0.2px',
    shadowRadius: 1.41,
    opacity: 1,
    elevation: "5",
}));

export const DescriptionView = styled.View((props) => ({
    height: hp(14),
    width: wp(26),
    top: hp(-2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
}));

