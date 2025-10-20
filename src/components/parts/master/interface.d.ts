export interface AcademicYearResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  semester: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface GradeResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface GroupResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
