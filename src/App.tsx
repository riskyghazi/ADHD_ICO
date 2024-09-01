import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px; /* Adjust based on your needs */
  margin: 0 auto;
  padding: 0 15px;
`;

function App() {
  useTonConnect();

  return (
    <Container>
      <AppContainer>
        <TransferTon />
      </AppContainer>
    </Container>
  );
}

export default App;
