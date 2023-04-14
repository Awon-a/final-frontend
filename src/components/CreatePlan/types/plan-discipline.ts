import { Attestations } from "../../../types/academic-plan";
import { Discipline } from "../../../types/discipline";

export interface DisciplineForPlan extends Discipline {
  practiceH: number;
  labH: number;
  iwsH: number;
  lectureH: number;
  examPrep: number;
  sumH: number;
  attestation?: Attestations;
}
