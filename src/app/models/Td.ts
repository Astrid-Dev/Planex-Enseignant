import {Ue} from "./Ue";

export interface Td {
  id?: number,
  code: string,
  est_divise: boolean,
  ueId?: number,
  ue?: Ue | string,
  createdAt?: string,
  updatedAt?: string
}
