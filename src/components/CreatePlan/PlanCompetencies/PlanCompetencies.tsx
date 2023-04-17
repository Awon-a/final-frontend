import ArrowTo from "../../../common/assets/arrow-to.svg";
import AddCompetence from "../../../common/assets/add-competence.svg";
import { Competency } from "../../../types/competencies";
import "./PlanCompetencies.css";

const PlanCompetencies = ({
  goBack,
  goNext,
  competencies,
  selectedCompetencies,
  handleICompetenciesClick,
}: any) => {
  return (
    <>
      <div className="container-competencies-plan">
        <div className="plan-competencies-back-arrow" onClick={goBack}>
          <img
            className="plan-competencies-back-arrow-icon"
            src={ArrowTo}
            alt="icon"
          />
        </div>
        <div className="plan-competencies-container">
          <div className="competencies-plan-table-caption">Компетенции</div>
          <div className="competencies-plan-table-container">
            <table className="competencies-plan-table">
              <thead className="competencies-plan-table-thead">
                <tr className="competencies-plan-table-header-line">
                  <th className="competencies-plan-table-header-line-td">
                    Код
                  </th>
                  <th className="competencies-plan-table-header-line-td">
                    Название
                  </th>
                </tr>
              </thead>
              <tbody>
                {competencies.map((competence: Competency) => (
                  <tr
                    className={
                      selectedCompetencies.includes(competence)
                        ? "competencies-plan-table-tr-active"
                        : "competencies-plan-table-tr"
                    }
                    key={competence.id}
                    onClick={() => handleICompetenciesClick(competence)}
                  >
                    <td className="competencies-plan-table-tbody-td">
                      {competence.code}
                    </td>
                    <td className="competencies-plan-table-tbody-td">
                      {competence.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="competencies-plan-add-competence">
            <img
              className="competencies-plan-add-competence-icon"
              src={AddCompetence}
              alt="icon"
            />
          </div>
        </div>
        <div className="plan-competencies-next-arrow" onClick={goNext}>
          <img
            className="plan-competencies-next-arrow-icon"
            src={ArrowTo}
            alt="icon"
          />
        </div>
      </div>
    </>
  );
};
export default PlanCompetencies;
