import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { theme } from '../../app-config/theme';

export const Card2Container = styled.View((props) => ({
    width: wp(96),
    height: hp(18),
    padding: hp(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // borderWidth: 1,
    // paddingLeft: wp(1),
    margin: hp(1.2),
    borderRadius: 10,
    backgroundColor: props.theme.main.colors.white,

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

export const RightContainer = styled.View((props) => ({ 
    width: wp(65),
    marginLeft: wp(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: wp(1),
}));

export const TextGroup = styled.View((props) => ({
    height: hp(10),
    marginBottom: hp(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems: 'flex-start',
    paddingLeft: wp(1),
}));

export const TimeContainer = styled.View((props) => ({
    width: wp(65),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: wp(1),
}));

export const TimeSection = styled.View((props) => ({
    width: wp(35),
    height: hp(5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: props.theme.main.colors.blue,
    borderRadius: 30,
}));

export const CheckImage = styled.Image((props) => ({
    position: 'absolute',
    right: hp(-1),
    top: hp(-1),
}));
