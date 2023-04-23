import ArrowTo from "../../../common/assets/arrow-to.svg";
import AddCompetence from "../../../common/assets/add-competence.svg";
import { Competency, CompetencyState } from "../../../types/competencies";
import "./PlanCompetencies.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompetency } from "../../../redux/actions/competencies.actions";

const PlanCompetencies = ({
  goBack,
  goNext,
  competencies,
  selectedCompetencies,
  handleICompetenciesClick,
}: any) => {
  const dispatch = useDispatch();
  const { loading, createId } = useSelector(
    (state: CompetencyState) => state.competencies
  );
  console.log("COMP", createId);
  const [showModal, setShowModal] = useState(false);
  const [createCode, setCreateCode] = useState("");
  const [createName, setCreateName] = useState("");
  const [isUsingAfterCreating, setIsUsingAfterCreating] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCreateCompetenceCodeChange = (event: any) => {
    setCreateCode(event.target.value);
  };
  const handleCreateCompetenceNameChange = (event: any) => {
    setCreateName(event.target.value);
  };
  const handleUseAfterCreatingChange = () => {
    setIsUsingAfterCreating(!isUsingAfterCreating);
  };
  const handleCreateCompetence = (event: any) => {
    event.preventDefault();
    if (createCode.trim() && createName.trim()) {
      dispatch(
        createCompetency({ code: createCode.trim(), name: createName.trim() })
      );
      setCreateCode("");
      setCreateName("");
    }
  };
  return (
    <>
      {showModal && (
        <div className="plan-meta-add-competencies-modal">
          <div className="plan-meta-add-competencies-modal-content-container">
            <div className="plan-meta-add-competencies-modal-caption-container">
              <div className="plan-meta-add-competencies-modal-caption">
                Добавление компетенции
              </div>
            </div>
            <span
              className="plan-meta-add-competencies-modal-close"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <div className="plan-meta-add-competencies-modal-content-line-caption">
              <div className="plan-meta-add-competencies-modal-content-line-code-caption">
                Код
              </div>
              <div className="plan-meta-add-competencies-modal-content-line-name-caption">
                Наименование
              </div>
            </div>
            <div className="plan-meta-add-competencies-modal-content-line">
              <input
                type="text"
                className="plan-meta-add-competencies-modal-content-line-code-input"
                value={createCode}
                onChange={handleCreateCompetenceCodeChange}
              />
              <input
                type="text"
                className="plan-meta-add-competencies-modal-content-line-name-input"
                value={createName}
                onChange={handleCreateCompetenceNameChange}
              />
            </div>
            <div className="plan-meta-add-competencies-modal-content-line-use-in-plan-checkbox-line">
              <input
                type="checkbox"
                id="use-for-plan"
                className="plan-meta-add-competencies-modal-content-line-use-in-plan-checkbox"
                checked={isUsingAfterCreating}
                onChange={handleUseAfterCreatingChange}
              />
              <label
                htmlFor="use-for-plan"
                className="plan-meta-add-competencies-modal-content-line-use-in-plan-checkbox-label"
              >
                Использовать для учебного плана
              </label>
            </div>
            <div className="plan-meta-add-competencies-modal-content-line-create-button">
              <button
                className="plan-meta-add-competencies-modal-create-button"
                onClick={handleCreateCompetence}
                disabled={loading}
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
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
          <button
            className="competencies-plan-add-competence"
            title="Добавить компетенцию"
            onClick={handleButtonClick}
          >
            <img
              className="competencies-plan-add-competence-icon"
              src={AddCompetence}
              alt="icon"
            />
          </button>
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
