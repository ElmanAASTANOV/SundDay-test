import { useAppSelector } from "../../hooks/reduxHooks";
import type { Campaign } from "../../types/Campaign";
import type { CampaignsState } from "./campaignsSlice";

export default class CampaignsSelector {
  static getCampaignData = (): CampaignsState =>
    useAppSelector((state) => state.campaigns);

  static getCampaignDataByid = (id: string): Campaign | undefined =>
    useAppSelector((state) =>
      state.campaigns.campaigns.find((campaign) => campaign.id === id),
    );
}
