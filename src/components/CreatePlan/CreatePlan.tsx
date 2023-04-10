import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import { Discipline, DisciplineState } from "../../types/discipline";
import Header from "../Header/Header";
import "./DisciplinesTable.css";
import CreatePlanPlace from "./DnDCreatePlan";
import DisciplineItem from "./DnDDisciplines";

const CreatePlan = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let { disciplines: disciplinesState } = useSelector(
    (state: DisciplineState) => state.disciplines
  );
  const [disciplines, setDisciplines] = useState([]);
  const handleDragStart = (event: any, id: string) => {
    event.dataTransfer.setData("id", id);
  };
  console.log({ disciplines });
  useEffect(() => {
    dispatch(getDisciplines());
  }, [dispatch]);
  useEffect(() => {
    setDisciplines(disciplinesState as any);
  }, [disciplinesState]);
  const handleDisciplineMove = (discipline: any) => {
    // setDisciplines(
    //   disciplines.filter((d: Discipline) => d.id !== discipline.id)
    // );
  };

  const [planDisciplines, setPlanDisciplines]: any = useState([]);
  const handleDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setPlanDisciplines((prevPlanDisciplines: any) => [
        ...prevPlanDisciplines,
        discipline,
      ]);
    },
    [setDisciplines, setPlanDisciplines]
  );
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Header currentPath={pathname} />
        <DisciplineItem
          disciplines={disciplines}
          handleDisciplineMove={handleDisciplineMove}
        />
        <CreatePlanPlace
          planDisciplines={planDisciplines}
          onDisciplineDrop={handleDisciplineDrop}
        />
      </DndProvider>
    </>
  );
};
export default CreatePlan;
