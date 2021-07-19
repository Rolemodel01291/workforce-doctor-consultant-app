import CasesHome from './CasesHome';
import { Routes } from '../../../../app-config/constants';

const CasesHomeConfig = {
    name: Routes.CASESHOME,
    component: CasesHome,
    title: 'Cases',
    icon: 'account-box',
    options: {
        headerShown: true,
    },
};

export default CasesHomeConfig;
