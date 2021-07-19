import PatientsHome from './PatientsHome';
import { Routes } from '../../../../app-config/constants';

const PatientsHomeConfig = {
    name: Routes.PATIENTSHOME,
    component: PatientsHome,
    title: 'Patients',
    icon: 'account-check',
    options: {
        headerShown: true,
    },
};

export default PatientsHomeConfig;
