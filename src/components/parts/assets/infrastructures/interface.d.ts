export interface ListInfrastructureAssetsResponse {
  id: number;
  name: string;
  code: string;
  area: string;
  condition: string;
  photo: any;
  categoryId: number;
  schoolId: number;
  periodeId: number;
  academicYearId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  category: Category;
  academicYear: AcademicYear;
  periode: Periode;
  school: School;
}

export interface Category {
  id: number;
  name: string;
  prefixCode: string;
  isClassRoom: boolean;
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

export interface Periode {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface School {
  id: number;
  name: string;
  npsn: string;
}

export interface CountByCondition {
  GOOD: number;
  MINOR_DAMAGE: number;
  MODERATE_DAMAGE: number;
  MAJOR_DAMAGE: number;
}

export interface InfrastructureAssetsByCategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  total: number;
}
