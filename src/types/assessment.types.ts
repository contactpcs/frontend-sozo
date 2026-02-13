/**
 * Assessment Status
 */
export type AssessmentStatus = 
  | 'draft' 
  | 'in_progress' 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'rejected';

/**
 * Assessment Type
 */
export type AssessmentType = 'initial' | 'followup' | 'discharge' | 'emergency';

/**
 * Question Type
 */
export type QuestionType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'single_choice' 
  | 'multiple_choice' 
  | 'scale' 
  | 'date';

/**
 * Assessment Question
 */
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  section: string;
}

/**
 * Assessment Answer
 */
export interface AssessmentAnswer {
  questionId: string;
  value: string | number | boolean | string[];
}

/**
 * Assessment Definition
 */
export interface Assessment {
  id: string;
  patientId: string;
  type: AssessmentType;
  status: AssessmentStatus;
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  assignedDoctorId?: string;
  reviewerId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  reviewedAt?: string;
}

/**
 * Assessment Create Payload
 */
export interface AssessmentCreatePayload {
  patientId: string;
  type: AssessmentType;
  assignedDoctorId?: string;
}

/**
 * Assessment Update Payload
 */
export interface AssessmentUpdatePayload {
  answers?: AssessmentAnswer[];
  status?: AssessmentStatus;
}
