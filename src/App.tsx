import MainLayout from "./layouts/MainLayout";
import { BrowserRouter } from "react-router";
import { Route } from "react-router";
import { Routes } from "react-router";
import SoccerList from "./pages/SoccserList";
import Procedure from "./pages/Procedure";
import Batch from "./pages/Batch";
import Register from "./pages/Register";
import Code from "./pages/Code";
import TeamTree from "./pages/TeamTree";
import ManageMap from "./pages/ManageMap";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/list' element={<SoccerList />} />
          <Route path='/procedure' element={<Procedure />} />
          <Route path='/batch' element={<Batch />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register/:id' element={<Register />} />
          <Route path='/code' element={<Code />} />
          <Route path='/teamTree' element={<TeamTree />} />
          <Route path='/manageMap' element={<ManageMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
