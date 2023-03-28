import { Address } from "./Address";

export interface Patient {
  id?: number;
  lastName: string;
  firstName: string;
  dni: string;
  address: Address;
}

