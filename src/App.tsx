import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Event from "./Routes/Event";
import Room from "./Routes/Room";
// import logo from "./public/image/logo.webp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
       
        </Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/event" element={<Event />}></Route>
        {/* <Route path="/review" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
