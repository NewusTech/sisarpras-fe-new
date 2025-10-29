export interface ListFacilitiesAssetsResponse {
  id: number;
  facilityNameId: number;
  code: string;
  infrastructureId: number;
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
  facilityName: FacilityName;
  academicYear: AcademicYear;
  periode: Periode;
  infrastructure: Infrastructure;
  school: School;
}

export interface Category {
  id: number;
  name: string;
  prefixCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface FacilityName {
  id: number;
  name: string;
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

export interface Infrastructure {
  name: string;
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

export interface FacilitiesAssetsByCategoryResponse {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
  total: number;
}

export interface Category {
  id: number;
  name: string;
}
