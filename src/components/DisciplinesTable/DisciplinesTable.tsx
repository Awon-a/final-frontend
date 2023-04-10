import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import { DisciplineState } from "../../types/discipline";
import "./DisciplinesTable.css";

const DisciplinesTable = () => {
  const dispatch = useDispatch();
  const { disciplines } = useSelector(
    (state: DisciplineState) => state.disciplines
  );
  const handleDragStart = (event: any, id: string) => {
    event.dataTransfer.setData("id", id);
  };
  useEffect(() => {
    dispatch(getDisciplines());
  }, [dispatch]);
  return (
    <>
      <div className="table-container">
        <div className="disicplines-table-caption">Дисциплины</div>
        <div className="discipline-table-container">
          <table className="disciplines-table">
            <thead className="disciplines-table-thead">
              <tr className="disciplines-table-header-line">
                <th>Название</th>
                <th>Код подразделения</th>
              </tr>
            </thead>
            <tbody>
              {disciplines.map((discipline) => (
                <tr
                  onDragStart={(event) => handleDragStart(event, discipline.id)}
                  className="discipline-table-tr"
                  key={discipline.id}
                  draggable
                >
                  <td className="disicpline-table-tbody-td">
                    {discipline.name}
                  </td>
                  <td className="disicpline-table-tbody-td">
                    {discipline.codeDepartment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default DisciplinesTable;
