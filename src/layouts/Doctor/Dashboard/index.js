import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Card, Input } from 'react-native-elements';

export const HeaderContainer = styled.View((props) => ({
    width: wp(86),
    height: hp(10),
    marginTop: hp(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}));

export const CaseCardContainer = styled.View((props) => ({
    width: wp(86),
    height: hp(23),
    padding: wp(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 12,
    backgroundColor: props.theme.main.colors.darkBlue,
}));

export const MiddleContainer = styled.View((props) => ({
    width: wp(86),
    height: hp(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const ScheduleCardContainer = styled.View((props) => ({
    width: wp(86),
    height: hp(15),
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
    marginTop: hp(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 12,
    backgroundColor: props.theme.main.colors.lightBlue,
}));

export const DateCardContainer = styled.View((props) => ({
    width: wp(22),
    height: hp(15),
    top: hp(-3),
    padding: wp(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderRadius: 12,
    backgroundColor: props.theme.main.colors.white,

    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: '0.2px',
    shadowRadius: 1.41,
    opacity: 1,
    elevation: 2
}));

export const ScheduleCardTextContainer = styled.View((props) => ({
    width: wp(50),
    height: hp(13),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
}));