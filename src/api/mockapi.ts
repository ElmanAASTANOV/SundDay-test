import axios, { type AxiosResponse } from "axios";
import { type Campaign } from "../types/Campaign";
import { type Overview } from "../types/Overview";

const axiosInstance = axios.create({
  baseURL: "http://5c3db915a9d04f0014a98a79.mockapi.io/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default class MockApi {
  static async getOverview(): Promise<AxiosResponse<Overview>> {
    return await axiosInstance.get("overview");
  }

  static async createCompaign(
    compaign: Pick<Campaign, "name">,
  ): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("campaigns", compaign);
  }

  static async getCompaign(): Promise<AxiosResponse<Campaign[]>> {
    return await axiosInstance.get("campaigns");
  }
}
