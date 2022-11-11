export default interface UserDTO {
  id?: number;
  name: string;
  email: string;
  address: string | null;
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
  address: string | null;
}