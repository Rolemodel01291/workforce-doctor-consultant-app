import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Input, Button, CheckBox, Avatar } from 'react-native-elements';

export const WrapContainer = styled.View((props) => ({
    width: wp(100),
    background: props.main
        ? props.theme.main.colors.main
        : props.color
        ? props.color
        : props.theme.main.colors.white,
    display: props.display ? props.display : '',
    flexDirection: props.flexDirection ? props.flexDirection : '',
    alignItems: props.align ? props.align : '',
    justifyContent: props.justify ? props.justify : '',
    paddingTop: props.paddingTop ? hp(props.paddingTop) : '',
    paddingBottom: props.paddingBottom ? hp(props.paddingBottom) : '',
    paddingLeft: props.paddingLeft ? hp(props.paddingLeft) : '',
    paddingRight: props.paddingRight ? hp(props.paddingRight) : '',
    padding: props.padding ? wp(props.padding) : '',
    paddingVertical: props.paddingVertical ? hp(props.paddingVertical) : '',
    paddingHorizontal: props.paddingHorizontal ? hp(props.paddingHorizontal) : '',
    marginVertical: props.marginVertical ? hp(props.marginVertical) : '',
    marginHorizontal: props.marginHorizontal ? hp(props.marginHorizontal) : '',
}));

export const Container = styled.View((props) => ({
    height: hp(100),
    width: wp(100),
    background: props.main
        ? props.theme.main.colors.main
        : props.color
        ? props.color
        : props.theme.main.colors.white,
    display: props.display ? props.display : '',
    alignItems: props.align ? props.align : '',
    justifyContent: props.justify ? props.justify : '',
    paddingTop: props.paddingTop ? hp(props.paddingTop) : '',
    paddingBottom: props.paddingBottom ? hp(props.paddingBottom) : '',
    paddingLeft: props.paddingLeft ? hp(props.paddingLeft) : '',
    paddingRight: props.paddingRight ? hp(props.paddingRight) : '',
    padding: props.padding ? wp(props.padding) : '',
    paddingVertical: props.paddingVertical ? hp(props.paddingVertical) : '',
    paddingHorizontal: props.paddingHorizontal ? hp(props.paddingHorizontal) : '',
    marginVertical: props.marginVertical ? hp(props.marginVertical) : '',
    marginHorizontal: props.marginHorizontal ? hp(props.marginHorizontal) : '',
}));

export const InnerContainer = styled.View((props) => ({
    width: wp(100),
    paddingTop: props.paddingTop ? hp(props.paddingTop) : 0,
    paddingBottom: props.paddingBottom ? hp(props.paddingBottom) : 0,
    background: props.main
        ? props.theme.main.colors.main
        : props.color
        ? props.color
        : props.theme.main.colors.white,
    display: props.display ? props.display : '',
    alignItems: props.align ? props.align : '',
    justifyContent: props.justify ? props.justify : '',
}));

export const ScrollView = styled.ScrollView((props) => ({
    width: wp(100),  
}));

export const ContainerWithHeader = styled.View((props) => ({
    height: hp(84.5),
    width: wp(100),
    background: props.main
        ? props.theme.main.colors.main
        : props.theme.main.colors.white,
    display: props.display ? props.display : '',
    alignItems: props.align ? props.align : '',
    justifyContent: props.justify ? props.justify : '',
}));

export const FlexBetweenContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const FlexBetweenView = styled.View((props) => ({
    backgroundColor: props.backgroundColor ? props.backgroundColor : '',
    width: props.width ? wp(props.width) : '',
    height: props.height ? hp(props.height) : '',
    display: 'flex',
    flexDirection: props.direction ? props.direction : 'row',
    justifyContent: props.justifyContent
        ? props.justifyContent
        : 'space-between',
    alignItems: 'center',
    paddingTop: props.paddingTop ? hp(props.paddingTop) : '',
    paddingBottom: props.paddingBottom ? hp(props.paddingBottom) : '',
    paddingLeft: props.paddingLeft ? hp(props.paddingLeft) : '',
    paddingRight: props.paddingRight ? hp(props.paddingRight) : '',
    padding: props.padding ? wp(props.padding) : '',
    paddingVertical: props.paddingVertical ? hp(props.paddingVertical) : '',
    paddingHorizontal: props.paddingHorizontal ? hp(props.paddingHorizontal) : '',
    marginTop: props.marginTop ? hp(props.marginTop) : '',
    marginBottom: props.marginBottom ? hp(props.marginBottom) : '',
    marginLeft: props.marginLeft ? wp(props.marginLeft) : '',
    marginRight: props.marginRight ? wp(props.marginRight) : '',
    marginVertical: props.marginVertical ? hp(props.marginVertical) : '',
    marginHorizontal: props.marginHorizontal ? hp(props.marginHorizontal) : '',
}));

export const RoundedView = styled.View((props) => ({
    height: hp(7),
    width: wp(96),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: props.justifyContent
        ? props.justifyContent
        : 'space-between',
    alignItems: 'center',
    backgroundColor: props.theme.main.colors.white,
    borderColor: props.borderColor ? props.borderColor : '',
    borderWidth: props.borderWidth ? props.borderWidth : '',
    borderRadius: 30,
}));

export const CircleView = styled.View((props) => ({
    height: props.height ? hp(props.height) : hp(11),
    width: props.width ? hp(props.width) : hp(11),
    top: props.top ? hp(props.top) : 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : props.theme.main.colors.white,
    borderColor: props.borderColor ? props.borderColor : '',
    borderWidth: props.borderWidth ? props.borderWidth : '',
    borderRadius: 50,
}));

export const ShadowContainer = styled.View((props) => ({
    height: props.height ? hp(props.height) : hp(30),
    width: props.width ? wp(props.width) : wp(90),
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

export const InputCardContainer = styled.View((props) => ({
    height: props.height ? props.height : hp(14),
    width: props.weight ? props.weight : wp(100),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: props.justifyContent ? props.justify : 'space-around',
    backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : props.theme.main.colors.white,
    paddingTop: hp(2),
    paddingLeft: wp(8),
    margin: hp(1.2),
    borderRadius: 30,
    borderColor: props.theme.main.colors.lightGray,
    borderWidth: 1,
}));

export const AvatarImage = styled.Image((props) => ({
    resizeMode: 'contain',
}));

export const RoundedImage = styled.Image((props) => ({
    width: props.width ? hp(props.width) : hp(9),
    height: props.height ? hp(props.height) : hp(9),
    backgroundColor: props.backgroundColor ? props.backgroundColor : '',
    borderRadius: props.borderRadius ? props.borderRadius : 15,
    resizeMode: 'cover',
}));

export const IconImage = styled.Image((props) => ({
    width: props.width ? wp(props.width) : '',
    height: props.width ? wp(props.width) : '',
    resizeMode: 'contain',
}));

export const CustomText = styled.Text((props) => ({
    width: props.width ? wp(props.width) : '',
    fontSize: props.fontSize ? props.fontSize : '16',
    color: props.color ? props.color : props.theme.main.colors.gray,
    lineHeight: props.lineHeight ? hp(props.lineHeight) : '',
    marginLeft: props.marginLeft ? wp(props.marginLeft) : 0,
    marginRight: props.marginRight ? wp(props.marginRight) : 0,
    fontWeight: props.fontWeight ? props.fontWeight : 200,
    paddingTop: props.paddingTop ? hp(props.paddingTop) : 0,
    paddingLeft: props.paddingLeft ? wp(props.paddingLeft) : 0,
}));

export const InputLabelText = styled.Text((props) => ({
    color: props.color ? props.color : props.theme.main.colors.gray,
    fontSize: props.fontSize,
    fontWeight: 700,
}));

export const BlackText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.black,
    fontWeight: 700,
}));

export const BlueText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.blue,
    fontWeight: 700,
}));

export const DarkBlueText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.darkBlue,
    fontWeight: 700,
}));

export const LightBlueText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.lightBlue,
    fontWeight: 700,
}));

export const GreenText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.green,
    fontWeight: 700,
    textDecorationLine: props.underline,
}));

export const GrayText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.dark,
    fontWeight: 700,
    textDecorationLine: props.underline,
    textAlign: props.textAlign ? props.textAlign : ''
}));

export const DarkGrayText = styled.Text((props) => ({
    fontSize: props.fontSize,
    lineHeight: props.lineHeight ? props.lineHeight : '',
    color: props.theme.main.colors.fauxBlackOlive,
    fontWeight: 700,
    textDecorationLine: props.underline,
}));

export const WhiteText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.white,
    fontWeight: props.fontWeight ? props.fontWeight : 700,
    textDecorationLine: props.underline,
}));

export const RedText = styled.Text((props) => ({
    fontSize: props.fontSize,
    color: props.theme.main.colors.red,
    fontWeight: props.fontWeight ? props.fontWeight : 700,
    textDecorationLine: props.underline,
}));

export const Divider = styled.View((props) => ({
    width: props.width ? props.width : wp(96),
    height: hp(1),
    borderBottomColor: props.color
        ? props.color
        : props.theme.main.colors.lightGray,
    borderBottomWidth: 1,
    paddingTop: props.paddingTop ? hp(props.paddingTop) : 0,
    paddingBottom: props.paddingBottom ? hp(props.paddingBottom) : 0,
    paddingLeft: props.paddingLeft ? hp(props.paddingLeft) : 0,
    paddingRight: props.paddingRight ? hp(props.paddingRight) : 0,
    padding: props.padding ? wp(props.padding) : 0,
    paddingVertical: props.paddingVertical ? hp(props.paddingVertical) : 0,
    paddingHorizontal: props.paddingHorizontal ? hp(props.paddingHorizontal) : 0,
    marginVertical: props.marginVertical ? hp(props.marginVertical) : 0,
    marginHorizontal: props.marginHorizontal ? hp(props.marginHorizontal) : 0,
}));

export const TextInput = styled(Input).attrs((props) => ({
    inputContainerStyle: {
        height: hp(4),
        width: wp(60),
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'red',
        borderColor: props.borderColor
            ? props.borderColor
            : props.theme.main.colors.white,
        padding: 0,
        margin: 0,
    },
    labelStyle: {
        color: props.theme.main.colors.white,
    },
    errorStyle: {
        color: props.theme.main.colors.red,
    },
    multiline: props.multiline ? props.multiline : false,
}))`
    color: ${(props) => props.theme.main.colors.white};
    border-color: ${(props) => props.theme.main.colors.white};
`;
