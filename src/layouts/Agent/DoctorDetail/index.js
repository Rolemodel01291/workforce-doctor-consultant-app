import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const AvatarContainer = styled.View((props) => ({
    width: wp(100),
    position: 'absolute',
    top: hp(-5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(3),
}));

export const TopContainer = styled.View(props => ({
    paddingTop: hp(8),
    paddingBottom: hp(2)
}));

export const CardContainer = styled.View(props => ({
    width: wp(90),
    height: hp(15),
    marginTop: hp(4),   
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,   
}));

export const TextContainer = styled.View((props) => ({
    width: wp(80),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: hp(4)
}));

export const Telephone = styled.View((props) => ({
    width: wp(70),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(3)
}));

export const AccountInfoContainer = styled.View((props) => ({
    width: wp(80),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: hp(1.5)
}));

export const ButtonContainer = styled.View(props => ({
    width: wp(80),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

}));
