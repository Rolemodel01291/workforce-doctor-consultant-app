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
    paddingTop: hp(4),
    paddingBottom: hp(3),
}));

export const CardContainer = styled.View(props => ({
    width: wp(80),
    height: hp(60),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: '0.2px',
    shadowRadius: 1.41,
    opacity: 1,
    elevation: 2,
}));

export const InputSection = styled.View(props => ({
    width: wp(75),
    height: hp(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
}));

export const ButtonContainer = styled.View(props => ({
    width: wp(80),
    paddingHorizontal: wp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
}));
