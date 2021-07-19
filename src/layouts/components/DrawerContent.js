import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import { Avatar, Input } from 'react-native-elements';

export const Banner = styled.View((props) => ({
    height: hp(22),
    width: wp(100),
    background: props.theme.main.colors.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: hp(1),
    position: 'absolute'
}));

export const NavItemContainer = styled.View((props) => ({
    paddingTop: hp(23),
}));

export const AvatarContainer = styled.View((props) => ({
    width: wp(100),
    padding: wp(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

export const AvatarImage = styled(Avatar).attrs((props) => ({
}))`
source: ${(props) => props.source}
height: ${hp(12)},
width: ${wp(12)},
resizeMode: 'contain'  
`;

export const AvatarText = styled.Text((props) => ({
    fontSize: 22,
    color:  props.theme.main.colors.white,
    marginLeft: wp(4)
}));

export const LinkContainer = styled.View((props) => ({
    width: wp(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: hp(7),
    paddingLeft: wp(5),
}));

export const Link = styled.Text(props => ({ 
    color: props.theme.main.colors.veryLightGrey,
    fontSize: 12,
    fontWeight: 600,
    paddingBottom: props.paddingBottom && hp(props.paddingBottom),
    paddingTop: props.paddingTop && hp(props.paddingTop),
    width: wp(80),
    textAlign: 'left',
}));
