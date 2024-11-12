import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit";
import { Header } from "./components/Header";
import Title from "antd/es/typography/Title";
import { Flex } from "antd";

function App() {
  return (
    <Router>
      <Header
        logo={
          <Flex justify="center" align="center">
            <img
              style={{ height: "76px", marginRight: "8px" }}
              src="logo.png"
            />
            <Title style={{ margin: "10px" }}>Lui Admin</Title>
          </Flex>
        }
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
