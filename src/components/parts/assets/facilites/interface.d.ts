export interface ListFacilitiesAssetsResponse {
  paginateData: PaginateData;
  countByCondition: CountByCondition;
}

export interface PaginateData {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  items: ListFacilitiesAssetsPaginateResponse[];
  links: Links;
}

export interface ListFacilitiesAssetsPaginateResponse {
  id: number;
  facilityNameId?: number;
  code: string;
  infrastructureId: any;
  condition: string;
  photo: any;
  categoryId: number;
  schoolId: number;
  periodeId: any;
  academicYearId: any;
  createdAt: string;
  updatedAt: string;
  facilityName: Facility;
  deletedAt: any;
  category: Category;
  academicYear: any;
  periode: any;
  school: School;
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

export interface Facility {
  id: number;
  name: string;
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
