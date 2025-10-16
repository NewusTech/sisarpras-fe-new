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

export interface InfrastructureResponse {
  paginateData: PaginateData;
  countByCondition: CountByCondition;
}

export interface PaginateData {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  items: Item[];
  links: Links;
}

export interface Item {
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
  category: Category;
  school: School;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface School {
  id: number;
  name: string;
  npsn: string;
}

export interface Links {
  prev: any;
  next: any;
}

export interface CountByCondition {
  GOOD: number;
  MINOR_DAMAGE: number;
  MODERATE_DAMAGE: number;
  MAJOR_DAMAGE: number;
}

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
