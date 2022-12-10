import Address from "./address";

export default interface UserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserAuthInfo {
  name: string;
  email: string;
}

export interface SecureUser {
  id?: number;
  name: string;
  email: string;
  address?: Address | null;
}

export interface FirebaseUrl {
  image: string | null;
}
