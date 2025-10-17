export interface ListInfrastructureAssetsResponse {
  paginateData: PaginateData;
  countByCondition: CountByCondition;
}

export interface PaginateData {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  items: ListInfrastructureAssetsPaginateResponse[];
  links: Links;
}

export interface ListInfrastructureAssetsPaginateResponse {
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

export interface InfrastructureAssetsByCategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  total: number;
}
