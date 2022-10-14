import { useState } from "react";
import styled from "styled-components";

const MainFrame = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  border: solid 1px white;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: hsl(
    212.90322580645162,
    42.85714285714285%,
    42.549019607843135%
  );
  color: white;
`;

function App() {
  const [count, setCount] = useState(0);
  return (
    <MainFrame>
      <h1>hello world {count}</h1>
      <Button onClick={() => setCount((s) => s + 1)}>Increase</Button>
    </MainFrame>
  );
}

export default App;
