import AgentHome from './AgentHome';
import { Routes } from '../../../../app-config/constants';

const AgentHomeConfig = {
    name: Routes.AGENTHOME,
    component: AgentHome,
    title: 'Agent',
    icon: 'briefcase-account',
    options: {
        headerShown: true,
    },
};

export default AgentHomeConfig;
