import Agent from './Agent';
import {Routes} from '../../app-config/constants'

const AgentConfig = {
  name: Routes.AGENT,
  component: Agent, 
  options: {
    headerShown: false
  },
};

export default AgentConfig;
