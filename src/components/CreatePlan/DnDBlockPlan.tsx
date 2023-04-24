import { useDrop } from "react-dnd";
import { Discipline } from "../../types/discipline";
import { DisciplineTypes } from "./DnDDisciplines";
import "./DnDBlockPlan.css";
import Bucket from "../../common/assets/bucket.svg";
import Refresh from "../../common/assets/refresh-discipline.svg";
import AddLoad from "../../common/assets/add-load-for-disc.svg";
import DeleteLoad from "../../common/assets/delete-load-for-disc.svg";
import { useEffect, useState } from "react";
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
  courses,
  onChangeDiscipline,
  disciplineLoads,
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
  const handleInputData = (
    event: any,
    id: string,
    key: string,
    semNum?: number
  ) => {
    const discipline = planDisciplines.find(
      (discipline: DisciplineForPlan) => discipline.id === id
    );
    let newDiscipline: DisciplineForPlan = {
      ...discipline,
      semesters: discipline.semesters.map((sem: any, index: number) => {
        if (index === semNum) {
          return {
            ...sem,
            [key]: +event.target.value,
          };
        }
        return sem;
      }),
      // [key]: +event.target.value,
    };
    // newDiscipline = {
    //   ...newDiscipline,
    //   sumH:
    //     newDiscipline.lectureH +
    //     newDiscipline.practiceH +
    //     newDiscipline.labH +
    //     newDiscipline.iwsH +
    //     newDiscipline.examPrep,
    // };
    onChangeDiscipline(newDiscipline);
  };
  const handleAttestationSelect = (event: any, id: string) => {
    const selectValue = event.target.value;
    const foundKey: any = Object.keys(AttestationNameMapper).find(
      (key) => AttestationNameMapper[key] === selectValue
    )!;
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
  const [isShowDisciplineData, setIsShowDisciplineData] = useState(false);
  const [disciplineToFill, setDisciplineToFill]: [any, any] = useState(false);
  useEffect(() => {
    if (disciplineToFill) {
      setDisciplineToFill(
        planDisciplines.find((el: any) => el.id === disciplineToFill.id)
      );
    }
  }, [planDisciplines, disciplineToFill]);
  console.log("FILL", disciplineToFill);
  // useEffect(() => {
  //   // setDisciplineLoad(disciplineToFill.credits);
  //   const discipline = planDisciplines.find(
  //     (discipline: DisciplineForPlan) => discipline.id === disciplineToFill.id
  //   );
  //   const newDiscipline = {
  //     ...discipline,
  //     credits: disciplineLoad,
  //   };
  //   onChangeDiscipline(newDiscipline);
  // }, [disciplineLoad, disciplineToFill, planDisciplines, onChangeDiscipline]);
  const [pickedLoad, setPickedLoad]: [any, any] = useState(false);
  const [selectedLoad, setSelectedLoad]: [any, any] = useState(false);
  const [isShowLoadData, setIsShowLoadData] = useState(false);
  const coursesNames = [
    "Первый курс",
    "Второй курс",
    "Третий курс",
    "Четвертый курс",
    "Пятый курс",
  ];
  const semestersNames = [
    "Первый семестр",
    "Второй семестр",
    "Третий семестр",
    "Четвертый семестр",
    "Пятый семестр",
    "Шестой семестр",
    "Седьмой семестр",
    "Восьмой семестр",
    "Девятый семестр",
    "Десятый семестр",
  ];
  const handleDoubleClickOnDisciplineInBlock = (
    discipline: DisciplineForPlan
  ) => {
    setDisciplineToFill(discipline as any);
    setIsShowDisciplineData(true);
  };
  const handleCloseDisciplineData = () => {
    setDisciplineToFill(false);
    setIsShowDisciplineData(false);
  };
  const handleOnClickLoad = (load: any) => {
    if (pickedLoad && pickedLoad.index === load.index) {
      setPickedLoad(false);
    } else {
      setPickedLoad(load);
    }
  };
  const handleOnClickSelectLoad = (load: { name: string }) => {
    if (selectedLoad && selectedLoad.name === load.name) {
      setSelectedLoad(false);
    } else {
      setSelectedLoad(load);
    }
  };
  const handleAddLoadButton = () => {
    setIsShowLoadData(true);
  };
  const handleHideLoadData = () => {
    setIsShowLoadData(false);
    setSelectedLoad(false);
  };
  const handleDeleteLoadButton = (pickedLoad: any) => {
    if (pickedLoad) {
      const discipline = planDisciplines.find(
        (discipline: DisciplineForPlan) => discipline.id === disciplineToFill.id
      );
      const newDiscipline = {
        ...discipline,
        credits: discipline.credits.filter(
          (load: any, index: number) => index !== pickedLoad.index
        ),
      };
      onChangeDiscipline(newDiscipline);
    }
  };
  const handleAddSelectedLoad = (load: any) => {
    if (load) {
      const discipline = planDisciplines.find(
        (discipline: DisciplineForPlan) => discipline.id === disciplineToFill.id
      );
      const newDiscipline = {
        ...discipline,
        credits: [...discipline.credits, load],
      };
      onChangeDiscipline(newDiscipline);
      // setDisciplineLoad([...disciplineLoad, load]);
      handleHideLoadData();
    }
  };
  console.log("PLAN DISCS: ", planDisciplines);
  return (
    <>
      {!!isShowLoadData && (
        <div className="plan-structure-add-load-modal">
          <div className="plan-structure-add-load-modal-content-container">
            <div className="plan-structure-add-load-modal-caption-container">
              <div className="plan-structure-add-load-modal-caption">
                Виды нагрузки
              </div>
            </div>
            <div className="plan-structure-add-load-modal-table-container">
              <table className="plan-structure-add-load-modal-table">
                <thead className="plan-structure-add-load-modal-table-thead">
                  <tr className="plan-structure-add-load-modal-table-header-line">
                    <th className="plan-structure-add-load-modal-table-header-line-th">
                      Наименование
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {disciplineLoads.map((load: any) => (
                    <tr
                      className={
                        selectedLoad && selectedLoad.name === load.name
                          ? "plan-structure-add-load-modal-table-tr-active"
                          : "plan-structure-add-load-modal-table-tr"
                      }
                      onClick={() => handleOnClickSelectLoad(load)}
                    >
                      <td className="plan-structure-add-load-modal-table-tbody-td">
                        {load.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="plan-structure-add-load-modal-content-add"
              onClick={() => handleAddSelectedLoad(selectedLoad)}
            >
              <img
                className="plan-structure-add-load-modal-content-add-icon"
                src={AddLoad}
                alt="icon"
              />
              <div className="plan-structure-add-load-modal-content-add-content">
                Добавить
              </div>
            </button>
            <span
              className="plan-structure-add-load-modal-close"
              onClick={handleHideLoadData}
            >
              &times;
            </span>
          </div>
        </div>
      )}
      {!!isShowDisciplineData && (
        <div className="plan-structure-discipline-data-modal">
          <div className="plan-structure-discipline-data-modal-content-container">
            <div className="plan-structure-discipline-data-modal-caption-container">
              <div className="plan-structure-discipline-data-modal-caption">
                Нагрузка дисциплины
              </div>
            </div>
            <div className="plan-structure-discipline-data-modal-content-info">
              <div className="plan-structure-discipline-data-modal-content-info-block">
                <div className="plan-structure-discipline-data-modal-content-info-block-label">
                  Блок:
                </div>
                <div className="plan-structure-discipline-data-modal-content-info-block-name">
                  {name}
                </div>
              </div>
              <div className="plan-structure-discipline-data-modal-content-info-discipline">
                <div className="plan-structure-discipline-data-modal-content-info-discipline-label">
                  Дисциплина:
                </div>
                <div className="plan-structure-discipline-data-modal-content-info-discipline-name">
                  {disciplineToFill.name}
                </div>
              </div>
              <div className="plan-structure-discipline-data-modal-content-info-panel">
                <button
                  className="plan-structure-discipline-data-modal-content-info-panel-add"
                  onClick={handleAddLoadButton}
                >
                  <img
                    className="plan-structure-discipline-data-modal-content-info-panel-add-icon"
                    src={AddLoad}
                    alt="icon"
                  />
                  <div className="plan-structure-discipline-data-modal-content-info-panel-add-content">
                    Добавить
                  </div>
                </button>
                <button
                  className="plan-structure-discipline-data-modal-content-info-panel-delete"
                  onClick={() => handleDeleteLoadButton(pickedLoad)}
                >
                  <img
                    className="plan-structure-discipline-data-modal-content-info-panel-delete-icon"
                    src={DeleteLoad}
                    alt="icon"
                  />
                  <div className="plan-structure-discipline-data-modal-content-info-panel-delete-content">
                    Удалить
                  </div>
                </button>
              </div>
            </div>
            <div className="plan-structure-discipline-data-modal-table-container">
              <table className="plan-structure-discipline-data-modal-table">
                <thead className="plan-structure-discipline-data-modal-table-thead">
                  <tr className="plan-structure-discipline-data-modal-table-header-line">
                    <th
                      rowSpan={2}
                      className="plan-structure-discipline-data-modal-table-header-line-th-load"
                    >
                      Вид нагрузки
                    </th>
                    {[...new Array(+courses || 0)].map(
                      (el: any, index: number) => (
                        <th
                          colSpan={2}
                          className="plan-structure-discipline-data-modal-table-header-line-th"
                        >
                          {coursesNames[index]}
                        </th>
                      )
                    )}
                  </tr>
                  <tr className="plan-structure-discipline-data-modal-table-header-line">
                    {[...new Array(+courses || 0)].map(
                      (el: any, index: number) => (
                        <>
                          <th className="plan-structure-discipline-data-modal-table-header-line-th-sub">
                            {semestersNames[2 * index]}
                          </th>
                          <th className="plan-structure-discipline-data-modal-table-header-line-th-sub">
                            {semestersNames[2 * index + 1]}
                          </th>
                        </>
                      )
                    )}
                    {/* <th className="plan-structure-discipline-data-modal-table-header-line-th-sub"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {disciplineToFill.credits.map((load: any, index: number) => (
                    <tr
                      className={
                        pickedLoad && pickedLoad.index === index
                          ? "plan-structure-discipline-data-modal-table-tr-active"
                          : "plan-structure-discipline-data-modal-table-tr"
                      }
                      onClick={() => handleOnClickLoad({ ...load, index })}
                    >
                      <td className="plan-structure-discipline-data-modal-table-tbody-td">
                        {load.name}
                      </td>
                      {[...new Array(+courses * 2 || 0)].map(
                        (el: any, index: number) => (
                          <td className="plan-structure-discipline-data-modal-table-tbody-td">
                            <input
                              type="number"
                              min={0}
                              // pattern="[0-9]+"
                              value={
                                !!disciplineToFill.semesters[index]?.[
                                  load.disciplineKey
                                ]
                                  ? disciplineToFill.semesters[index][
                                      load.disciplineKey
                                    ]
                                  : ""
                              }
                              onChange={(event) =>
                                handleInputData(
                                  event,
                                  disciplineToFill.id,
                                  load.disciplineKey,
                                  index
                                )
                              }
                              className="plan-structure-discipline-data-modal-table-tbody-td-input"
                            ></input>
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span
              className="plan-structure-discipline-data-modal-close"
              onClick={handleCloseDisciplineData}
            >
              &times;
            </span>
          </div>
        </div>
      )}
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
                    title="Зачетные единицы"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    ЗЕТ
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
                    title="Контроль самостоятельной работы"
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
                  <th
                    title="Код подразделения"
                    className="plan-disciplines-table-thead-line-td"
                  >
                    Код подразделения
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
                  <tr
                    key={discipline.id}
                    className="plan-discipline-table-tr"
                    onDoubleClick={() =>
                      handleDoubleClickOnDisciplineInBlock(discipline)
                    }
                  >
                    <td className="plan-discipline-table-tr-td">
                      {discipline.name}
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
                      title="Контроль самостоятельной работы"
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
                    <td className="plan-discipline-table-tr-td">
                      {discipline.codeDepartment}
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
