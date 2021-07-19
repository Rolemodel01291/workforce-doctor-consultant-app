import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View((props) => ({
    margin: hp(1.2),
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

export const Content = styled.View((props) => ({
    height: props.height ? props.height : hp(10.5),
    width: props.weight ? props.weight : wp(94),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: props.justifyContent ? props.justify : 'space-between',
    paddingHorizontal: wp(1.5),
    borderRadius: 10,
}));

export const TextGroup = styled.View((props) => ({
    width: props.width ? wp(props.width) : '',
    maxWidth: wp(35),
    height: props.height ? hp(props.height) : hp(7),
    display: 'flex',
    flexDirection: props.flexDirection ? props.flexDirection : 'column',
    justifyContent:
        props.flexDirection && props.flexDirection === 'row'
            ? 'space-between'
            : 'space-around',
    alignItems:
        props.flexDirection && props.flexDirection === 'row'
            ? 'center'
            : 'flex-start',
    marginLeft: wp(2),
}));

export const Description = styled.View((props) => ({
    height: hp(3),
    display: 'flex',
    flexDirection: props.flexDirection ? props.flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
}));

export const Time = styled.View((props) => ({}));

export const ButtonGroup = styled.View((props) => ({
    width: props.width ? wp(props.width) : '',
    backgroundColor: '',
    height: '100%',
    display: 'flex',
    flexDirection: props.flexDirection ? props.flexDirection : 'column',
    justifyContent:
        props.flexDirection && props.flexDirection === 'row'
            ? 'space-between'
            : 'space-around',
    alignItems:
        props.flexDirection && props.flexDirection === 'row'
            ? 'center'
            : 'flex-end',
    marginRight: wp(0),
    paddingTop: hp(1),
    paddingBottom: hp(1),
}));

export const CreateButton = styled.TouchableOpacity((props) => ({
    height: hp(2.8),
    width: wp(15),
    marginLeft: wp(1),
    marginRight: wp(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: props.theme.main.colors.green,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: hp(2),
}));

export const DetailButton = styled.TouchableOpacity((props) => ({
    height: hp(2.8),
    width: wp(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: props.theme.main.colors.green,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: hp(2),
}));
