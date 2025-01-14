import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./components/Root";
import Users from "./components/users/Users";
import Game from "./components/game/Game"
import { Container } from "react-bootstrap";
import HeaderNavigation from "./components/HeaderNavigation";
import Solve from "./components/solve/Solve";

export const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <HeaderNavigation />
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/users" element={<Users />} />
            <Route path="/game" element={<Game />} />
            <Route path="/solve" element={<Solve/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

