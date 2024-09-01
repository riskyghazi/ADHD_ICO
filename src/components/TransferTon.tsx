import { useState, useEffect } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { TonConnectButton } from "@tonconnect/ui-react";
import React from 'react';
import logoImage from '../assets/logoalphadhad.png'; // Updated filename

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
  width: 150%;
  display: flex;
  justify-content: center;
`;

const StyledCard = styled.div`
  width: 95%;
  max-width: 600px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.1);
  background-color: #222222; // Changed to black
  color: #ffffff; // Set text color to white for better readability on black background

  @media (max-width: 480px) {
    padding: 22px;
    width: 90%;
  }
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
  color: #222222; // Adjust color as needed
  margin-bottom: 20px;
`;

const BulletList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-family: 'Martian Mono', monospace;
  color: #222222; // Adjust color as needed
`;

const BulletPoint = styled.li`
  margin-bottom: 10px;
  &:before {
    content: "• ";
    color: #FFC500; // Bullet point color
    margin-left: 5px; // Add some space between bullet and text
    float: right; // Float the bullet to the right
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const DisclaimerLink = styled.a`
  margin-top: 20px;
  color: #222222;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
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
    } catch (err) {
      setError(`Transfer failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LogoContainer>
        <Logo src={logoImage} alt="Alphadhad Logo" />
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
      <DisclaimerLink href="https://www.alphadhad.com/disclaimer" target="_blank" rel="noopener noreferrer">
        Disclaimer
      </DisclaimerLink>
    </PageContainer>
  );
}
