import { useEffect, useRef, useState } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import { Competency } from "../../types/competencies.js";
import { DisciplineForPlan } from "./types/plan-discipline";

export const DisciplineTypes = {
  Discipline: "Discipline",
};

function Discipline({ disciplines, handleDisciplineMove }: any) {
  // let scrollTimeout: any;
  // let scrollVelocity = 0;

  // window.addEventListener("dragover", (e) => {
  //   e.preventDefault();
  //   const { clientY } = e;
  //   const { innerHeight } = window;
  //   const scrollThreshold = 100;
  //   if (clientY < scrollThreshold) {
  //     scrollVelocity = -10;
  //   } else if (clientY > innerHeight - scrollThreshold) {
  //     scrollVelocity = 10;
  //   } else {
  //     scrollVelocity = 0;
  //     cancelAnimationFrame(scrollTimeout);
  //     return;
  //   }
  //   if (!scrollTimeout) {
  //     scrollTimeout = requestAnimationFrame(scrollPage);
  //   }
  // });

  // function scrollPage() {
  //   window.scrollBy(0, scrollVelocity);
  //   scrollVelocity *= 0.9;
  //   if (Math.abs(scrollVelocity) < 1) {
  //     scrollVelocity = 0;
  //     cancelAnimationFrame(scrollTimeout);
  //     scrollTimeout = null;
  //     return;
  //   }
  //   scrollTimeout = requestAnimationFrame(scrollPage);
  // }
  // document.body.addEventListener("dragover", function (event) {
  //   event.preventDefault(); // Отменяем действие по умолчанию браузера
  //   var mouseY = event.clientY; // Получаем вертикальную позицию курсора
  //   var offset = 250; // Задаем смещение от края страницы
  //   var threshold = window.innerHeight - offset; // Вычисляем порог для прокрутки

  //   if (mouseY < offset) {
  //     // Если курсор находится в верхней области
  //     window.scrollBy(0, -150); // Прокручиваем страницу вверх
  //   } else if (mouseY > threshold) {
  //     // Если курсор находится в нижней области
  //     window.scrollBy(0, 150); // Прокручиваем страницу вниз
  //   }
  // });

  const tableRef: any = useRef(null);
  const [hiddenDisciplineData, setHiddenDisciplineData]: any = useState(true);
  const [disciplineData, setDisciplineData]: any = useState(false);
  const handleShowDisciplineData = (discipline: DisciplineForPlan) => {
    if (discipline.id === disciplineData.id) {
      setHiddenDisciplineData(!hiddenDisciplineData);
    } else {
      setDisciplineData(discipline);
      setHiddenDisciplineData(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        hiddenDisciplineData(true);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [tableRef]);

  return (
    <div className="plan-structure-disciplines-with-data">
      <div className="table-container">
        <div className="disicplines-table-caption">Дисциплины</div>
        <div className="discipline-table-container">
          <table className="disciplines-table" ref={tableRef}>
            <thead className="disciplines-table-thead">
              <tr className="disciplines-table-header-line">
                <th className="disciplines-table-header-line-th">Название</th>
                <th className="disciplines-table-header-line-th">
                  Код подразделения
                </th>
              </tr>
            </thead>
            <tbody>
              {disciplines.map((discipline: any) => (
                <TableRow
                  key={discipline.id}
                  discipline={discipline}
                  handleDisciplineMove={handleDisciplineMove}
                  handleShowDisciplineData={handleShowDisciplineData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {!hiddenDisciplineData && (
        <div className="plan-structure-discipline-data-container">
          <div className="plan-structure-discipline-data-caption">
            Компетенции
          </div>
          {!hiddenDisciplineData &&
            disciplineData.competencies.map((data: Competency) => (
              <>
                <div className="plan-structure-discipline-data-tr">
                  <b>{data.code}:</b> {data.name}
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
}

export function CustomDragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  const { id } = item;

  return (
    <div
      style={{
        position: "fixed",
        left: currentOffset!.x,
        top: currentOffset!.y,
        opacity: 1,
      }}
    >
      <TableRow key={item.discipline.id} discipline={item.discipline} />
    </div>
  );
}

const TableRow = ({
  discipline,
  handleDisciplineMove,
  handleShowDisciplineData,
}: any) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: DisciplineTypes.Discipline,
    isDragging: (monitor) => !!monitor.isDragging,
    item: { discipline },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      connectDragPreview: monitor.canDrag(),
    }),
  }));

  return (
    <tr
      ref={dragRef}
      style={{ opacity: opacity, cursor: "move" }}
      className="discipline-table-tr"
      key={discipline.id}
      onMouseDown={() => {
        handleDisciplineMove(discipline);
      }}
      onClick={() => handleShowDisciplineData(discipline, discipline.id)}
    >
      <td className="disicpline-table-tbody-td">{discipline.name}</td>
      <td className="disicpline-table-tbody-td">{discipline.codeDepartment}</td>
    </tr>
  );
};

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.gragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default Discipline;
