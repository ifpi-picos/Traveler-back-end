export default interface UserDTO {
  id?: number;
  name: string;
  email: string;
  address: string | null;
  password: string;
};
