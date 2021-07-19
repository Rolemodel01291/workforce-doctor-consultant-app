import DashboardHome from './DashboardHome';
import { Routes } from '../../../../app-config/constants';

const DashboardHomeConfig = {
    name: Routes.DASHBOARDHOME,
    component: DashboardHome,
    title: 'Dashboard',
    icon: 'home',
    options: {
        headerShown: true,
    },
};

export default DashboardHomeConfig;
