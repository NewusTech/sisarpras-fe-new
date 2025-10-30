export {};

declare global {
  interface LoginResponse {
    user: User;
    token_type: string;
    expires_in: number;
    token: string;
  }
}

interface User {
  id: number;
  email: string;
  name: string;
  nip: any;
  nik: any;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  photos: any;
  gender: string;
  religion: string;
  address: any;
  noTelp: any;
  place: any;
  dateBirth: any;
  role: Role;
  schools: Schools;
}

interface Role {
  id: number;
  name: string;
  roleType: string;
}

interface Schools {
  id: number;
  dapoId: string;
  npsn: string;
  name: string;
  email: any;
  phone: any;
  educationLevelId: number;
  principalId: number;
  currentCurriculumId: any;
  academicYearId: number;
  dateOfEstablishmentDecree: string;
  dateOfOperationalLicenseDecree: string;
  ownershipStatus: string;
  schoolStatus: string;
  schoolImage: any[];
  schoolLogo: any;
  province: string;
  city: string;
  district: string;
  village: string;
  hamlet: string;
  rtRw: string;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  vision: any;
  mission: any;
  accreditationStatus: string;
  fileOfAccreditation: any;
  fileOfEstablishmentDecree: string;
  fileOfOperationalLicenseDecree: string;
  landAreaSquareMeters: any;
  buildingAreaSquareMeters: any;
  internetConnectivityType: any;
  internetServiceProvider: any;
  powerSource: any;
  powerCapacity: any;
  waterSource: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
