import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateBlockPlace from "./DnDBlockPlan";
import DisciplineItem from "./DnDDisciplines";
import "./DisciplinesTable.css";
import "./CreatePlanStructure.css";
import Tabs from "../../common/assets/tabs.svg";
import List from "../../common/assets/list.svg";
import ArrowTo from "../../common/assets/arrow-to.svg";
import Settings from "../../common/assets/create-plan-settings.svg";
import WarningCredits from "../../common/assets/warning-credits.svg";
import PreviewPlan from "../../common/assets/eye-for-create-plan.svg";
import CreatePreviewPlan from "./PreviewCreatePlan/CreatePreviewPlan";
import { mapKeys } from "lodash";
import { DisciplineForPlan } from "./types/plan-discipline";
import { Competency } from "../../types/competencies.js";

const LOW_BOUND = 240;
const HIGH_BOUND = 300;

const CreatePlanStructure = ({
  goBack,
  disciplines,
  activeTab,
  viewType,
  isPlanStructureCompetenciesCollapsed,
  showDownArrow,
  blocks,
  blockNames,
  currentBlockName,
  disciplinesBlockMapper,
  activePlanStructurePartsTab,
  toggleViewToListType,
  toggleViewToTabsType,
  toggleViewToPreviewType,
  handleClickTab,
  selectedCompetencies,
  toggleIsPlanStructureCompetenciesCollapsedCollapse,
  handleDisciplinesCurrentBlockChange,
  handleClickPlanStructurePartsTab,
  handleCalcPercentComptenciesOnChange,
}: any) => {
  const handleDisciplineMove = (discipline: any) => {
    // setDisciplines(
    //   disciplines.filter((d: Discipline) => d.id !== discipline.id)
    // );
  };
  const partsTabsNames = ["Дисциплины", "Компетенции"];
  const panelRef: any = useRef(null);
  const handleMouseWheel = (event: any) => {
    event.preventDefault();
    const container = panelRef.current;
    const containerScrollPosition = container.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + event.deltaY,
      behavior: "smooth",
    });
  };

  let scrollSpeed = 10;
  const maxScrollSpeed = 100;
  const vhScrollPLace = 15;
  const scrollZoneWidth = (vhScrollPLace / 100) * window.innerHeight;
  let scrollInterval: any = null;

  function handleDrag(event: any) {
    event.preventDefault();
    const pageHeight = document.documentElement.clientHeight;
    const mouseY = event.clientY;
    const deltaY =
      mouseY < scrollZoneWidth
        ? -1
        : mouseY > pageHeight - scrollZoneWidth
        ? 1
        : 0;

    let scrollSpeedY = scrollSpeed;
    const distanceFromVerticalEdge =
      deltaY === -1 ? mouseY : pageHeight - mouseY;
    const exponent = 2; // adjust this value to control the speed increase
    const t = distanceFromVerticalEdge / scrollZoneWidth;
    scrollSpeedY = (scrollSpeed * Math.pow(1 + t, exponent)) / 7;
    scrollSpeedY = Math.min(scrollSpeedY, maxScrollSpeed);
    if (deltaY !== 0) {
      if (!scrollInterval) {
        scrollInterval = setInterval(() => {
          window.scrollBy(0, deltaY * scrollSpeedY);
        }, 20);
      }
      let topArrow: any = document.getElementById("scroll-top");
      let bottomArrow: any = document.getElementById("scroll-bottom");
      if (!bottomArrow) {
        bottomArrow = document.createElement("div");
        bottomArrow.id = "scroll-bottom";
        document.body.appendChild(bottomArrow);
      }
      if (!topArrow) {
        topArrow = document.createElement("div");
        topArrow.id = "scroll-top";

        document.body.appendChild(topArrow);
      }
      if (window.pageYOffset > 0) {
        topArrow.style.display = "block";
      } else {
        topArrow.style.display = "none";
      }
      if (
        window.pageYOffset <
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      ) {
        bottomArrow.style.display = "block";
      } else {
        bottomArrow.style.display = "none";
      }
    } else {
      clearInterval(scrollInterval);
      scrollInterval = null;

      let topArrow: any = document.getElementById("scroll-top");
      let bottomArrow: any = document.getElementById("scroll-bottom");
      if (topArrow) {
        topArrow.parentNode.removeChild(topArrow);
      }
      if (bottomArrow) {
        bottomArrow.parentNode.removeChild(bottomArrow);
      }
    }
  }

  document.body.addEventListener("dragover", handleDrag);
  const handleDragEnd = (event: any) => {
    event.preventDefault();
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
      scrollInterval = null;

      let topArrow: any = document.getElementById("scroll-top");
      let bottomArrow: any = document.getElementById("scroll-bottom");
      if (topArrow) {
        topArrow.parentNode.removeChild(topArrow);
      }
      if (bottomArrow) {
        bottomArrow.parentNode.removeChild(bottomArrow);
      }
    }
  };
  document.body.addEventListener("dragend", handleDragEnd);
  // document.body.addEventListener("dragleave", handleDragEnd);
  let dataForPreviewTable = blocks.map((block: any) =>
    mapKeys(block, (value, key: string) => {
      if (key === "blockName") return "titleRow";
      return key;
    })
  );
  const [showModal, setShowModal] = useState(false);
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const renderWarningCredits = (
    blocks: { disciplines: DisciplineForPlan[] }[]
  ) => {
    const creditsSum = blocks.reduce((prev, block) => {
      const blockSum = block.disciplines.reduce(
        (prev, current) => prev + current.sumH,
        0
      );
      return prev + blockSum;
    }, 0);
    if (creditsSum < LOW_BOUND)
      return (
        <div className="plan-disciplines-credits-bound-warning-container">
          <div>
            <img
              className="plan-disciplines-credits-bound-warning-icon"
              src={WarningCredits}
              alt="icon"
            ></img>
          </div>
          <div className="plan-disciplines-credits-bound-warning-content">
            Внимание! Общая трудоемкость УП не соответствует объему
            образовательной программы (текущая: {creditsSum} <u>&lt;</u> 240).
          </div>
        </div>
      );
    if (creditsSum > HIGH_BOUND)
      return (
        <div className="plan-disciplines-credits-bound-warning-container">
          <div>
            <img
              className="plan-disciplines-credits-bound-warning-icon"
              src={WarningCredits}
              alt="icon"
            ></img>
          </div>
          <div className="plan-disciplines-credits-bound-warning-content">
            Внимание! Общая трудоемкость УП не соответствует объему
            образовательной программы (текущая: {creditsSum} <u>&gt;</u>
            300).
          </div>
        </div>
      );
  };
  const parameters = [
    {
      name: "Часов в ЗЕТ",
      value: 36,
    },
    {
      name: "Кол-во ЗЕТ в учебном плане",
      value: 240,
    },
    {
      name: "Кол-во ЗЕТ в году",
      value: 60,
    },
    {
      name: "Кол-во ЗЕТ в семестре",
      value: 35,
    },
  ];
  return (
    <>
      {showModal && (
        <div className="plan-structure-settings-modal">
          <div className="plan-structure-settings-modal-content-container">
            <div className="plan-structure-settings-modal-caption-container">
              <div className="plan-structure-settings-modal-caption">
                Настройки
              </div>
            </div>
            <div className="plan-structure-settings-modal-table-container">
              <table className="plan-structure-settings-modal-table">
                <thead className="disciplines-table-thead">
                  <tr className="disciplines-table-header-line">
                    <th className="disciplines-table-header-line-th">
                      Параметр
                    </th>
                    <th className="disciplines-table-header-line-th">
                      Значение
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param: any) => (
                    <tr className="discipline-table-tr">
                      <td className="plan-structure-settings-modal-table-tbody-td-label">
                        {param.name}
                      </td>
                      <td className="plan-structure-settings-modal-table-tbody-td-input">
                        <input
                          type="number"
                          min={0}
                          value={param.value}
                          className="plan-structure-settings-modal-table-td-input "
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span
              className="plan-structure-settings-modal-close"
              onClick={handleCloseModal}
            >
              &times;
            </span>
          </div>
        </div>
      )}
      <div>
        <div className="rigth-tables-container">
          <DndProvider backend={HTML5Backend}>
            <div>
              <ul className="plan-structure-selected-competencies-tabs-container">
                {partsTabsNames.map((part: string, index: number) => (
                  <li
                    key={index}
                    className={
                      index === activePlanStructurePartsTab
                        ? "plan-structure-selected-competencies-tabs-container-li-active"
                        : "plan-structure-selected-competencies-tabs-container-li"
                    }
                    onClick={() => handleClickPlanStructurePartsTab(index)}
                  >
                    {part}
                  </li>
                ))}
              </ul>
              {(activePlanStructurePartsTab === 0 && (
                <DisciplineItem
                  disciplines={disciplines}
                  handleDisciplineMove={handleDisciplineMove}
                  blocks={blocks}
                  blockNames={blockNames}
                  currentBlockName={currentBlockName}
                  disciplinesBlockMapper={disciplinesBlockMapper}
                  handleDisciplinesCurrentBlockChange={
                    handleDisciplinesCurrentBlockChange
                  }
                />
              )) ||
                (activePlanStructurePartsTab === 1 && (
                  <div className="plan-structure-selected-competencies-container">
                    <div className="plan-structure-selected-competencies-table-container">
                      <table className="plan-structure-selected-competencies-table">
                        <thead className="plan-structure-selected-competencies-table-thead">
                          <tr className="plan-structure-selected-competencies-table-header-line">
                            <th className="plan-structure-selected-competencies-table-header-line-td">
                              Код
                            </th>
                            <th className="plan-structure-selected-competencies-table-header-line-td">
                              Название
                            </th>
                            <th className="plan-structure-selected-competencies-table-header-line-td"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCompetencies.map(
                            (competence: Competency & { rateSum: number }) => (
                              <tr
                                className="plan-structure-selected-competencies-table-tr"
                                style={{
                                  backgroundImage: `linear-gradient(to right, rgba(230,250,253,1) ${
                                    competence.rateSum * 100
                                  }%, rgba(255, 255, 255) 0)`,
                                }}
                                key={competence.id}
                              >
                                <td className="plan-structure-selected-competencies-table-tbody-td">
                                  {competence.code}
                                </td>
                                <td className="plan-structure-selected-competencies-table-tbody-td">
                                  {competence.name}
                                </td>
                                <td className="plan-structure-selected-competencies-table-tbody-td">
                                  {((competence.rateSum * 100) as any).toFixed(
                                    2
                                  ) >= 100
                                    ? 100
                                    : (
                                        (competence.rateSum * 100) as any
                                      ).toFixed(2)}
                                  %
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
            {/* <div className="plan-structure-selected-competencies-container">
              <button
                className="plan-structure-selected-competencies-caption"
                onClick={toggleIsPlanStructureCompetenciesCollapsedCollapse}
              >
                Компетенции
              </button>
              <CSSTransition
                key="competencies-transition"
                in={!isPlanStructureCompetenciesCollapsed}
                timeout={300}
                classNames="competencies"
                unmountOnExit
              >
                <div className="plan-structure-selected-competencies-table-container">
                  <table className="plan-structure-selected-competencies-table">
                    <thead className="plan-structure-selected-competencies-table-thead">
                      <tr className="plan-structure-selected-competencies-table-header-line">
                        <th className="plan-structure-selected-competencies-table-header-line-td">
                          Код
                        </th>
                        <th className="plan-structure-selected-competencies-table-header-line-td">
                          Название
                        </th>
                        <th className="plan-structure-selected-competencies-table-header-line-td"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCompetencies.map(
                        (competence: Competency & { rateSum: number }) => (
                          <tr
                            className="plan-structure-selected-competencies-table-tr"
                            style={{
                              backgroundImage: `linear-gradient(to right, rgba(230,250,253,1) ${
                                competence.rateSum * 100
                              }%, rgba(255, 255, 255) 0)`,
                            }}
                            key={competence.id}
                          >
                            <td className="plan-structure-selected-competencies-table-tbody-td">
                              {competence.code}
                            </td>
                            <td className="plan-structure-selected-competencies-table-tbody-td">
                              {competence.name}
                            </td>
                            <td className="plan-structure-selected-competencies-table-tbody-td">
                              {competence.rateSum * 100 >= 100
                                ? 100
                                : competence.rateSum * 100}
                              %
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </CSSTransition>
            </div> */}

            {/* <DisciplineItem
              disciplines={disciplines}
              handleDisciplineMove={handleDisciplineMove}
              blocks={blocks}
              blockNames={blockNames}
              currentBlockName={currentBlockName}
              disciplinesBlockMapper={disciplinesBlockMapper}
              handleDisciplinesCurrentBlockChange={
                handleDisciplinesCurrentBlockChange
              }
            /> */}
            <div className="plan-struct-back-arrow" onClick={goBack}>
              <img
                className="plan-struct-back-arrow-icon"
                src={ArrowTo}
                alt="icon"
              />
            </div>
            <div className="plan-blocks-container">
              <div className="plan-blocks-caption-container">
                <div className="plan-blocks-caption">Учебный план</div>
                <button
                  className="plan-blocks-caption-settings"
                  onClick={handleButtonClick}
                >
                  <img
                    src={Settings}
                    alt="icon"
                    className="plan-blocks-caption-settings-icon"
                  />
                </button>
                <div className="plan-switch-buttons-container">
                  <img
                    src={List}
                    alt="icon"
                    className={
                      viewType === "list"
                        ? "plan-switch-buttons-container-item-active"
                        : "plan-switch-buttons-container-item"
                    }
                    onClick={toggleViewToListType}
                  ></img>
                  <img
                    src={Tabs}
                    alt="icon"
                    className={
                      viewType === "tabs"
                        ? "plan-switch-buttons-container-item-active"
                        : "plan-switch-buttons-container-item"
                    }
                    onClick={toggleViewToTabsType}
                  ></img>
                  <img
                    src={PreviewPlan}
                    alt="icon"
                    className={
                      viewType === "preview"
                        ? "plan-switch-buttons-container-item-active"
                        : "plan-switch-buttons-container-item"
                    }
                    onClick={toggleViewToPreviewType}
                  ></img>
                </div>
                {/* <div className="plan-struct-settings-container"></div> */}
              </div>
              {(viewType === "list" &&
                blocks.map((block: any, index: number) => (
                  <CreateBlockPlace
                    key={index}
                    name={block.blockName}
                    planDisciplines={block.disciplines}
                    onDisciplineDrop={block.onDrop}
                    deleteDiscipline={block.onDelete}
                    onChangeDiscipline={block.onChangeDiscipline}
                    icon={block.icon}
                  />
                ))) ||
                (viewType === "tabs" && (
                  <div className="">
                    <ul
                      className="plan-tabs-container"
                      onWheel={handleMouseWheel}
                      ref={panelRef}
                    >
                      {blocks.map((block: any, index: number) => (
                        <li
                          key={index}
                          className={
                            index === activeTab
                              ? "plan-tabs-container-li-active"
                              : "plan-tabs-container-li"
                          }
                          onClick={() => handleClickTab(index)}
                        >
                          <div>
                            <img
                              src={block.icon}
                              alt="icon"
                              className="plan-tab-icon"
                            />
                          </div>
                          <div
                            className={
                              index === activeTab
                                ? "plan-tabs-tab-active"
                                : "plan-tabs-tab"
                            }
                            title={block.blockName}
                          >
                            {block.blockName}
                          </div>
                          <div
                            className="plan-tabs-tab-count-disciplines"
                            title="Количество дисциплин"
                          >
                            {block.disciplines.length}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {
                      <div
                        key={activeTab}
                        // className={activeTab ? "active" : ""}
                      >
                        <CreateBlockPlace
                          key="tab-table"
                          planDisciplines={blocks[activeTab].disciplines}
                          onDisciplineDrop={blocks[activeTab].onDrop}
                          deleteDiscipline={blocks[activeTab].onDelete}
                          onChangeDiscipline={
                            blocks[activeTab].onChangeDiscipline
                          }
                          tableHeight={"50vh"}
                        />
                      </div>
                    }
                  </div>
                )) ||
                (viewType === "preview" && (
                  <CreatePreviewPlan
                    key="preview-table"
                    data={dataForPreviewTable}
                  />
                ))}
              {renderWarningCredits(blocks)}
            </div>
          </DndProvider>
        </div>
      </div>
      {showDownArrow && <div className="arrow-down"></div>}
    </>
  );
};
export default CreatePlanStructure;
