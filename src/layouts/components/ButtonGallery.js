import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Container = styled.View(props => ({
    display: 'flex',
    flexDirection: 'row'
}))

export const WeekContainer = styled.View((props) => ({
    width: wp(96),
    height: hp(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: hp(3)
}));

export const ScrollView = styled.ScrollView(props => ({
    maxHeight: hp(13),
    height: hp(13),
}))

export const WeekItem = styled.View(props => ({
    width: wp(18),
    height: hp(12),
    marginLeft: wp(1),
    marginRight: wp(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    borderWidth: 1,
    borderRadius: 25
}))