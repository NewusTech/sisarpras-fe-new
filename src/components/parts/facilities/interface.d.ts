export interface FacilitiesResponse {
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
  approvedBy: any;
  approvedAt: any;
  notes: any;
  createdAt: string;
  updatedAt: string;
  category: Category;
  infrastructure: Infrastructure;
  school: School;
  creator: Creator;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Infrastructure {
  id: number;
  name: string;
  code: string;
  area: any;
  condition: string;
  categoryId: number;
  schoolId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface School {
  id: number;
  name: string;
  npsn: string;
  academicYear: AcademicYear;
  address: string;
  isActive: boolean;
}

export interface AcademicYear {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Creator {
  id: number;
  name: string;
  email: string;
}

export interface FacilitiesCategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface DetailFacilityResponse {
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
  approvedBy: any;
  approvedAt: any;
  notes: any;
  createdAt: string;
  updatedAt: string;
  category: Category;
  infrastructure: Infrastructure;
  academicYear: AcademicYear;
  school: School;
  creator: Creator;
  approvedByUser: any;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Infrastructure {
  id: number;
  name: string;
  code: string;
  area: any;
  condition: string;
  categoryId: number;
  schoolId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
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

export interface School {
  id: number;
  name: string;
  npsn: string;
  address: string;
  isActive: boolean;
}

export interface Creator {
  id: number;
  name: string;
  email: string;
}
