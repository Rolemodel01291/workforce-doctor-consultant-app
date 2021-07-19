import ProfileInfoHome from './ProfileInfoHome';
import { Routes } from '../../../../app-config/constants';

const ProfileInfoHomeConfig = {
    name: Routes.PROFILEINFOHOME,
    component: ProfileInfoHome,
    title: 'Profile Info',
    icon: 'briefcase-account',
    options: {
        headerShown: true,
    },
};

export default ProfileInfoHomeConfig;
