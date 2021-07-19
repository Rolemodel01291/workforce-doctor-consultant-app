import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const Container = styled.TouchableOpacity(props => ({   
    width: props.width ? wp(props.width): '',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.white,
}));

