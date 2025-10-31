interface UserDetailResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  nik: string;
  position: string;
  workUnit: string;
  profilePicture: any;
  role: Role;
  gender: string;
}

interface Role {
  name: string;
  roleType: string;
  rolePermissions: string[];
}

interface UsersResponse {
  id: number;
  name: string;
  email: string;
  gender: string;
  role: RolePub;
}

interface RolePub {
  name: string;
}

interface UsersDetailResponse {
  id: number;
  email: string;
  name: string;
  gender: string;
  password: string;
  roleId: number;
  profilePicture: any;
  nik: string;
  position: string;
  workUnit: string;
  phone: string;
  address: string;
  pin: string;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  name: string;
  nip: string;
  nik: any;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  photos: string;
  gender: string;
  religion: string;
  address: string;
  noTelp: string;
  place: string;
  dateBirth: string;
  role: Role;
  teacher: any;
  employee: Employee;
  educationalBackground: any[];
  certificationProfile: any[];
  positionProfile: any[];
}

export interface Role {
  id: number;
  name: string;
  roleType: string;
}

export interface Employee {
  id: number;
  userId: number;
  schoolId: number;
  employeeType: string;
  employmentStatus: string;
  position: string;
  startDate: string;
  endDate: any;
  description: any;
  retirement: boolean;
  category: any;
  rank: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
