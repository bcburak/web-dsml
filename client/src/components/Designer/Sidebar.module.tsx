
import styled from "styled-components"

export const ContainerTest = styled.div`
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    color: white;
    background-color: #131A22;
`

export const DndFlow = styled.div`
flex-direction: column;
    display: flex;
    height: 200px;
    font-weight: bold;
    .aside {
      border-right: 1px solid #eee;
      padding: 15px 10px;
      font-size: 12px;
      background: #fcfcfc;
    }
  }
`;

export const SideBarContainer = styled.div`

.dndflow {
  flex-direction: column;
  display: flex;
  height: auto;
}

body > #root > div {
  height: 100vh;
}
.dndflow aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.dndflow aside .description {
  margin-bottom: 10px;
}

.dndflow .dndnode {
  height: 20px;
  padding: 4px;
  border: 1px solid #1a192b;
  border-radius: 2px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.dndflow .dndnode.input {
  border-color: #0041d0;
}

.dndflow .dndnode.output {
  border-color: #ff0072;
}

.dndflow .reactflow-wrapper {
  flex-grow: 1;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .dndflow {
    flex-direction: row;
  }

  .dndflow aside {
    width: 20%;
    max-width: 250px;
  }
}
`;
  