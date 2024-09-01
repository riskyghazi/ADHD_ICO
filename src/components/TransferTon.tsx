import { useState, useEffect } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { TonConnectButton } from "@tonconnect/ui-react";
import React from 'react';
import logo from "../assets/logoalphadhad.png"; // Updated filename

// Modify the imported Card component
const CenteredContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConnectButtonContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 20px auto;
`;

const StyledCard = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const FIXED_RECIPIENT = "UQCW--Dtb8jK3ikAWtl_7Jo5Je7cic1B0euWI8bxYSyEc6HY";
const MIN_AMOUNT = 5;

const ErrorText = styled.p`
  color: red;
  font-size: 16px; // Increased from 14px
  margin-top: 8px; // Increased from 5px
`;

const Headline = styled.h2`
  text-align: center;
  color: #FFC500;
  margin-bottom: 15px; // Increased from 10px
  font-size: 28px; // Increased from default
`;

const FlexContainer = styled(FlexBoxRow)`
  margin-bottom: 15px; // Added for spacing

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledInput = styled(Input)`
  font-size: 18px; // Increased font size
  padding: 10px; // Added padding

  @media (max-width: 480px) {
    margin-right: 0;
    margin-top: 12px; // Increased from 8px
  }
`;

const StyledButton = styled(Button)`
  min-height: 54px; // Increased from 44px
  padding: 12px 20px; // Increased from 10px 15px
  font-size: 18px; // Increased font size
  margin-top: 20px; // Added for spacing
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -30px;
`;

const Logo = styled.img`
  max-width: 150px; // Adjust size as needed
  height: auto;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
  direction: rtl; // Added RTL direction
`;

const SubHeadline = styled.h2`
  font-family: 'Martian Mono', monospace;
  font-size: 24px;
  color: white;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const BulletList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-family: 'Martian Mono', monospace;
  color: white;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BulletPoint = styled.li`
  margin-bottom: 10px;
  &:before {
    content: "• ";
    color: #FFC500;
    margin-left: 5px;
    float: right;
  }

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000; // Solid black background
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
  width: 100%; // Ensure PageContainer takes full width
  box-sizing: border-box; // This ensures padding doesn't add to the width
`;

const DisclaimerLink = styled.a`
  margin-top: 20px;
  color: #222222;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
`;

const TextContainer = styled.div`
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#000000'};
  background-color: ${props => props.theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export function TransferTon() {
  const { sender, connected } = useTonConnect();
  const [tonAmount, setTonAmount] = useState(MIN_AMOUNT.toString());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validateAmount(tonAmount);
  }, [tonAmount]);

  const validateAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT) {
      setError(`The minimum approved value is ${MIN_AMOUNT} TON`);
    } else {
      setError("");
    }
  };

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      await sender.send({
        to: Address.parse(FIXED_RECIPIENT),
        value: toNano(tonAmount),
      });
      // Handle successful transfer
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Transfer failed: ${err.message}`);
      } else {
        setError('An unknown error occurred during transfer');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LogoContainer>
        <Logo src={logo} alt="Alphadhad Logo" />
      </LogoContainer>
      <ContentContainer>
        <SubHeadline>طريقة المشاركة في الاكتتاب</SubHeadline>
        <BulletList>
          <BulletPoint>اضغط Connect Wallet في الاسفل وقم بربط محفظتك</BulletPoint>
          <BulletPoint>ادخل الكمية التي تريد المشاركة بها من عملة TON علما ان الحد الادنى هو 20 TON</BulletPoint>
          <BulletPoint>اضغط على Transfer وقم بتأكيد المعاملة من محفظتك</BulletPoint>
        </BulletList>
      </ContentContainer>
      <CenteredContainer>
        <ConnectButtonContainer>
          <TonConnectButton />
        </ConnectButtonContainer>
        <CardContainer>
          <StyledCard>
            <FlexBoxCol>
              <Headline>Alphadhad $ADHD Pre-sale</Headline>
              <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Transfer TON</h3>
              <FlexContainer>
                <label style={{ fontSize: '18px' }}>Amount </label>
                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <Input
                    type="number"
                    value={tonAmount}
                    onChange={(e) => setTonAmount(e.target.value)}
                    min={MIN_AMOUNT}
                    style={{ width: '50%', fontSize: '18px', padding: '10px' }}
                  />
                  <span style={{ marginLeft: '10px', fontSize: '18px', whiteSpace: 'nowrap' }}>$TON</span>
                </div>
              </FlexContainer>
              {error && <ErrorText>{error}</ErrorText>}
              <FlexBoxRow style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '18px' }}>
                  To: <span style={{ fontSize: '80%' }}>{FIXED_RECIPIENT}</span>
                </label>
              </FlexBoxRow>
              <StyledButton
                disabled={!connected || !!error || isLoading}
                onClick={handleTransfer}
              >
                {isLoading ? "Processing..." : "Transfer"}
              </StyledButton>
            </FlexBoxCol>
          </StyledCard>
        </CardContainer>
      </CenteredContainer>
      <TextContainer>
        {/* Your Arabic text here */}
      </TextContainer>
      <DisclaimerLink href="https://www.alphadhad.com/disclaimer" target="_blank" rel="noopener noreferrer">
        Disclaimer
      </DisclaimerLink>
    </PageContainer>
  );
}
