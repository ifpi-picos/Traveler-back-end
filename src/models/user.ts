import Address from "./address";

export default interface UserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

export interface UserUpdate {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  addressId?: number;
  active?: boolean;
}

export interface UserAuthInfo {
  name: string;
  email: string;
  id: number;
}

export interface SecureUser {
  id?: number;
  name: string;
  email: string;
  image?: string;
  address?: Address | null;
}

export interface FirebaseUrl {
  image: string | null;
}
