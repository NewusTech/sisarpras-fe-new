// interface InfrastructureResponse {
//   id: number;
//   academicYear: string;
//   createdAt: string;
//   room: Room;
//   priority: Priority;
//   status: string;
// }

// interface Priority {
//   name: string;
// }

// interface Room {
//   name: string;
//   type: string;
// }

export interface InfrastructuresCategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface InfrastructuresRequestResponse {
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
  category: Category;
  academicYear: AcademicYear;
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

export interface DetailInfrastructureResponse {
  id: number;
  date: string;
  schoolId: number;
  categoryId: number;
  name: string;
  quantity: number;
  priority: string;
  academicYearId: number;
  description: string;
  totalArea: string;
  reason: string;
  requestType: string;
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
