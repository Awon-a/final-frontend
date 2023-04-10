import { useDrop } from "react-dnd";
import { Discipline } from "../../types/discipline";
import { DisciplineTypes } from "./DnDDisciplines";
import "./CreatePlan.css";

function CreatePlanPlace({ planDisciplines, onDisciplineDrop }: any) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DisciplineTypes.Discipline,
    drop: (item: { discipline: Discipline }) => {
      onDisciplineDrop(item.discipline);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className="plan-disciplines-conteiner">
      <div className="plan-disicplines-table-caption">Учебный план</div>
      <div className="plan-discipline-table-container">
        <table className="plan-disciplines-table">
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Код подразделения</th>
              <th>З.Е.</th>
              <th>Л</th>
              <th>Лаб</th>
              <th>П</th>
              <th>С</th>
              <th>Атт</th>
            </tr>
          </thead>
          <tbody>
            {planDisciplines.map((discipline: any) => (
              <tr key={discipline.id}>
                <td>{discipline.name}</td>
                <td>{discipline.codeDepartment}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CreatePlanPlace;
