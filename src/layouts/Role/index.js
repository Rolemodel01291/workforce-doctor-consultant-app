import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";

export const BlockContainer = styled.View((props) => ({
    height: hp(50),
    width: wp(100),
    background: props.background
        ? props.theme.main.colors.main
        : props.theme.main.colors.white,
    display: props.display ? props.display : "",
    alignItems: props.align ? props.align : "",
    justifyContent: props.justify ? props.justify : "",
    borderBottomLeftRadius: props.borderBottom ? 35 : 0,
    borderBottomRightRadius: props.borderBottom ? 35 : 0,
    position: "relative",
    opacity: 1,
    paddingVertical: 50,
}));

export const DoctorLogo = styled.Image({
    height: hp(45),
    width: wp(90),
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 30,
    opacity: 0.2,
});

export const BagIcon = styled.Image({
    height: 30,
    width: 30,
    resizeMode: "contain",
    opacity: 1,
});

export const TextSection = styled.Text((props) => ({
    marginTop: 20,
    fontWeight: "700",
    width: wp(40),
    fontSize: 30,
    textAlign: "center",
    color: props.theme.main.colors.white,
}));

export const RoleButton = styled.TouchableOpacity((props) => ({
    width: wp(70),
    height: hp(7),
    borderRadius: hp(5),
    background: props.theme.main.colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: '0.2px',
    shadowRadius: 1.41,

    elevation: "2",
}));

export const ButtonText = styled.Text((props) => ({
    color: props.main
        ? props.theme.main.colors.dark
        : props.purple
        ? props.theme.main.colors.purple
        : props.theme.main.colors.red,
}));

export const BottomText = styled.Text({
    fontSize: 10,
});
