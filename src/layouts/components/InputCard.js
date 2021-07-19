import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const TextGroup = styled.View(props => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: wp(1)
}));

export const ButtonGroup = styled.View(props => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingRight: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1),
}));

export const DetailButton = styled.View(props => ({
    height: hp(2.8),
    width: wp(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: props.theme.main.colors.green,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: hp(2)
}));

export const CheckImage = styled.Image(props => ({
    position: 'absolute',
    right: hp(-1),
    top: hp(-1)
}));