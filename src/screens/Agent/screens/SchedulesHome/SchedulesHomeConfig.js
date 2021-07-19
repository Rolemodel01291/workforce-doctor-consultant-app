import SchedulesHome from './SchedulesHome';
import { Routes } from '../../../../app-config/constants';

const SchedulesHomeConfig = {
    name: Routes.SCHEDULESHOME,
    component: SchedulesHome,
    title: 'Schedules',
    icon: 'clock',
    options: {
        headerShown: true,
    },
};

export default SchedulesHomeConfig;
