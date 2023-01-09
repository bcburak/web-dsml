import React,{ useState, useLayoutEffect } from 'react';

import '../src/components/Designer/style.css';
import Tree from './components/Tree/Tree';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import  Home  from './components/Home/Home';

const structure = [
  {
    type: "folder",
    name: "client",
    files: [
      {
        type: "folder",
        name: "ui",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  {
    type: "folder",
    name: "packages",
    files: [
      {
        type: "file",
        name: "main.js",
      },
    ],
  },
  { type: "file", name: "index.js" },
];


function App() {
  return(

    <div>

</div>
   
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
