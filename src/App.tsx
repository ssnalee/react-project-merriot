import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Event from "./Routes/Event";
import Room from "./Routes/Room";
import Login from "./Routes/Login"
// import logo from "./public/image/logo.webp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/room`} element={<Room />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/event`} element={<Event />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
