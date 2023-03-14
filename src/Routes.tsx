import { Paths } from "./common/constants/paths";
import DisciplineList from "./components/DisciplineList/DisciplineList";
import PlanInfo from "./components/PlanInfo/PlanInfo";
import PlansList from "./components/PlanList/PlansList";

export const publicRoutes = [
  {
    path: Paths.AcademicPlans,
    Component: PlansList,
  },
  {
    path: Paths.PlanInfo,
    Component: PlanInfo,
  },
  {
    path: Paths.Disciplines,
    Component: DisciplineList,
  },
];
