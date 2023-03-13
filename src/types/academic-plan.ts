export interface Plan {
  id: string;
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
}

export interface CreatePlan {
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
}

export interface UpdatePlan {
  id: string;
  nameDirection?: string;
  year?: number;
  educationLevel?: string;
  semCount?: number;
}

export interface DeletePlan {
  id: string;
}

export interface PlanState {}
