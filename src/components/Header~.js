//import liraries
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {HeaderContainer, HeaderText} from '../layouts/globalLayout'
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity } from 'react-native';

// create a component
const Header = ({navigation, title}) => {
    return (
        <HeaderContainer>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back" color="#FFF" size={20}/>
            </TouchableOpacity>
            <HeaderText>
                {title}
            </HeaderText>
        </HeaderContainer>
    );
};


//make this component available to the app
export default withNavigation(Header);
