import Patient from './Patient';
import {Routes} from '../../app-config/constants'

const PatientConfig = {
  name: Routes.PATIENT,
  component: Patient, 
  options: {
    headerShown: false
  },
};

export default PatientConfig;
