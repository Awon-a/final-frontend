import ArrowTo from "../../../common/assets/arrow-to.svg";
import "./PlanMeta.css";
import {
  PlanBaseEduMapper,
  PlanDegreeMapper,
  PlanStatusMapper,
  PlanTrainingFromMapper,
} from "../../../types/academic-plan";

const PlanMeta = ({
  goNext,
  regNum,
  status,
  planName,
  baseEdu,
  trainingForm,
  degree,
  startYear,
  endYear,
  courses,
  months,
  specialty,
  faculty,
  specialization,
  departnment,
  qualificaion,
  handleRegNumChange,
  handlePlanNameChange,
  handlePlanStatusChange,
  handlePlanBaseEdu,
  handlePlanDirectionNameChange,
  planDirectionName,
  handlePlanSpecializationNameChange,
  handleTrainingFormChange,
  handleDegreeChange,
  handleStartYearChange,
  handleEndYearChange,
  handleCoursesChange,
  handleMonthsChange,
  handleSpecialtyChange,
  handleFacultyChange,
  handleSpecializationChange,
  handleDepartmentChange,
  handleQualificationChange,
}: any) => {
  return (
    <>
      <div className="plan-meta-container">
        <div className="plan-meta-content-container">
          {/* <div className="plan-meta-tr-container">
            <div className="plan-meta-reg-num">
              <div className="plan-meta-reg-num-label">Рег. номер</div>
              <input
                type="text"
                className="plan-meta-reg-num-input"
                value={regNum}
                onChange={handleRegNumChange}
              />
            </div>
            <div className="plan-meta-plan-name">
              <div className="plan-meta-plan-name-label">
                Наименование плана
              </div>
              <input
                type="text"
                value={planName}
                className="plan-meta-plan-name-input"
                onChange={handlePlanNameChange}
              />
            </div>
            <div className="plan-meta-plan-status">
              <div className="plan-meta-plan-status-label">Статус</div>
              <Select
                valueFrom={status}
                mapper={PlanStatusMapper}
                onChange={handlePlanStatusChange}
                className={"plan-meta-plan-status-select"}
              />
            </div>
            <div className="plan-meta-base-education">
              <div className="plan-meta-base-education-label">
                Базовое образование
              </div>
              <Select
                valueFrom={baseEdu}
                mapper={PlanBaseEduMapper}
                onChange={handlePlanBaseEdu}
                className={"plan-meta-base-education-select"}
              />
            </div>
          </div>
          <div className="plan-meta-tr-container">
            <div className="plan-meta-specialty">
              <div className="plan-meta-specialty-label">Специальность</div>
              <input
                type="text"
                className="plan-meta-specialty-input"
                value={specialty}
                onChange={handleSpecialtyChange}
              />
            </div>

            <div className="plan-meta-faculty">
              <div className="plan-meta-faculty-label">Факультет</div>
              <input
                type="text"
                className="plan-meta-faculty-input"
                value={faculty}
                onChange={handleFacultyChange}
              />
            </div>
          </div>
          <div className="plan-meta-tr-container">
            <div className="plan-meta-specialization">
              <div className="plan-meta-specialization-label">
                Специализация
              </div>
              <input
                type="text"
                className="plan-meta-specialization-input"
                value={specialization}
                onChange={handleSpecializationChange}
              />
            </div>
            <div className="plan-meta-department">
              <div className="plan-meta-department-label">Кафедра</div>
              <input
                type="text"
                className="plan-meta-department-input"
                value={departnment}
                onChange={handleDepartmentChange}
              />
            </div>
          </div>
          <div className="plan-meta-tr-container">
            <div className="plan-meta-qualification">
              <div className="plan-meta-qualification-label">Квалификация</div>
              <input
                type="text"
                className="plan-meta-qualification-input"
                value={qualificaion}
                onChange={handleQualificationChange}
              />
            </div>
            <div className="plan-meta-training-form">
              <div className="plan-meta-training-form-label">
                Форма обучения
              </div>
              <Select
                className={"plan-meta-training-form-select"}
                valueFrom={trainingForm}
                mapper={PlanTrainingFromMapper}
                onChange={handleTrainingFormChange}
              />
            </div>
          </div>
          <div className="plan-meta-tr-container">
            <div className="plan-meta-degree">
              <div className="plan-meta-degree-label">Уровень образования</div>
              <Select
                className={"plan-meta-degree-select"}
                valueFrom={degree}
                mapper={PlanDegreeMapper}
                onChange={handleDegreeChange}
              />
            </div>
            <div className="plan-meta-period">
              <div className="plan-meta-period-row">
                <div className="plan-meta-period-label">Период обучения</div>
                <div className="plan-meta-period-start-container">
                  <div className="plan-meta-period-start-label">с</div>
                  <input
                    type="number"
                    className={"plan-meta-period-start-input"}
                    value={startYear}
                    onChange={handleStartYearChange}
                  />
                </div>
                <div className="plan-meta-period-end-container">
                  <div className="plan-meta-period-end-label">по</div>
                  <input
                    type="number"
                    className={"plan-meta-period-end-input"}
                    value={endYear}
                    onChange={handleEndYearChange}
                  />
                </div>
              </div>
              <div className="plan-meta-period-row">
                <div className="plan-meta-period-result-container">
                  <div className="plan-meta-period-years-label">
                    {startYear &&
                    endYear &&
                    Number(endYear) >= Number(startYear)
                      ? Number(endYear) - Number(startYear)
                      : "*"}{" "}
                    лет
                  </div>
                  <div className="plan-meta-period-months-container">
                    <input
                      type="number"
                      value={months}
                      onChange={handleMonthsChange}
                      className="plan-meta-period-months-input"
                    />
                    <div className="plan-meta-period-months-label">мес.</div>
                  </div>
                  <div className="plan-meta-period-courses-container">
                    <input
                      type="number"
                      value={
                        !courses &&
                        startYear &&
                        endYear &&
                        Number(endYear) >= Number(startYear)
                          ? Number(endYear) - Number(startYear)
                          : courses
                      }
                      onChange={handleCoursesChange}
                      className="plan-meta-period-courses-input"
                    />
                    <div className="plan-meta-period-courses-label">курсов</div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="plan-meta-direction-tr">
            <div className="plan-meta-direction-tr-label">
              Направление подготовки (специальность):
            </div>
            <input
              type="text"
              className="plan-meta-direction-tr-input"
              placeholder="Введите направление"
              value={planDirectionName}
              onChange={handlePlanDirectionNameChange}
            />
          </div>
          <div className="plan-meta-specialization-tr">
            <div className="plan-meta-specialization-tr-label">
              Направленность (специализация/профиль):
            </div>
            <input
              type="text"
              className="plan-meta-specialization-tr-input"
              placeholder="Введите направленность"
              value={specialization}
              onChange={handlePlanSpecializationNameChange}
            />
          </div>
          <div className="plan-meta-form-and-level-education-tr">
            <Select
              className={"plan-meta-form-and-level-education-tr-form-select"}
              valueFrom={trainingForm}
              mapper={PlanTrainingFromMapper}
              onChange={handleTrainingFormChange}
            />
            <div className="plan-meta-form-and-level-education-tr-level">
              <div className="plan-meta-form-and-level-education-tr-level-label">
                Уровень образования:
              </div>
              <Select
                className={"plan-meta-form-and-level-education-tr-level-select"}
                valueFrom={degree}
                mapper={PlanDegreeMapper}
                onChange={handleDegreeChange}
              />
            </div>
          </div>
          <div className="plan-meta-period-education-tr">
            <div className="plan-meta-period-education-tr-container">
              <div className="plan-meta-period-education-tr-container-label">
                Срок обучения:
              </div>
              <div className="plan-meta-period-education-tr-container-row">
                <div className="plan-meta-period-education-tr-container-row-start-label">
                  с
                </div>
                <input
                  type="number"
                  className="plan-meta-period-education-tr-container-row-start-input"
                  value={startYear}
                  onChange={handleStartYearChange}
                />
                <div className="plan-meta-period-education-tr-container-row-end-label">
                  по
                </div>
                <input
                  type="number"
                  className="plan-meta-period-education-tr-container-row-end-input"
                  value={endYear}
                  onChange={handleEndYearChange}
                />
                <input
                  type="number"
                  className="plan-meta-period-education-tr-container-row-courses-input"
                  value={
                    !courses &&
                    startYear &&
                    endYear &&
                    Number(endYear) >= Number(startYear)
                      ? Number(endYear) - Number(startYear)
                      : courses
                  }
                  onChange={handleCoursesChange}
                />
                <div className="plan-meta-period-education-tr-container-row-courses-label">
                  курсов
                </div>
              </div>
            </div>
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

function Select({ valueFrom, mapper, onChange, className }: any) {
  const keyFromValue = Object.keys(mapper).find(
    (key) => valueFrom === mapper[key]
  );
  const value = mapper[keyFromValue as any];
  return (
    <select
      className={className}
      value={value}
      onChange={(event) => onChange(event)}
    >
      {Object.keys(mapper).map((key: any) => (
        <option key={key} value={mapper[key]}>
          {mapper[key]}
        </option>
      ))}
    </select>
  );
}
export default PlanMeta;
