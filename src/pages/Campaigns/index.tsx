import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  StyledDivider,
  StyledTypography,
} from "../../components/StyledTypeograpy";

import CampaignsSelector from "../../features/campaigns/campaignsSelector";
import { fetchMockCampaign } from "../../features/campaigns/campaignsSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import type { Campaign } from "../../types/Campaign";

function Campaigns(): JSX.Element {
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const campaignData = CampaignsSelector.getCampaignData();

  const selectedCampaignData =
    CampaignsSelector.getCampaignDataByid(selectedCampaignId);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSelectedCampaignId(event.target.value);
  }, []);

  useEffect(() => {
    setSelectedCampaignId(campaignData.campaigns[0]?.id ?? "");
  }, [campaignData.campaigns]);

  useEffect(() => {
    dispatch(fetchMockCampaign());
  }, [dispatch]);

  return (
    <Grid container sx={{ padding: 5 }}>
      <Grid item xs={12}>
        {campaignData?.error !== undefined && (
          <Alert severity="error">{campaignData.error}</Alert>
        )}
        {campaignData.loading && (
          <Alert severity="info">Loading data....</Alert>
        )}
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ minWidth: 120, margin: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Campaign</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedCampaignId}
              label="Campaign"
              onChange={handleChange}
            >
              {campaignData.campaigns.map((campaig: Campaign) => {
                return (
                  <MenuItem key={campaig.id} value={campaig.id}>
                    {campaig.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={6}>
        <StyledTypography variant="h5">
          Installs
          <StyledDivider />
        </StyledTypography>

        <LineChart
          width={600}
          height={300}
          data={selectedCampaignData?.installs ?? []}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Grid>
    </Grid>
  );
}

export default Campaigns;
