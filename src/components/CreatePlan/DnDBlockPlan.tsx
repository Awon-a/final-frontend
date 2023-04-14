import { useDrop } from "react-dnd";
import { Discipline } from "../../types/discipline";
import { DisciplineTypes } from "./DnDDisciplines";
import "./DnDBlockPlan.css";
import Bucket from "../../common/assets/bucket.svg";
import Refresh from "../../common/assets/refresh-discipline.svg";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { DisciplineForPlan } from "./types/plan-discipline";
import { AttestationNameMapper, Attestations } from "../../types/academic-plan";

function calcPercentDiscCredits(credits: number, sum: number) {
  const percent = (credits / sum) * 100;
  return percent.toFixed(0);
}

function CreateBlockPlace({
  name,
  planDisciplines,
  onDisciplineDrop,
  deleteDiscipline,
  onChangeDiscipline,
  icon = null,
  tableHeight = "40vh",
}: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
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
  const handleRefreshDiscipline = (discipline: DisciplineForPlan) => {
    const newDiscipline: DisciplineForPlan = {
      ...discipline,
      examPrep: 0,
      iwsH: 0,
      labH: 0,
      lectureH: 0,
      practiceH: 0,
      sumH: 0,
    };
    onChangeDiscipline(newDiscipline);
  };
  const handleInputData = (event: any, id: string, key: string) => {
    const discipline = planDisciplines.find(
      (discipline: DisciplineForPlan) => discipline.id === id
    );
    let newDiscipline: DisciplineForPlan = {
      ...discipline,
      [key]: +event.target.value,
    };
    newDiscipline = {
      ...newDiscipline,
      sumH:
        newDiscipline.lectureH +
        newDiscipline.practiceH +
        newDiscipline.labH +
        newDiscipline.iwsH +
        newDiscipline.examPrep,
    };
    onChangeDiscipline(newDiscipline);
  };
  const handleAttestationSelect = (event: any, id: string) => {
    const selectValue = event.target.value;
    const foundKey: any = Object.keys(AttestationNameMapper).find(
      (key) => AttestationNameMapper[key] === selectValue
    )!;
    console.log();
    const discipline = planDisciplines.find(
      (discipline: DisciplineForPlan) => discipline.id === id
    );
    let newDiscipline: DisciplineForPlan = {
      ...discipline,
      attestation: foundKey as Attestations,
    };
    newDiscipline = {
      ...newDiscipline,
      sumH:
        newDiscipline.lectureH +
        newDiscipline.practiceH +
        newDiscipline.labH +
        newDiscipline.iwsH +
        newDiscipline.examPrep,
    };
    onChangeDiscipline(newDiscipline);
  };
  console.log({ planDisciplines });
  return (
    <>
      <div
        ref={drop}
        className="plan-disciplines-conteiner"
        style={{ maxHeight: tableHeight }}
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
            <button
              className="plan-disicplines-table-caption"
              onClick={toggleCollapse}
            >
              {name}
            </button>
            <div className="plan-list-caption-count-disciplines">
              {planDisciplines.length}
            </div>
          </div>
        )}
        <CSSTransition
          key="transition"
          in={!isCollapsed}
          timeout={300}
          classNames="table"
          unmountOnExit
        >
          <div
            className={"plan-discipline-table-container"}
            style={{ maxHeight: tableHeight, height: tableHeight }}
          >
            <table className="plan-disciplines-table">
              <thead className="plan-disciplines-table-thead">
                <tr className="plan-disciplines-table-thead-line">
                  <th
                    title="Дисциплина"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Дисциплина
                  </th>
                  <th
                    title="Код подразделения"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Код подразделения
                  </th>
                  <th
                    title="Зачетные единицы"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    З.Е.
                  </th>
                  <th
                    title="Лекции"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Лк/%
                  </th>
                  <th
                    title="Лабораторные работы"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Лр/%
                  </th>
                  <th
                    title="Практики"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Пр/%
                  </th>
                  <th
                    title="Самостоятельная работа"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Срс/%
                  </th>
                  <th
                    title="Подготовка"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Кср/%
                  </th>
                  <th
                    title="Форма аттестации"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Атт
                  </th>
                  <th> </th>
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
                {planDisciplines.map((discipline: DisciplineForPlan) => (
                  <tr key={discipline.id} className="plan-discipline-table-tr">
                    <td className="plan-discipline-table-tr-td">
                      {discipline.name}
                    </td>
                    <td className="plan-discipline-table-tr-td">
                      {discipline.codeDepartment}
                    </td>

                    <td
                      className="plan-discipline-table-tr-td"
                      title="Зачетные единицы"
                    >
                      <div className="plan-discipline-table-tr-td-input-credits">
                        {discipline.sumH}
                      </div>
                    </td>
                    <td title="Лекции" className="plan-discipline-table-tr-td">
                      <div className="plan-discipline-table-tr-td-container-credits">
                        <input
                          type="number"
                          min={0}
                          pattern="[0-9]+"
                          className="plan-discipline-table-tr-td-input-lecture"
                          value={
                            !!discipline.lectureH ? discipline.lectureH : ""
                          }
                          onChange={(event) =>
                            handleInputData(event, discipline.id, "lectureH")
                          }
                        ></input>
                        <div className="plan-discipline-table-tr-td-percent">
                          /
                          {(!!discipline.sumH &&
                            calcPercentDiscCredits(
                              discipline.lectureH,
                              discipline.sumH
                            )) ||
                            0}
                        </div>
                      </div>
                    </td>
                    <td
                      title="Лабораторные"
                      className="plan-discipline-table-tr-td"
                    >
                      <div className="plan-discipline-table-tr-td-container-credits">
                        <input
                          type="number"
                          min={0}
                          pattern="[0-9]+"
                          value={!!discipline.labH ? discipline.labH : ""}
                          onChange={(event) =>
                            handleInputData(event, discipline.id, "labH")
                          }
                          className="plan-discipline-table-tr-td-input-lab"
                        ></input>
                        <div className="plan-discipline-table-tr-td-percent">
                          /
                          {(!!discipline.sumH &&
                            calcPercentDiscCredits(
                              discipline.labH,
                              discipline.sumH
                            )) ||
                            0}
                        </div>
                      </div>
                    </td>
                    <td
                      title="Практики"
                      className="plan-discipline-table-tr-td"
                    >
                      <div className="plan-discipline-table-tr-td-container-credits">
                        <input
                          type="number"
                          min={0}
                          pattern="[0-9]+"
                          value={
                            !!discipline.practiceH ? discipline.practiceH : ""
                          }
                          onChange={(event) =>
                            handleInputData(event, discipline.id, "practiceH")
                          }
                          className="plan-discipline-table-tr-td-input-practice"
                        ></input>
                        <div className="plan-discipline-table-tr-td-percent">
                          /
                          {(!!discipline.sumH &&
                            calcPercentDiscCredits(
                              discipline.practiceH,
                              discipline.sumH
                            )) ||
                            0}
                        </div>
                      </div>
                    </td>
                    <td
                      title="Самостоятельная работа"
                      className="plan-discipline-table-tr-td"
                    >
                      <div className="plan-discipline-table-tr-td-container-credits">
                        <input
                          type="number"
                          min={0}
                          pattern="[0-9]+"
                          value={!!discipline.iwsH ? discipline.iwsH : ""}
                          onChange={(event) =>
                            handleInputData(event, discipline.id, "iwsH")
                          }
                          className="plan-discipline-table-tr-td-input-iws"
                        ></input>
                        <div className="plan-discipline-table-tr-td-percent">
                          /
                          {(!!discipline.sumH &&
                            calcPercentDiscCredits(
                              discipline.iwsH,
                              discipline.sumH
                            )) ||
                            0}
                        </div>
                      </div>
                    </td>
                    <td
                      title="Подготовка"
                      className="plan-discipline-table-tr-td"
                    >
                      <div className="plan-discipline-table-tr-td-container-credits">
                        <input
                          type="number"
                          min={0}
                          pattern="\d*"
                          value={
                            !!discipline.examPrep ? discipline.examPrep : ""
                          }
                          onChange={(event) =>
                            handleInputData(event, discipline.id, "examPrep")
                          }
                          className="plan-discipline-table-tr-td-input-prep"
                        ></input>
                        <div className="plan-discipline-table-tr-td-percent">
                          /
                          {(!!discipline.sumH &&
                            calcPercentDiscCredits(
                              discipline.examPrep,
                              discipline.sumH
                            )) ||
                            0}
                        </div>
                      </div>
                    </td>
                    <td
                      title="Форма аттестации"
                      className="plan-discipline-table-tr-td"
                    >
                      <Select
                        discipline={discipline}
                        onChange={handleAttestationSelect}
                      />
                    </td>
                    <td
                      className="plan-discipline-table-tr-td"
                      onClick={() => handleRefreshDiscipline(discipline)}
                    >
                      <img
                        src={Refresh}
                        alt="icon"
                        className="plan-discipline-refresh"
                      />
                    </td>
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
        </CSSTransition>
      </div>
    </>
  );
}

function Select({ discipline, onChange }: any) {
  const value = AttestationNameMapper[discipline.attestation];
  console.log({ value, att: discipline.attestation });
  return (
    <select
      className="plan-discipline-table-tr-td-input-attestation"
      value={value}
      onChange={(event) => onChange(event, discipline.id, "attestation")}
    >
      {Object.keys(AttestationNameMapper).map((key: any) => (
        <option key={key} value={AttestationNameMapper[key]}>
          {AttestationNameMapper[key]}
        </option>
      ))}
    </select>
  );
}
export default CreateBlockPlace;
