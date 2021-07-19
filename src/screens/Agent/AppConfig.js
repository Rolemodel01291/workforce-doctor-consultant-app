import LogoutConfig from "../Logout/LogoutConfig";
import SettingsHomeConfig from "../Settings/SettingsHome/SettingsHomeConfig";
import AgentHomeConfig from "./screens/AgentHome/AgentHomeConfig";
import CasesHomeConfig from "./screens/CasesHome/CasesHomeConfig";
import DashboardHomeConfig from "./screens/DashboardHome/DashboardHomeConfig";
import DoctorsHomeConfig from "./screens/DoctorsHome/DoctorsHomeConfig";
import PatientsHomeConfig from "./screens/PatientsHome/PatientsHomeConfig";
import SchedulesHomeConfig from "./screens/SchedulesHome/SchedulesHomeConfig";

export const agentAppConfig = [
    DashboardHomeConfig,
    AgentHomeConfig,    
    PatientsHomeConfig,
    CasesHomeConfig,
    DoctorsHomeConfig,
    SchedulesHomeConfig,    
    SettingsHomeConfig,
    LogoutConfig
]