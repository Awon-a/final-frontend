import { useDrop } from "react-dnd";
import { Discipline } from "../../types/discipline";
import { DisciplineTypes } from "./DnDDisciplines";
import "./DnDBlockPlan.css";
import Bucket from "../../common/assets/bucket.svg";

function CreateBlockPlace({
  name,
  planDisciplines,
  onDisciplineDrop,
  deleteDiscipline,
  icon = null,
  tableHeight = "40vh",
}: any) {
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
  const handleDeleteDiscipline = (discipline: Discipline) => {
    deleteDiscipline(discipline);
  };
  return (
    <>
      <div
        ref={drop}
        className="plan-disciplines-conteiner"
        style={{ height: tableHeight }}
      >
        {name && (
          <div className="plan-disciplines-table-caption-container">
            {icon && (
              <img
                src={icon}
                alt="icon"
                className="plan-list-caption-icon"
              ></img>
            )}
            <div className="plan-disicplines-table-caption">{name}</div>
            <div className="plan-list-caption-count-disciplines">
              {planDisciplines.length}
            </div>
          </div>
        )}
        <div
          className="plan-discipline-table-container"
          style={{ maxHeight: tableHeight }}
        >
          <table className="plan-disciplines-table">
            <thead className="plan-disciplines-table-thead">
              <tr className="plan-disciplines-table-thead-line">
                <th title="Дисциплина">Дисциплина</th>
                <th title="Код подразделения">Код подразделения</th>
                <th title="Зачетные единицы">З.Е.</th>
                <th title="Лекции">Л</th>
                <th title="Лабораторные работы">Лаб</th>
                <th title="Практики">П</th>
                <th title="Самостоятельная работа">С</th>
                <th title="Форма аттестации">Атт</th>
                <th> </th>
              </tr>
              <div className="plan-disciplines-table-thead-separator"></div>
            </thead>
            <tbody className="plan-disicpline-table-tbody">
              {!planDisciplines.length && (
                <tr key="empty">
                  <td colSpan={9} className="plan-disciplines-empty-table">
                    Разместите дисциплины здесь
                  </td>
                </tr>
              )}
              {planDisciplines.map((discipline: any) => (
                <tr key={discipline.id} className="plan-discipline-table-tr">
                  <td className="plan-discipline-table-tr-td">
                    {discipline.name}
                  </td>
                  <td className="plan-discipline-table-tr-td">
                    {discipline.codeDepartment}
                  </td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td className="plan-discipline-table-tr-td"></td>
                  <td
                    className="plan-discipline-table-tr-td"
                    onClick={() => handleDeleteDiscipline(discipline)}
                  >
                    <img
                      src={Bucket}
                      alt="icon"
                      className="plan-discipline-delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default CreateBlockPlace;
