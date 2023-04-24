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
    // examPrep: number;
    sumH: number;
    attestation?: Attestations;
  }[];
  practiceH: number;
  labH: number;
  iwsH: number;
  lectureH: number;
  examPrep: number;
  sumH: number;
  attestation?: Attestations;
}
