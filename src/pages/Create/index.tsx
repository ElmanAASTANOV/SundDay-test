import { Alert, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

import CampaignsSelector from "../../features/campaigns/campaignsSelector";
import { createMockCampaign } from "../../features/campaigns/campaignsSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

function Create(): JSX.Element {
  const [campaignName, setCampaignName] = useState("");
  const campaignsData = CampaignsSelector.getCampaignData();
  const dispatch = useAppDispatch();

  return (
    <Grid
      sx={{
        padding: 2,
      }}
    >
      <Grid item xs={12}>
        {campaignsData?.error !== undefined && (
          <Alert severity="error">{campaignsData.error}</Alert>
        )}
        {campaignsData.loading && (
          <Alert severity="info">Creating entity....</Alert>
        )}
        {campaignsData?.creatingResult !== undefined && (
          <Alert severity="success">{campaignsData.creatingResult}</Alert>
        )}
      </Grid>
      <TextField
        label="name"
        value={campaignName}
        variant="outlined"
        onChange={(e) => {
          setCampaignName(e.target.value);
        }}
      />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(createMockCampaign(campaignName));
        }}
      >
        Save
      </Button>
    </Grid>
  );
}

export default Create;
