//import liraries
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationConfig } from './src/screens/AppConfig';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// import PushNotification from 'react-native-push-notification';
import store from './src/store';
import { theme } from './src/app-config/theme';

const Stack = createStackNavigator();

const persistor = persistStore(store);

navigator.geolocation = require('@react-native-community/geolocation');
/**
 * inject the navigation
 * @returns App component
 * Author: Leonel Team
 * Created: 2021/6/1
 */
const App = () => {
    // PushNotification.configure({
    //     onRegister: function (token) {
    //       console.log('TOKEN:', token);
    //     },
    //     onNotification: function (notification) {
    //     //   goDetail(notification.data);
    //       // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //     },
    //     permissions: {
    //       alert: true,
    //       badge: true,
    //       sound: true,
    //     },
    //     popInitialNotification: true,
    //     requestPermissions: true,
    // });
    // PushNotification.createChannel(
    //     {
    //       channelId: 'workforce', // (required)
    //       channelName: 'workforce channel', // (required)
    //       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    //       playSound: true, // (optional) default: true
    //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //     },
    //     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    //   );
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="SPLASH">
                            {stackNavigationConfig.map((item, index) => {
                                return (
                                    <Stack.Screen
                                        name={item.name}
                                        component={item.component}
                                        key={index}
                                        options={item.options}
                                    />
                                );
                            })}
                        </Stack.Navigator>
                    </NavigationContainer>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

//make this component available to the app
export default App;
