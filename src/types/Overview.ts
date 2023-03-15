import { type Install } from "./Install";
import { type Revenue } from "./Revenue";

export interface Overview {
  installs: Install[];
  revenue: Revenue[];
}
