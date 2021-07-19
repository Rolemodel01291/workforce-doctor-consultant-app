import NotificationHome from './NotificationHome';
import { Routes } from '../../../../app-config/constants';

const NotificationHomeConfig = {
    name: Routes.NOTIFICATIONHOME,
    component: NotificationHome,
    title: 'Notification',
    icon: 'bell',
    options: {
        headerShown: true,
    },
};

export default NotificationHomeConfig;
