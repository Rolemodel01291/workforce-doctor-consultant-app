//import liraries
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../../components/DrawerContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { doctorAppConfig } from './AppConfig';

const Drawer = createDrawerNavigator();

const Doctor = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} title='Doctor' />}>
            {doctorAppConfig.map((element, index) => (
                <Drawer.Screen
                    key={index}
                    name={element.name}
                    component={element.component}
                    options={{
                        title: element.title,
                        drawerIcon: ({focused, size}) => (
                            <Icon name={element.icon} color={focused ? "#FFF" : "#000"} size={20}/>
                        ),
                        headerShown: true
                    }}                   
                />
            ))}
        </Drawer.Navigator>
    );
};

export default Doctor;
