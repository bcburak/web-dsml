import React, { useState, useLayoutEffect, useEffect } from "react";
import { useCookies } from "react-cookie";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";

function App() {
  // const [cookies] = useCookies(["logged_in"]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   cookies.logged_in && navigate("/home");
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />  */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );

  //   let [data, setData] = useState(structure);

  //   const handleClick = (node: any) => {
  //     console.log(node);
  //   };
  //   const handleUpdate = (state: any) => {
  //     console.log(state);
  //     localStorage.setItem(
  //       "tree",
  //       JSON.stringify(state, function (key, value) {
  //         if (key === "parentNode" || key === "id") {
  //           return null;
  //         }
  //         return value;
  //       })
  //     );
  //   };

  //   useLayoutEffect(() => {
  //     try {
  //       let savedStructure = JSON.parse(localStorage.getItem("tree") as any);
  //       if (savedStructure) {
  //         setData(savedStructure);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, []);
  //   return (
  //     <div style={{width:250}}>

  // <Tree children={[]} data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />

  //     </div>

  // );
}

export default App;
