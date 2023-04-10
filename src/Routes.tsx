import { Paths } from "./common/constants/paths";
import Login from "./components/Login/Login";
import Competencies from "./components/Competencies/Competencies";
import DisciplineCompetencies from "./components/DisciplineCompetencies/DisciplineCompetencies";
import DisciplineList from "./components/DisciplineList/DisciplineList";
import PlanInfo from "./components/PlanInfo/PlanInfo";
import PlansList from "./components/PlanList/PlansList";
import Registration from "./components/Registration/Registration";
import Profile from "./components/Profile/Profile";
import { Component } from "react";
import CreatePlan from "./components/CreatePlan/CreatePlan";

export const publicRoutes = [
  {
    path: Paths.Login,
    Component: Login,
  },
  {
    path: Paths.Registration,
    Component: Registration,
  },
];

export const privateRoutes: { path: Paths; Component: any }[] = [
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
  {
    path: Paths.Profile,
    Component: Profile,
  },
  {
    path: Paths.CreateAcademicPlan,
    Component: CreatePlan,
  },
];
