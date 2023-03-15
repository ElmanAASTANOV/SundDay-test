import { Alert, Grid } from "@mui/material";
import { useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { fetchMockOverview } from "../../features/overview/overviewSlice";
import OverviewSelector from "../../features/overview/overviewSelector";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  StyledDivider,
  StyledTypography,
} from "../../components/StyledTypeograpy";

function Overview(): JSX.Element {
  const overviewData = OverviewSelector.getOverviewData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMockOverview());
  }, [dispatch]);

  return (
    <Grid container sx={{ paddingTop: 5 }}>
      <Grid item xs={12}>
        {overviewData?.error !== undefined && (
          <Alert severity="error">{overviewData.error}</Alert>
        )}
        {overviewData.loading && (
          <Alert severity="info">Loading data....</Alert>
        )}
      </Grid>
      <Grid item lg={6}>
        <StyledTypography variant="h5">
          Installs
          <StyledDivider />
        </StyledTypography>

        <LineChart
          width={600}
          height={300}
          data={overviewData.installs}
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
      <Grid item lg={6}>
        <StyledTypography variant="h5">
          Revenue
          <StyledDivider />
        </StyledTypography>

        <LineChart
          width={600}
          height={300}
          data={overviewData.revenue}
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

export default Overview;
