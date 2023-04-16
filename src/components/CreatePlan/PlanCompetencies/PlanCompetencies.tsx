import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowTo from "../../../common/assets/arrow-to.svg";
import { getCompetencies } from "../../../redux/actions/competencies.actions";
import { Competency, CompetencyState } from "../../../types/competencies";
import "./PlanCompetencies.css";

const PlanCompetencies = ({ goBack, goNext }: any) => {
  const dispatch = useDispatch();
  const { competencies } = useSelector(
    (state: CompetencyState) => state.competencies
  );
  const [selectedCompetencies, setSelectedCompetencies]: [Competency[], any] =
    useState([]);
  useEffect(() => {
    dispatch(getCompetencies({ limit: 100 }));
  }, [dispatch]);
  console.log({ competencies });
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
                  <th>Название</th>
                  <th>Код подразделения</th>
                </tr>
              </thead>
              <tbody>
                {competencies.map((competencie: Competency) => (
                  <tr
                    className="competencies-plan-table-tr"
                    key={competencie.id}
                  >
                    <td className="competencies-plan-table-tbody-td">
                      {competencie.code}
                    </td>
                    <td className="competencies-plan-table-tbody-td">
                      {competencie.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
