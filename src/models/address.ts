export default interface AddressDTO {
    id?: number;
    district: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    referencePoint: string | null;
  }