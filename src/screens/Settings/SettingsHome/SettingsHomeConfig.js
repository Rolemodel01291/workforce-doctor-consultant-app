import SettingsHome from './SettingsHome';
import { Routes } from '../../../app-config/constants';

const SettingsHomeConfig = {
    name: Routes.SETTINGSHOME,
    component: SettingsHome,
    title: 'Settings',
    icon: 'cog',
    options: {
        headerShown: true,
    },
};

export default SettingsHomeConfig;
