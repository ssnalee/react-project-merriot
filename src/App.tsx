import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Gallery from "./Routes/Gallery";
import Event from "./Routes/Event";
import Room from "./Routes/Room";
// import logo from "./public/image/logo.webp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/review" element={<Home />} />
        </Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/event" element={<Event />}></Route>
      </Routes>
    </>
  );
}

export default App;
