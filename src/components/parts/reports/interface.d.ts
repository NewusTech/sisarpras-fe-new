export interface FacilitiesReportResponse {
  id: number;
  date: string;
  schoolId: number;
  categoryId: number;
  name: string;
  quantity: number;
  priority: string;
  academicYearId: number;
  reason: string;
  estimateBudget: number;
  supportingDocument: string[];
  documentation: string[];
  infrastructureId: number;
  status: string;
  creatorId: number;
  approvedBy: number;
  approvedAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  academicYear: AcademicYear;
  category: Category;
}

export interface AcademicYear {
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

export interface Category {
  id: number;
  name: string;
  prefixCode: any;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface InfrastructureReportResponse {
  id: number;
  date: string;
  schoolId: number;
  categoryId: number;
  name: string;
  quantity: number;
  totalArea: string;
  priority: string;
  description: string;
  reason: string;
  estimateBudget: number;
  requestType: string;
  supportingDocument: string[];
  documentation: string[];
  academicYearId: number;
  status: string;
  creatorId: number;
  approvedBy: any;
  approvedAt: any;
  notes: any;
  createdAt: string;
  updatedAt: string;
  academicYear: AcademicYear;
  category: Category;
}

export interface AcademicYear {
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

export interface Category {
  id: number;
  name: string;
  prefixCode: any;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
