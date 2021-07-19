import DoctorsHome from './DoctorsHome';
import { Routes } from '../../../../app-config/constants';

const DoctorsHomeConfig = {
    name: Routes.DOCTORSHOME,
    component: DoctorsHome,
    title: 'Doctors',
    icon: 'doctor',
    options: {
        headerShown: true,
    },
};

export default DoctorsHomeConfig;
