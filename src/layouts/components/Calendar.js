import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const Container = styled.View(props => ({   
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),

    borderRadius: props.borderRadius ? props.borderRadius : 30,
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

export const ShadowContainer = styled.View((props) => ({
    width: props.width ? wp(props.width) : wp(90),
    marginVertical: hp(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: props.justifyContent ? props.justify : 'center',
    backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : props.theme.main.colors.white,
        
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    opacity: 1,
    elevation: 2,
}));