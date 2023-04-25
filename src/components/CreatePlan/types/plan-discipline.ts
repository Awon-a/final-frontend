import { Attestations } from "../../../types/academic-plan";
import { Discipline } from "../../../types/discipline";

export interface DisciplineForPlan extends Discipline {
  semesters: {
    practiceH: number;
    labH: number;
    iwsH: number;
    lectureH: number;
    examH: number;
    creditH: number;
    diffCreditH: number;
    courseWorkH: number;
    courseProjectH: number;
    examPrepSumH: number;
    sumH: number;
    attestation?: Attestations;
  }[];
  examSemestersNums: string;
  creditsSemestersNums: string;
  coursesSemestersNums: string;
  totalCredits: number;
  totalHours: number;
  totalExamH: number;
  totalAudH: number;
  totalLectureH: number;
  totalPracticeH: number;
  totalLabH: number;
  totalIwsH: number;
  totalExamPrepH: number;
  practiceH: number;
  labH: number;
  iwsH: number;
  lectureH: number;
  examPrep: number;
  sumH: number;
  attestation?: Attestations;
}
