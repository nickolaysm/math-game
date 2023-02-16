import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./components/Root";
import Users from "./components/users/Users";
import { Container } from "react-bootstrap";
import HeaderNavigation from "./components/HeaderNavigation";

export const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <HeaderNavigation />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
