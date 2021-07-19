import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Button } from 'react-native-elements';

export const Container = styled.View((props) => ({
    height: props.height ? hp(props.height) : hp(6),
    width: props.width ? wp(props.width) : wp(10),
    margin: props.margin ? hp(props.margin) : '',
    marginBottom: props.marginBottom ? hp(props.marginBottom) : '',
    marginRight: props.marginRight ? hp(props.marginRight) : '',
    padding: hp(0.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : props.theme.main.colors.white,
    borderRadius: props.borderRadius ? props.borderRadius : 30,
}));

export const CustomButton = styled(Button).attrs((props) => ({
    containerStyle: {
        borderRadius: props.borderRadius ? props.borderRadius : 30
    },
    buttonStyle: {
        type: props.type ? props.type : 'solid',
        backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : props.theme.main.colors.green,
        borderColor: props.borderColor
            ? props.borderColor
            : props.theme.main.colors.white,
        width: props.width ? wp(props.width) : wp(10),
        height: props.height ? hp(props.height) : hp(5),
        marginHorizontal: props.marginHorizontal
            ? wp(props.marginHorizontal)
            : 0,
        marginVertical: props.marginVertical ? hp(props.marginVertical) : 0,
        padding: 0,
        borderRadius: props.borderRadius ? props.borderRadius : 30,
    },
    titleStyle: {
        color: props.color ? props.color : props.theme.main.colors.white,
        fontSize: props.fontSize ? props.fontSize : 14,
    },
}))``;

export const GradientButton = styled(Button).attrs((props) => ({
    containerStyle: {
        borderRadius: 30,
    },
    buttonStyle: {
        type: props.type ? props.type : 'solid',
        backgroundColor: 'transparent',
        borderColor: props.borderColor
            ? props.borderColor
            : props.theme.main.colors.white,
        width: props.width ? wp(props.width) : wp(10),
        height: props.height ? hp(props.height) : hp(3.5),
        marginHorizontal: props.marginHorizontal
            ? wp(props.marginHorizontal)
            : 0,
        marginVertical: props.marginVertical ? hp(props.marginVertical) : 0,
        padding: 0,
        borderRadius: props.borderRadius ? props.borderRadius : 30,       
    },
    titleStyle: {
        color: props.color
            ? props.color
            : props.theme.main.colors.fauxBlackOlive,
        fontSize: props.fontSize ? props.fontSize : 14,
    },
    raised: {
        // backgroundColor: '#fff',
        overflow: 'visible',
        ...Platform.select({
            android: {
                elevation: 4,
            },
            default: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 30,
            },
        }),
    },
}))``;
