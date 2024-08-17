import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { useNavigate ,Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
