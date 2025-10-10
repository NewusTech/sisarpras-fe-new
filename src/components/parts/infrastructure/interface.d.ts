interface InfrastructureResponse {
  id: number;
  academicYear: string;
  createdAt: string;
  room: Room;
  priority: Priority;
  status: string;
}

interface Priority {
  name: string;
}

interface Room {
  name: string;
  type: string;
}
