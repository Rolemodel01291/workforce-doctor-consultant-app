import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Card3Container = styled.View((props) => ({
    height: hp(21),
    width: wp(90),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: props.justifyContent ? props.justify : 'space-around',
    backgroundColor: props.theme.main.colors.white,
    paddingLeft: wp(1),
    margin: hp(1.2),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 5,
        height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    opacity: 1,
    elevation: "2",
}));

export const ContentContainer = styled.View((props) => ({ 
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

export const ButtonContainer = styled.View((props) => ({
    width: wp(76),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: wp(1),
}));

export const ButtonSection = styled.View((props) => ({
    width: wp(20),
    height: hp(4.8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: props.theme.main.colors.gray,
    // borderRadius: 30,
}));

