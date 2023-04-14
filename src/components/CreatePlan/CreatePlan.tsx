import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import CreatePlanStructure from "./CreatePlanStructure";

const CreatePlan = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header currentPath={pathname} />
      <CreatePlanStructure />
    </>
  );
};
export default CreatePlan;
