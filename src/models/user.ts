export default interface UserDTO {
  id?: number;
  name: string;
  email: string;
  address: Address | null;
  password: string;
}

export interface UserAuthInfo {
  name: string;
  email: string;
}

export interface SecureUser {
  id: number;
  name: string;
  email: string;
  address: Address | null;
}

export interface Address {
  id: number;
  district: string;
  street: string;
  city: string;
  state: string;
}