import { DisciplineForPlan } from "../types/plan-discipline";
import "./CreatePreviewPlan.css";

interface CreatePreviewPlanProps {
  data: {
    disciplines: DisciplineForPlan[];
    titleRow: string;
  }[];
}

const CreatePreviewPlan = ({ data }: any) => {
  console.log({ data });
  return (
    <div className="preview-container">
      <div className="preview-table-container">
        <table className="preview-table">
          <thead className="preview-table-thead">
            <tr className="preview-table-thead-line">
              <th title="Дисциплина">Дисциплина</th>
              <th title="Код подразделения">Код подразделения</th>
              <th title="Зачетные единицы">З.Е.</th>
              <th title="Лекции">Л</th>
              <th title="Лабораторные работы">Лаб</th>
              <th title="Практики">П</th>
              <th title="Самостоятельная работа">С</th>
              <th title="Форма аттестации">Атт</th>
            </tr>
          </thead>
          <tbody className="preview-table-tbody">
            {data.map(({ titleRow, disciplines }: any) => (
              <>
                <tr>
                  <td className="preview-table-tr-title" colSpan={8}>
                    {titleRow}
                  </td>
                </tr>
                {disciplines.map((discipline: DisciplineForPlan) => (
                  <tr
                    className="preview-table-tr"
                    style={{ backgroundColor: "rgba(28,175,87,0.2)" }}
                  >
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
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CreatePreviewPlan;
