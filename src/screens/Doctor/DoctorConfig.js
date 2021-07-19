import Doctor from './Doctor';
import {Routes} from '../../app-config/constants'

const DoctorConfig = {
  name: Routes.DOCTOR,
  component: Doctor, 
  options: {
    headerShown: false
  },
};

export default DoctorConfig;
