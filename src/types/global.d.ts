interface debounceInterface {
  value: any;
  delay: number;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // Data can be any structure
}

// Format 1: Paginated data
interface DataPaginate<T> {
  total_items: number;
  page: number;
  items: T[];
  total_pages: number;
  current_page: number;
  items_per_page: number;
  links: Links;
}

interface Links {
  prev: string | null;
  next: string | null;
}

interface FormComponent<T> {
  mode: "create" | "update";
  defaultValues?: T;
}

type HTTPMethod = "POST" | "PUT" | "DELETE" | "PATCH" | "GET";

class APIError<D> extends Error {
  status: number;
  data: D;

  constructor(message: string, status: number, data: D) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, APIError.prototype); // penting untuk instanceof
  }
}

type debounceType = {
  value: object | string | number;
  delay: number;
};

type AllowedPrimitive = string | number | boolean | Date | File | Blob | null;
type AllowedValue = AllowedPrimitive | AllowedPrimitive[];

// Format 2: Array data
type DataArray<T> = T[];

// Format 3: Single object data
type DataObject<T> = T;

type decodedProps = {
  id: number;
  email: string;
  name: string;
  role: string;
  user_data: object;
  iat: number;
  exp: number;
};

interface AccessRule {
  roles?: string[];
  permissions?: string[];
}

type SidebarAccessMap = Record<string, AccessRule>;

type AreaProperties = {
  kd_propinsi: number;
  kd_dati2: number;
  kd_kecamatan: number;
  nm_kecamatan: string;
};
