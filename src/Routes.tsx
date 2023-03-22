import { Paths } from "./common/constants/paths";
import Auth from "./components/Auth/Login";
import Competencies from "./components/Competencies/Competencies";
import DisciplineCompetencies from "./components/DisciplineCompetencies/DisciplineCompetencies";
import DisciplineList from "./components/DisciplineList/DisciplineList";
import PlanInfo from "./components/PlanInfo/PlanInfo";
import PlansList from "./components/PlanList/PlansList";

export const publicRoutes = [
  {
    path: Paths.AUTHENTICATION,
    Component: Auth,
  },
];

export const privateRoutes = [
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
  {
    path: Paths.CompetenciesByDiscipline,
    Component: DisciplineCompetencies,
  },
  {
    path: Paths.Competencies,
    Component: Competencies,
  },
];
