import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 600px;
  margin-top: 32px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 36px;
  margin-bottom: 60px;
`
const DateText = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 8px;
`
const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin-bottom: 8px;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MainText = styled.div`
  font-size: 24px;
`

const SignContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > * {
    margin-right: 120px;
  }
`

const Sign = styled.div`
  font-size: 20px;
`

const FooterTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`
const Footer = styled.div`
  width: 100%;
  font-size: 14px;
`

let today = new Date()


const ContractForm = () => {

  return (
    <Container>
      <Title>
        Data Backup 확인서
      </Title>
      <DateText>
        DATE : {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
      </DateText>
      <MainContainer>
        <MainText>
          본 장비에 대한 Data는 안전하게 Backup이 되어 있음을 확인합니다.
        </MainText>
        <SignContainer>
          <Sign>고객명:</Sign>
          <Sign>서명</Sign>
        </SignContainer>
      </MainContainer>
      <FooterTitle>[DATA BACKUP에 대한 안내]</FooterTitle>
      <Footer>
        Data Backup은 고객의 책임이므로 반드시 Backup을 받아 놓으시기 바랍니다. 고객님의 별도 Backup이 이루어지지 않은 상태에서 교체수리에 발생되는 데이터 손실에 대해서는 보증하지 않습니다
      </Footer>
    </Container>
  )
}

export default ContractForm