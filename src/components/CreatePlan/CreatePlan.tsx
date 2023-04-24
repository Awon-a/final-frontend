import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getCompetencies,
  getOneCompetency,
} from "../../redux/actions/competencies.actions";
import { getDisciplines } from "../../redux/actions/disicplines.actions";
import {
  Attestations,
  Discipline,
  PlanBaseEduMapper,
  PlanDegreeMapper,
  PlanStatusMapper,
  PlanTrainingFromMapper,
} from "../../types/academic-plan";
import { Competency, CompetencyState } from "../../types/competencies";
import { DisciplineState } from "../../types/discipline";
import Competencies from "../Competencies/Competencies.js";
import Header from "../Header/Header";
import CreatePlanStructure from "./CreatePlanStructure";
import PlanCompetencies from "./PlanCompetencies/PlanCompetencies";
import PlanMeta from "./PlanMeta/PlanMeta";
import { PlacesTypes } from "./types/places-types";
import { DisciplineForPlan } from "./types/plan-discipline";
import Practice from "../../common/assets/practice.svg";
import Elective from "../../common/assets/elective.svg";
import Base from "../../common/assets/base.svg";
import SFE from "../../common/assets/sfe.svg";
import { convertToObject } from "typescript";

const CreatePlan = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(PlacesTypes.planMeta);
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
  useEffect(() => {
    if (startYear && endYear && endYear > startYear)
      setCoursesYear(Number(endYear) - Number(startYear) + "");
  }, [startYear, endYear]);
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

  const {
    competencies: competenciesState,
    createId,
    competency,
  }: any = useSelector((state: CompetencyState) => state.competencies);
  const [competencies, setCompetencies]: any = useState([]);
  const [createdCompetence, setCreatedCompetence]: any = useState({});
  const [selectedCompetencies, setSelectedCompetencies]: [Competency[], any] =
    useState([]);
  useEffect(() => {
    dispatch(getCompetencies({ limit: 100 }));
  }, [dispatch]);
  useEffect(() => {
    const newCompetencies = competenciesState?.map((competence: any) => ({
      ...competence,
      rateSum: 0,
    }));
    setCompetencies((newCompetencies as any) ?? []);
  }, [competenciesState]);
  // useEffect(() => {
  //   console.log({ createId });
  //   dispatch(getOneCompetency(createId));
  // }, [createId]);
  // useEffect(() => {
  //   console.log("compe: ", { competency });
  //   setCreatedCompetence(competency);
  // }, [competency]);
  // useEffect(() => {
  //   console.log("created: ", createdCompetence);
  //   setCompetencies([...competencies, createdCompetence]);
  //   setSelectedCompetencies([...selectedCompetencies, createdCompetence]);
  // }, [createdCompetence]);
  console.log({ competencies });
  const handleICompetenciesClick = useCallback(
    (item: any) => {
      // Проверяем, есть ли элемент в массиве выбранных элементов
      const index = selectedCompetencies.findIndex(
        (selectedItem) => selectedItem.id === item.id
      );

      if (index === -1) {
        // Если элемента нет в массиве выбранных элементов, добавляем его туда
        setSelectedCompetencies(() => [...selectedCompetencies, item]);
      } else {
        // Если элемент уже есть в массиве выбранных элементов, удаляем его
        setSelectedCompetencies(() => [
          ...selectedCompetencies.slice(0, index),
          ...selectedCompetencies.slice(index + 1),
        ]);
      }
    },
    [setSelectedCompetencies, selectedCompetencies]
  );

  ////////////////////

  let { disciplines: disciplinesState } = useSelector(
    (state: DisciplineState) => state.disciplines
  );

  const [disciplines, setDisciplines]: [DisciplineForPlan[], any] = useState(
    []
  );
  const [activeTab, setActiveTab] = useState(0);
  const [planStructurePartsTab, setPlanStructurePartsTab] = useState(0);
  const [baseDisciplines, setBaseDisciplines]: any = useState([]);
  const [electiveDisciplines, setElectiveDisciplines]: any = useState([]);
  const [sfeDisciplines, setSfeDisciplines]: any = useState([]);
  const [practiceDisciplines, setPracticeDisciplines]: any = useState([]);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [
    isPlanStructureCompetenciesCollapsed,
    setSsPlanStructureCompetenciesCollapsed,
  ] = useState(false);

  const toggleIsPlanStructureCompetenciesCollapsedCollapse = () => {
    setSsPlanStructureCompetenciesCollapsed(
      !isPlanStructureCompetenciesCollapsed
    );
  };
  const decreaseCompPercent = (competence: any, discipline: any) => {
    competence.rateSum -= discipline.competencies.reduce(
      (sum: number, c: any) =>
        c.id === competence.id ? Number(sum) + Number(c.rate) : Number(sum),
      0
    );
    if (competence.rateSum < 0) competence.rateSum = 0;
    return competence;
  };
  const increaseCompPercent = (competence: any, discipline: any) => {
    competence.rateSum += discipline.competencies.reduce(
      (sum: number, c: any) =>
        c.id === competence.id ? Number(sum) + Number(c.rate) : Number(sum),
      0
    );
    return competence;
  };
  const calcCompetenciesRate = useCallback(
    (comps: any[], discipline: any, callback = increaseCompPercent) => {
      const newCompetencies = comps.map((competence: any) =>
        callback(competence, discipline)
      );
      return newCompetencies;
    },
    []
  );
  const disciplineLoads = [
    {
      name: "Лекции (Лк)",
      disciplineKey: "lectureH",
    },
    {
      name: "Практики (Пр)",
      disciplineKey: "practiceH",
    },
    {
      name: "Лабораторные работы (Лр)",
      disciplineKey: "labH",
    },
    {
      name: "СРС",
      disciplineKey: "iwsH",
    },
    {
      name: "Зачет",
      disciplineKey: "examH",
    },
    {
      name: "Дифф. зачет",
      disciplineKey: "creditH",
    },
    {
      name: "Экзамен",
      disciplineKey: "diffCreditH",
    },
    {
      name: "Курсовая работа",
      disciplineKey: "courseWorkH",
    },
    {
      name: "Курсовой проект",
      disciplineKey: "courseProjectH",
    },
  ];
  useEffect(() => {
    dispatch(getDisciplines({ limit: 100 }));
  }, [dispatch]);
  useEffect(() => {
    const newDisciplines = disciplinesState.map(
      (discipline: any) =>
        ({
          ...discipline,
          examPrep: 0,
          iwsH: 0,
          labH: 0,
          lectureH: 0,
          practiceH: 0,
          sumH: 0,
          semesters: [...new Array(+courses * 2 || 0)].map((el: any) => ({
            // examPrep: 0,
            iwsH: 0,
            labH: 0,
            lectureH: 0,
            practiceH: 0,
            sumH: 0,
            examH: 0,
            creditH: 0,
            diffCreditH: 0,
            courseWorkH: 0,
            courseProjectH: 0,
            attestation: Attestations.Exam,
          })),
          credits: disciplineLoads.slice(0, 3),
          competencies:
            discipline.competencies?.map((competence: Competency) => ({
              ...competence,
              rate: Math.random().toFixed(2),
            })) ?? [],
          attestation: Attestations.Exam,
        } as DisciplineForPlan)
    );
    newDisciplines.length &&
      (() =>
        (newDisciplines[1].competencies = newDisciplines?.[0]?.competencies))();
    setDisciplines(newDisciplines as any);
  }, [disciplinesState, courses]);

  const handleCalcComptenciesPercent = useCallback(
    (disc: any, callback = increaseCompPercent) => {
      setSelectedCompetencies((prevSelectedCompetencies: any[]) => {
        const newSelectedCompetencies = calcCompetenciesRate(
          prevSelectedCompetencies,
          disc,
          callback
        );
        return newSelectedCompetencies;
      });
    },
    [setSelectedCompetencies, calcCompetenciesRate]
  );
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
      setBaseDisciplines((prevPlanDisciplines: any) => {
        const newBaseDisciplines = [...prevPlanDisciplines, discipline];
        handleCalcComptenciesPercent(discipline);
        return newBaseDisciplines;
      });
    },
    [setDisciplines, setBaseDisciplines, handleCalcComptenciesPercent]
  );
  const handleElectiveDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setElectiveDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = [...prevPlanDisciplines, discipline];
        handleCalcComptenciesPercent(discipline);

        return newDisciplines;
      });
    },
    [setDisciplines, setElectiveDisciplines, handleCalcComptenciesPercent]
  );
  const handleSfeDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setSfeDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = [...prevPlanDisciplines, discipline];
        handleCalcComptenciesPercent(discipline);

        return newDisciplines;
      });
    },
    [setDisciplines, setSfeDisciplines, handleCalcComptenciesPercent]
  );
  const handlePracticeDisciplineDrop = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) =>
        prevDisciplines.filter((d: Discipline) => d.id !== discipline.id)
      );
      setPracticeDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = [...prevPlanDisciplines, discipline];
        handleCalcComptenciesPercent(discipline);

        return newDisciplines;
      });
    },
    [setDisciplines, setPracticeDisciplines, handleCalcComptenciesPercent]
  );
  const handleDeleteBaseDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setBaseDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = prevPlanDisciplines.filter(
          (d: Discipline) => d.id !== discipline.id
        );
        // console.log("delete: ", { newDisciplines });
        handleCalcComptenciesPercent(discipline, decreaseCompPercent);
        return newDisciplines;
      });
    },
    [setDisciplines, setBaseDisciplines, handleCalcComptenciesPercent]
  );
  const handleDeleteElectiveDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setElectiveDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = prevPlanDisciplines.filter(
          (d: Discipline) => d.id !== discipline.id
        );
        handleCalcComptenciesPercent(discipline, decreaseCompPercent);

        return newDisciplines;
      });
    },
    [setDisciplines, setElectiveDisciplines, handleCalcComptenciesPercent]
  );
  const handleDeleteSfeDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setSfeDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = prevPlanDisciplines.filter(
          (d: Discipline) => d.id !== discipline.id
        );
        handleCalcComptenciesPercent(discipline, decreaseCompPercent);

        return newDisciplines;
      });
    },
    [setDisciplines, setSfeDisciplines, handleCalcComptenciesPercent]
  );
  const handleDeletePracticeDisciplines = useCallback(
    (discipline: Discipline) => {
      setDisciplines((prevDisciplines: Discipline[]) => [
        ...prevDisciplines,
        discipline,
      ]);
      setPracticeDisciplines((prevPlanDisciplines: any) => {
        const newDisciplines = prevPlanDisciplines.filter(
          (d: Discipline) => d.id !== discipline.id
        );
        handleCalcComptenciesPercent(discipline, decreaseCompPercent);

        return newDisciplines;
      });
    },
    [setDisciplines, setPracticeDisciplines, handleCalcComptenciesPercent]
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
  const handleClickPlanStructurePartsTab = (index: number) => {
    setPlanStructurePartsTab(index);
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

  const blockNames: string[] = blocks.map((block: any) => block.blockName);
  const blockMapper = Object.fromEntries(
    blockNames.map((name: any, index: number) => [index, name])
  );
  const [blockName, setBlockName] = useState(blockNames[0]);
  const handleDisciplinesCurrentBlockChange = (event: any) => {
    setBlockName(event.target.value);
  };
  console.log({ courses });

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
        <PlanCompetencies
          goBack={goToMetaPlan}
          goNext={goToPlanStruct}
          competencies={competencies}
          handleICompetenciesClick={handleICompetenciesClick}
          selectedCompetencies={selectedCompetencies}
        />
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
          handleDisciplinesCurrentBlockChange={
            handleDisciplinesCurrentBlockChange
          }
          handleClickPlanStructurePartsTab={handleClickPlanStructurePartsTab}
          disciplines={disciplines}
          activeTab={activeTab}
          viewType={viewType}
          baseDisciplines={baseDisciplines}
          electiveDisciplines={electiveDisciplines}
          sfeDisciplines={sfeDisciplines}
          practiceDisciplines={practiceDisciplines}
          showDownArrow={showDownArrow}
          blocks={blocks}
          blockNames={blockNames}
          courses={courses}
          currentBlockName={blockName}
          disciplinesBlockMapper={blockMapper}
          selectedCompetencies={selectedCompetencies}
          toggleIsPlanStructureCompetenciesCollapsedCollapse={
            toggleIsPlanStructureCompetenciesCollapsedCollapse
          }
          isPlanStructureCompetenciesCollapsed={
            isPlanStructureCompetenciesCollapsed
          }
          activePlanStructurePartsTab={planStructurePartsTab}
          disciplineLoads={disciplineLoads}
        />
      )}
    </>
  );
};
export default CreatePlan;
