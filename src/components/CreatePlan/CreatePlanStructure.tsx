import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import { Discipline, DisciplineState } from "../../types/discipline";
import CreateBlockPlace from "./DnDBlockPlan";
import DisciplineItem from "./DnDDisciplines";
import "./DisciplinesTable.css";
import "./CreatePlanStructure.css";
import Tabs from "../../common/assets/tabs.svg";
import List from "../../common/assets/list.svg";
import ArrowTo from "../../common/assets/arrow-to.svg";
import Elective from "../../common/assets/elective.svg";
import Base from "../../common/assets/base.svg";
import SFE from "../../common/assets/sfe.svg";
import WarningCredits from "../../common/assets/warning-credits.svg";
import Practice from "../../common/assets/practice.svg";
import PreviewPlan from "../../common/assets/eye-for-create-plan.svg";
import * as Scroller from "react-scroll";
import CreatePreviewPlan from "./PreviewCreatePlan/CreatePreviewPlan";
import { map, mapKeys } from "lodash";
import { DisciplineForPlan } from "./types/plan-discipline";
import { Attestations } from "../../types/academic-plan";

const LOW_BOUND = 240;
const HIGH_BOUND = 300;

const CreatePlanStructure = ({
  goBack,
  disciplines,
  activeTab,
  viewType,
  baseDisciplines,
  electiveDisciplines,
  sfeDisciplines,
  practiceDisciplines,
  showDownArrow,
  handleChangeBaseDisciplines,
  handleChangeElectiveDisciplines,
  handleChangeSfeDisciplines,
  handleChangePracticeDisciplines,
  handleBaseDisciplineDrop,
  handleElectiveDisciplineDrop,
  handleSfeDisciplineDrop,
  handlePracticeDisciplineDrop,
  handleDeleteBaseDisciplines,
  handleDeleteElectiveDisciplines,
  handleDeleteSfeDisciplines,
  handleDeletePracticeDisciplines,
  toggleViewToListType,
  toggleViewToTabsType,
  toggleViewToPreviewType,
  handleClickTab,
}: any) => {
  const handleDisciplineMove = (discipline: any) => {
    // setDisciplines(
    //   disciplines.filter((d: Discipline) => d.id !== discipline.id)
    // );
  };

  const blocks: {
    blockName: string;
    icon: any;
    disciplines: any[];
    onDrop: any;
    onDelete: any;
    onChangeDiscipline: any;
  }[] = [
    {
      blockName: "Базовая часть",
      disciplines: baseDisciplines,
      onDrop: handleBaseDisciplineDrop,
      icon: Base,
      onDelete: handleDeleteBaseDisciplines,
      onChangeDiscipline: handleChangeBaseDisciplines,
    },
    {
      blockName: "Вариативная часть",
      disciplines: electiveDisciplines,
      onDrop: handleElectiveDisciplineDrop,
      icon: Elective,
      onDelete: handleDeleteElectiveDisciplines,
      onChangeDiscipline: handleChangeElectiveDisciplines,
    },
    {
      blockName: "ГИА",
      disciplines: sfeDisciplines,
      onDrop: handleSfeDisciplineDrop,
      icon: SFE,
      onDelete: handleDeleteSfeDisciplines,
      onChangeDiscipline: handleChangeSfeDisciplines,
    },
    {
      blockName: "Практика",
      disciplines: practiceDisciplines,
      onDrop: handlePracticeDisciplineDrop,
      icon: Practice,
      onDelete: handleDeletePracticeDisciplines,
      onChangeDiscipline: handleChangePracticeDisciplines,
    },
  ];

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
  let dataForPreviewTable = blocks.map((block) =>
    mapKeys(block, (value, key: string) => {
      if (key === "blockName") return "titleRow";
      return key;
    })
  );
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
            образовательной программы (текущая: {creditsSum} <u>&lt;</u> ФГОС:
            240-300).
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
            образовательной программы (текущая: {creditsSum} <u>&gt;</u> ФГОС:
            240-300).
          </div>
        </div>
      );
  };
  return (
    <>
      <div>
        <div className="rigth-tables-container">
          <DndProvider backend={HTML5Backend}>
            <DisciplineItem
              disciplines={disciplines}
              handleDisciplineMove={handleDisciplineMove}
            />
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
              </div>
              {(viewType === "list" &&
                blocks.map((block: any, index) => (
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
                      {blocks.map((block, index) => (
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
                            className="plan-tabs-tab"
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
                        className={activeTab ? "active" : ""}
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
