import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const Container = styled.View((props)=>({
    width:wp(80),
    height: hp(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
}));

export const ButtonGroup = styled.View((props)=>({
    width:wp(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
}))