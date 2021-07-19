import CaseHistoryHome from './CaseHistoryHome';
import { Routes } from '../../../../app-config/constants';

const CaseHistoryHomeConfig = {
    name: Routes.CASEHISTORYHOME,
    component: CaseHistoryHome,
    title: 'Case history(Doctor)',
    icon: 'history',
    options: {
        headerShown: true,
    },
};

export default CaseHistoryHomeConfig;
