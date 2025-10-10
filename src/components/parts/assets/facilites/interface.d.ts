export interface FacilityAssetsResponse {
  id: string;
  roomName: string;
  category: {
    id: number;
    name: string;
  };
}

export interface FacilitiesByRoomResponse {
  id: string;
  roomId: string;
  facilityName: string;
  category: {
    id: number;
    name: string;
  };
  quantity: number;
}

export interface ListItemByFacilitiesResponse {
  id: string;
  acceptedDate: string;
  itemCode: string;
  facilityName: string;
  category: {
    id: number;
    name: string;
  };
  condition: {
    id: number;
    name: string;
  };
  imageUrl: string;
  status: {
    good: number;
    good: number;
    lightDamage: number;
    moderateDamage: number;
    heavyDamage: number;
  };
}
