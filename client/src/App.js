import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menubar from "./components/Menu";
import { AuthContext, AuthProvider } from "./context/contextAuth";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Container>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
