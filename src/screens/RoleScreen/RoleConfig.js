import Role from './Role';
import {Routes} from '../../app-config/constants'

const RoleConfig = {
  name: Routes.ROLE,
  component: Role,
  options: {
    headerShown: false
  },
};

export default RoleConfig;
