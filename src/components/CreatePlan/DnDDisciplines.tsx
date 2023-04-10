import { useDrag } from "react-dnd";

export const DisciplineTypes = {
  Discipline: "Discipline",
};

function Discipline({ disciplines, handleDisciplineMove }: any) {
  return (
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
            {disciplines.map((discipline: any) => (
              <TableRow
                key={discipline.id}
                discipline={discipline}
                handleDisciplineMove={handleDisciplineMove}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableRow = ({ discipline, handleDisciplineMove }: any) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: DisciplineTypes.Discipline,
    isDragging: (monitor) => !!monitor.isDragging,
    item: { discipline },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <tr
      ref={dragRef}
      style={{ opacity: opacity }}
      className="discipline-table-tr"
      key={discipline.id}
      onMouseDown={() => {
        handleDisciplineMove(discipline);
      }}
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
