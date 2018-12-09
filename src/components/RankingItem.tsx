import * as React from "react";
import styled from "styled-components";
import User1 from "../assets/user1.png";
import User2 from "../assets/user2.png";
import User3 from "../assets/user3.png";
import User4 from "../assets/user4.png";
import color from "../constants/color";

interface Props {
  isMe: boolean;
  score: number;
  name: string;
  rank: number;
}

const Images = [User1, User2, User3, User4];

const RankingItem = (props: Props) => {
  const { isMe, score, name, rank } = props;
  return (
    <Wrapper isMe={isMe}>
      <RankWrapper>
        <Text>{rank}</Text>
      </RankWrapper>
      <IconWrapper>
        <StyledImg src={Images[Math.floor(Math.random() * Images.length)]} />
      </IconWrapper>
      <NameWrapper>
        <Text>{name}</Text>
      </NameWrapper>
      <ScoreWrapper>
        <Text>{score}</Text>
      </ScoreWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.isMe && color.blue};
`;

const RankWrapper = styled.div`
  width: 20%;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 20%;
  text-align: center;
`;

const ScoreWrapper = styled.div`
  width: 30%;
  text-align: center;
`;

const NameWrapper = styled.div`
  width: 30%;
  text-align: center;
`;

const StyledImg = styled.img``;

const Text = styled.p`
  font-size: 32px;
  color: ${color.black};
`;

export default RankingItem;
