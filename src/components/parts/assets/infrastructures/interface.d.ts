export interface InfrastructureAssetsResponse {
  id: string;
  category: {
    id: number;
    name: string;
  };
  quantity: number;
}

export interface ListItemByInfrastructureResponse {
  id: string;
  itemCode: string;
  roomName: string;
  volume: number;
  condition: {
    id: number;
    name: string;
  };
  labelUrl: string;
}
