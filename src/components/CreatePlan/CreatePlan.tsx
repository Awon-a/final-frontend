import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import { Discipline, DisciplineState } from "../../types/discipline";
import Header from "../Header/Header";
import CreateBlockPlace from "./DnDBlockPlan";
import DisciplineItem from "./DnDDisciplines";
import "./DisciplinesTable.css";
import "./CreatePlan.css";
import Tabs from "../../common/assets/tabs.svg";
import List from "../../common/assets/list.svg";
import Elective from "../../common/assets/elective.svg";
import Base from "../../common/assets/base.svg";
import SFE from "../../common/assets/sfe.svg";
import ScrollUp from "../../common/assets/arrow-up-scroll.svg";
import Practice from "../../common/assets/practice.svg";
import PreviewPlan from "../../common/assets/eye-for-create-plan.svg";
import * as Scroller from "react-scroll";

const CreatePlan = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let { disciplines: disciplinesState } = useSelector(
    (state: DisciplineState) => state.disciplines
  );
  const [disciplines, setDisciplines]: [Discipline[], any] = useState([]);
  const handleDragStart = (event: any, id: string) => {
    event.dataTransfer.setData("id", id);
  };
  console.log("SCROLL");
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
  const [activeTab, setActiveTab] = useState(0);
  const [baseDisciplines, setBaseDisciplines]: any = useState([]);
  const [electiveDisciplines, setElectiveDisciplines]: any = useState([]);
  const [sfeDisciplines, setSfeDisciplines]: any = useState([]);
  const [practiceDisciplines, setPracticeDisciplines]: any = useState([]);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const handleBaseDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setBaseDisciplines((prevPlanDisciplines: any) => [
        ...prevPlanDisciplines,
        discipline,
      ]);
    },
    [setDisciplines, setBaseDisciplines]
  );
  const handleElectiveDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setElectiveDisciplines((prevPlanDisciplines: any) => [
        ...prevPlanDisciplines,
        discipline,
      ]);
    },
    [setDisciplines, setElectiveDisciplines]
  );
  const handleSfeDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setSfeDisciplines((prevPlanDisciplines: any) => [
        ...prevPlanDisciplines,
        discipline,
      ]);
    },
    [setDisciplines, setSfeDisciplines]
  );
  const handlePracticeDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setPracticeDisciplines((prevPlanDisciplines: any) => [
        ...prevPlanDisciplines,
        discipline,
      ]);
    },
    [setDisciplines, setPracticeDisciplines]
  );
  const handleDeleteBaseDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setBaseDisciplines((prevPlanDisciplines: any) =>
        prevPlanDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
    },
    [setDisciplines, setBaseDisciplines]
  );
  const handleDeleteElectiveDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setElectiveDisciplines((prevPlanDisciplines: any) =>
        prevPlanDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
    },
    [setDisciplines, setElectiveDisciplines]
  );
  const handleDeleteSfeDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setSfeDisciplines((prevPlanDisciplines: any) =>
        prevPlanDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
    },
    [setDisciplines, setSfeDisciplines]
  );
  const handleDeletePracticeDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setPracticeDisciplines((prevPlanDisciplines: any) =>
        prevPlanDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
    },
    [setDisciplines, setPracticeDisciplines]
  );
  const blocks: {
    blockName: string;
    icon: any;
    disciplines: any[];
    onDrop: any;
    onDelete: any;
  }[] = [
    {
      blockName: "Базовая часть",
      disciplines: baseDisciplines,
      onDrop: handleBaseDisciplineDrop,
      icon: Base,
      onDelete: handleDeleteBaseDisciplines,
    },
    {
      blockName: "Вариативная часть",
      disciplines: electiveDisciplines,
      onDrop: handleElectiveDisciplineDrop,
      icon: Elective,
      onDelete: handleDeleteElectiveDisciplines,
    },
    {
      blockName: "ГИА",
      disciplines: sfeDisciplines,
      onDrop: handleSfeDisciplineDrop,
      icon: SFE,
      onDelete: handleDeleteSfeDisciplines,
    },
    {
      blockName: "Практика",
      disciplines: practiceDisciplines,
      onDrop: handlePracticeDisciplineDrop,
      icon: Practice,
      onDelete: handleDeletePracticeDisciplines,
    },
  ];
  const [viewType, setViewType] = useState("list"); // начальное значение - список

  const toggleViewToListType = () => {
    setViewType("list");
  };
  const toggleViewToTabsType = () => {
    setViewType("tabs");
  };
  const toggleViewToPreviewType = () => {
    setViewType("preview");
  };
  const handleClickTab = (index: number) => {
    setActiveTab(index);
  };
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
  const ref = useRef(null);
  let scroll = Scroller.animateScroll;
  const handleScroll = (direction: any) => {
    console.log("HANDLE ");
    Scroller.scroller.scrollTo(direction, {
      duration: 1500,
      delay: 100,
      smooth: "easeInOutQuint",
      offset: 10, // Scrolls to element + 50 pixels down the page
      horizontal: false,
      to: direction,
    });
  };

  let scrollSpeed = 10;
  const maxScrollSpeed = 100;
  const vhScrollPLace = 20;
  const scrollZoneWidth = (vhScrollPLace / 100) * window.innerHeight;
  let scrollInterval: any = null;

  function handleDrag(event: any) {
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
  return (
    <>
      <div>
        <DndProvider backend={HTML5Backend}>
          <Header currentPath={pathname} />
          <DisciplineItem
            disciplines={disciplines}
            handleDisciplineMove={handleDisciplineMove}
          />
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
              blocks.map((block) => (
                <CreateBlockPlace
                  name={block.blockName}
                  planDisciplines={block.disciplines}
                  onDisciplineDrop={block.onDrop}
                  deleteDiscipline={block.onDelete}
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
                        <div className="plan-tabs-tab" title={block.blockName}>
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
                    <div key={activeTab} className={activeTab ? "active" : ""}>
                      <CreateBlockPlace
                        planDisciplines={blocks[activeTab].disciplines}
                        onDisciplineDrop={blocks[activeTab].onDrop}
                        deleteDiscipline={blocks[activeTab].onDelete}
                      />
                    </div>
                  }
                </div>
              ))}
          </div>
          {showDownArrow && <div className="arrow-down"></div>}
        </DndProvider>
      </div>
    </>
  );
};
export default CreatePlan;
