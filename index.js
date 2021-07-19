/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging'
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//     const { notification, pressAction } = detail;
  
//     // Check if the user pressed the "Mark as read" action
//     if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//       // Update external API
//       await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
//         method: 'POST',
//       });
  
//       // Remove the notification
//       await notifee.cancelNotification(notification.id);
//     }
//   });

messaging().setBackgroundMessageHandler(async remoteMessage=>{
    console.log('Message handled in the background!', remoteMessage)
    
        // Create a channel
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          },
        });

})

AppRegistry.registerComponent(appName, () => App);
