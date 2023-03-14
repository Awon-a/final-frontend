import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./AppRoutes";
import { getPlans } from "./redux/actions/academic-plan.actions";

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;
