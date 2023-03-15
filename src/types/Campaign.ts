import { type Install } from "./Install";

export interface Campaign {
  id: string;
  name: string;
  installs: Install[];
}
