import { Stack } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import TabsRouter from "./components/navbar";
import Campaigns from "./pages/Campaigns";
import Create from "./pages/Create";
import Overview from "./pages/Overview";

function App(): JSX.Element {
  return (
    <div className="App">
      <Stack>
        <TabsRouter />
        <Routes>
          <Route path="/Overview" element={<Overview />} />
          <Route path="/Campaigns" element={<Campaigns />} />
          <Route path="/Create" element={<Create />} />
          <Route path="*" element={<Navigate to="/Overview" replace />} />
        </Routes>
      </Stack>
    </div>
  );
}

export default App;
