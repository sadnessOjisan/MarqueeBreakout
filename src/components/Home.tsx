import * as React from "react";
import styled from "styled-components";
import color from "../constants/color";

interface Props {
  handleLogin: () => void;
  handleLogout: () => void;
  handleOpenRanking: () => void;
  handleOpenHow2Use: () => void;
  isLogin: boolean;
}

const Home = (props: Props) => {
  const {
    handleLogin,
    handleLogout,
    handleOpenRanking,
    handleOpenHow2Use,
    isLogin
  } = props;
  return (
    <Wrapper>
      <Container>
        <Title>
          <marquee width="100%" scrollamount={30} behavior="alternate">
            marqueeタグでブロック崩し
          </marquee>
        </Title>
        <Description>
          こちらはクソアプリアドベンドカレンダー13日目の成果物です。サインアップしなくても最下部のコンソールからゲームを始められますが、サインアップすると全国のライバルと競えます。
        </Description>
      </Container>
      <StyledButton onClick={handleOpenHow2Use}>遊び方をみる</StyledButton>
      {!isLogin && (
        <StyledButton onClick={handleLogin}>ログインする</StyledButton>
      )}
      {isLogin && (
        <StyledButton onClick={handleLogout}>ログアウトする</StyledButton>
      )}
      <StyledButton onClick={() => handleOpenRanking()}>
        ランキングを確認する
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  text-align: center;
  font-size: 48px;
  padding-top: 24px;
  color: ${color.black};
  width: 100%;
  padding: 0px 24px;
`;

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  color: ${color.black};
  width: 100%;
  margin-bottom: 24px;
`;

const Container = styled.div`
  　position: absolute;
  top: 0;
`;

const StyledButton = styled.div`
  height: 36px;
  cursor: pointer;
  font-size: 28px;
  color: ${color.black};
  margin-bottom: 24px;
  border: solid 1px ${color.black};
  background-color: ${color.black};
  padding: 12px;
  border-radius: 36px;
  color: white;
  :hover {
    border: solid 1px ${color.gray};
    background-color: ${color.gray};
    color: ${color.black};
  }
`;

export default Home;
