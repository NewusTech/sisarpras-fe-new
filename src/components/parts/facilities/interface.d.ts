interface FacilitiesResponse {
  id: number;
  academicYear: string;
  createdAt: string;
  facility: Facility;
  priority: Priority;
  status: string;
}

interface Priority {
  name: string;
}

interface Facility {
  name: string;
  type: string;
}
