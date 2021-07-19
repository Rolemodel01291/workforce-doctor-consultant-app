import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const HeaderBackgroundContainer = styled.View((props) => ({
    height: hp(12),
    width: wp(100),
    backgroundColor: props.color ? props.color : props.theme.main.colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const HeaderContainer = styled.View((props) => ({
    height: hp(12),
    width: wp(100),
    backgroundColor: props.theme.main.colors.main,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
}));

export const LeftHeaderContainer = styled.View((props) => ({    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}));

export const HeaderText = styled.Text((props) => ({
    fontSize: 20,
    color: props.theme.main.colors.white,
    marginLeft: 10,
    fontWeight: 700,
}));

export const RightText = styled.Text((props) => ({
    fontSize: 14,
    color: props.theme.main.colors.white,
    marginLeft: 10,
    fontWeight: 700,
}));

