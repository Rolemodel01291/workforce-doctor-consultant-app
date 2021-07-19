import DoctorProfileInfoHome from './DoctorProfileInfoHome';
import { Routes } from '../../../../app-config/constants';

const DoctorProfileInfoHomeConfig = {
    name: Routes.DOCTOPROFILEINFOHOME,
    component: DoctorProfileInfoHome,
    title: 'Profile Info',
    icon: 'doctor',
    options: {
        headerShown: true,
    },
};

export default DoctorProfileInfoHomeConfig;
