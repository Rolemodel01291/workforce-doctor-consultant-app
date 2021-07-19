import Logout from './Logout';
import { Routes } from '../../app-config/constants';

const LogoutConfig = {
    name: Routes.LOGOUT,
    component: Logout,
    title: 'Logout',
    icon: 'logout',
    options: {
        headerShown: true,
    },
};

export default LogoutConfig;
