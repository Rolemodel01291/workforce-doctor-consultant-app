import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const SecretContainer = styled.View((props) => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const HeaderContainer = styled.View((props) => ({
    width: wp(90),
    backgroundColor: props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: hp(2)
}));

export const CardContainer = styled.View((props) => ({
    width: wp(84),
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
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: hp(2)
}));


export const MapViewContainer = styled.View((props) => ({
    width: wp(90),
    display: 'flex',
    marginVertical: hp(2)
}));

export const InputSection = styled.View((props) => ({
    width: wp(75),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(3)
}));

export const ButtonContainer = styled.View((props) => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1)
}));
