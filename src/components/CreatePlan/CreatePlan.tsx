import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import {
  Attestations,
  Discipline,
  PlanBaseEduMapper,
  PlanDegreeMapper,
  PlanStatusMapper,
  PlanTrainingFromMapper,
} from "../../types/academic-plan";
import { DisciplineState } from "../../types/discipline";
import Header from "../Header/Header";
import CreatePlanStructure from "./CreatePlanStructure";
import PlanCompetencies from "./PlanCompetencies/PlanCompetencies";
import PlanMeta from "./PlanMeta/PlanMeta";
import { PlacesTypes } from "./types/places-types";
import { DisciplineForPlan } from "./types/plan-discipline";

const CreatePlan = () => {
  const [current, setCurrent] = useState(PlacesTypes.chooseCompetencies);
  const { pathname } = useLocation();

  const goToMetaPlan = useCallback(() => {
    setCurrent(() => PlacesTypes.planMeta);
  }, [setCurrent]);
  const goToPlanCompetencies = useCallback(() => {
    setCurrent(() => PlacesTypes.chooseCompetencies);
  }, [setCurrent]);
  const goToPlanStruct = useCallback(() => {
    setCurrent(() => PlacesTypes.structPlan);
  }, [setCurrent]);

  const [regNum, setRegNum] = useState("");
  const [planName, setPlanName] = useState("");
  const [status, setStatus] = useState(PlanStatusMapper[0]);
  const [baseEdu, setBaseEdu] = useState(PlanBaseEduMapper[0]);
  const [specialty, setSpecialty] = useState("");
  const [faculty, setFaculty] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [departnment, setDepartnment] = useState("");
  const [qualificaion, setQualificaion] = useState("");
  const [trainingForm, setTrainingForm] = useState(PlanTrainingFromMapper[0]);
  const [degree, setDegree] = useState(PlanDegreeMapper[0]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [months, setMonthsYear] = useState("");
  const [courses, setCoursesYear] = useState("");
  const handlePlanStatusChange = useCallback(
    (event: any) => {
      const statusValue = event.target.value;
      setStatus(statusValue);
    },
    [setStatus]
  );
  const handleRegNumChange = useCallback(
    (event: any) => {
      const regNumValue = event.target.value;
      setRegNum(regNumValue);
    },
    [setRegNum]
  );
  const handlePlanNameChange = useCallback(
    (event: any) => {
      const planNameValue = event.target.value;
      setPlanName(planNameValue);
    },
    [setPlanName]
  );
  const handleTrainingFormChange = useCallback(
    (event: any) => {
      const trainingFormValue = event.target.value;
      setTrainingForm(trainingFormValue);
    },
    [setTrainingForm]
  );
  const handleDegreeChange = useCallback(
    (event: any) => {
      const degreeValue = event.target.value;
      setDegree(degreeValue);
    },
    [setDegree]
  );
  const handlePlanBaseEdu = useCallback(
    (event: any) => {
      const baseEduValue = event.target.value;
      setBaseEdu(baseEduValue);
    },
    [setBaseEdu]
  );
  const handleSpecialtyChange = useCallback(
    (event: any) => {
      const specialtyValue = event.target.value;
      setSpecialty(specialtyValue);
    },
    [setSpecialty]
  );
  const handleFacultyChange = useCallback(
    (event: any) => {
      const facultyValue = event.target.value;
      setFaculty(facultyValue);
    },
    [setFaculty]
  );
  const handleSpecializationChange = useCallback(
    (event: any) => {
      const specializationValue = event.target.value;
      setSpecialization(specializationValue);
    },
    [setSpecialization]
  );
  const handleDepartmentChange = useCallback(
    (event: any) => {
      const departmentValue = event.target.value;
      setDepartnment(departmentValue);
    },
    [setDepartnment]
  );
  const handleQualificationChange = useCallback(
    (event: any) => {
      const qualificationValue = event.target.value;
      setQualificaion(qualificationValue);
    },
    [setQualificaion]
  );
  const handleStartYearChange = useCallback(
    (event: any) => {
      const startYearValue = event.target.value;
      setStartYear(startYearValue);
    },
    [setStartYear]
  );
  const handleEndYearChange = useCallback(
    (event: any) => {
      const endYearValue = event.target.value;
      setEndYear(endYearValue);
    },
    [setEndYear]
  );
  const handleCoursesChange = useCallback(
    (event: any) => {
      const coursesValue = event.target.value;
      setCoursesYear(coursesValue);
    },
    [setCoursesYear]
  );
  const handleMonthsChange = useCallback(
    (event: any) => {
      const monthsValue = event.target.value;
      setMonthsYear(monthsValue);
    },
    [setMonthsYear]
  );
  ////////////////////

  const dispatch = useDispatch();
  let { disciplines: disciplinesState } = useSelector(
    (state: DisciplineState) => state.disciplines
  );

  const [disciplines, setDisciplines]: [DisciplineForPlan[], any] = useState(
    []
  );
  const [activeTab, setActiveTab] = useState(0);
  const [baseDisciplines, setBaseDisciplines]: any = useState([]);
  const [electiveDisciplines, setElectiveDisciplines]: any = useState([]);
  const [sfeDisciplines, setSfeDisciplines]: any = useState([]);
  const [practiceDisciplines, setPracticeDisciplines]: any = useState([]);
  const [showDownArrow, setShowDownArrow] = useState(false);

  useEffect(() => {
    dispatch(getDisciplines({ limit: 100 }));
  }, [dispatch]);
  useEffect(() => {
    const disciplines = disciplinesState.map(
      (discipline: any) =>
        ({
          ...discipline,
          examPrep: 0,
          iwsH: 0,
          labH: 0,
          lectureH: 0,
          practiceH: 0,
          sumH: 0,
          attestation: Attestations.Exam,
        } as DisciplineForPlan)
    );
    setDisciplines(disciplines as any);
  }, [disciplinesState]);

  const handleChangeBaseDisciplines = useCallback(
    (discipline: DisciplineForPlan) => {
      setBaseDisciplines((prevPlanDisciplines: DisciplineForPlan[]) =>
        prevPlanDisciplines.map((disc: DisciplineForPlan) => {
          if (disc.id === discipline.id) {
            return discipline;
          }
          return disc;
        })
      );
    },
    [setBaseDisciplines]
  );
  const handleChangeElectiveDisciplines = useCallback(
    (discipline: DisciplineForPlan) => {
      setElectiveDisciplines((prevPlanDisciplines: DisciplineForPlan[]) =>
        prevPlanDisciplines.map((disc: DisciplineForPlan) => {
          if (disc.id === discipline.id) {
            return discipline;
          }
          return disc;
        })
      );
    },
    [setElectiveDisciplines]
  );
  const handleChangeSfeDisciplines = useCallback(
    (discipline: DisciplineForPlan) => {
      setSfeDisciplines((prevPlanDisciplines: DisciplineForPlan[]) =>
        prevPlanDisciplines.map((disc: DisciplineForPlan) => {
          if (disc.id === discipline.id) {
            return discipline;
          }
          return disc;
        })
      );
    },
    [setSfeDisciplines]
  );
  const handleChangePracticeDisciplines = useCallback(
    (discipline: DisciplineForPlan) => {
      setPracticeDisciplines((prevPlanDisciplines: DisciplineForPlan[]) =>
        prevPlanDisciplines.map((disc: DisciplineForPlan) => {
          if (disc.id === discipline.id) {
            return discipline;
          }
          return disc;
        })
      );
    },
    [setPracticeDisciplines]
  );

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
  const [viewType, setViewType] = useState("list");

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
  return (
    <>
      <Header currentPath={pathname} />
      {current === PlacesTypes.planMeta && (
        <PlanMeta
          goNext={goToPlanCompetencies}
          regNum={regNum}
          planName={planName}
          status={status}
          baseEdu={baseEdu}
          trainingForm={trainingForm}
          degree={degree}
          startYear={startYear}
          endYear={endYear}
          courses={courses}
          months={months}
          specialty={specialty}
          faculty={faculty}
          specialization={specialization}
          departnment={departnment}
          qualificaion={qualificaion}
          handleRegNumChange={handleRegNumChange}
          handlePlanStatusChange={handlePlanStatusChange}
          handlePlanNameChange={handlePlanNameChange}
          handlePlanBaseEdu={handlePlanBaseEdu}
          handleTrainingFormChange={handleTrainingFormChange}
          handleDegreeChange={handleDegreeChange}
          handleStartYearChange={handleStartYearChange}
          handleEndYearChange={handleEndYearChange}
          handleCoursesChange={handleCoursesChange}
          handleMonthsChange={handleMonthsChange}
          handleSpecialtyChange={handleSpecialtyChange}
          handleFacultyChange={handleFacultyChange}
          handleSpecializationChange={handleSpecializationChange}
          handleDepartmentChange={handleDepartmentChange}
          handleQualificationChange={handleQualificationChange}
        />
      )}
      {current === PlacesTypes.chooseCompetencies && (
        <PlanCompetencies goBack={goToMetaPlan} goNext={goToPlanStruct} />
      )}
      {current === PlacesTypes.structPlan && (
        <CreatePlanStructure
          goBack={goToPlanCompetencies}
          handleChangeBaseDisciplines={handleChangeBaseDisciplines}
          handleChangeElectiveDisciplines={handleChangeElectiveDisciplines}
          handleChangeSfeDisciplines={handleChangeSfeDisciplines}
          handleChangePracticeDisciplines={handleChangePracticeDisciplines}
          handleBaseDisciplineDrop={handleBaseDisciplineDrop}
          handleElectiveDisciplineDrop={handleElectiveDisciplineDrop}
          handleSfeDisciplineDrop={handleSfeDisciplineDrop}
          handlePracticeDisciplineDrop={handlePracticeDisciplineDrop}
          handleDeleteBaseDisciplines={handleDeleteBaseDisciplines}
          handleDeleteElectiveDisciplines={handleDeleteElectiveDisciplines}
          handleDeleteSfeDisciplines={handleDeleteSfeDisciplines}
          handleDeletePracticeDisciplines={handleDeletePracticeDisciplines}
          toggleViewToListType={toggleViewToListType}
          toggleViewToTabsType={toggleViewToTabsType}
          toggleViewToPreviewType={toggleViewToPreviewType}
          handleClickTab={handleClickTab}
          disciplines={disciplines}
          activeTab={activeTab}
          viewType={viewType}
          baseDisciplines={baseDisciplines}
          electiveDisciplines={electiveDisciplines}
          sfeDisciplines={sfeDisciplines}
          practiceDisciplines={practiceDisciplines}
          showDownArrow={showDownArrow}
        />
      )}
    </>
  );
};
export default CreatePlan;
