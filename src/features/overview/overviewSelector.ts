import { useAppSelector } from "../../hooks/reduxHooks";
import type { OverviewState } from "./overviewSlice";

export default class OverviewSelector {
  static getOverviewData = (): OverviewState =>
    useAppSelector((state) => state.overview);
}
