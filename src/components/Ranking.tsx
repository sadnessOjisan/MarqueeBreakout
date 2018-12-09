import * as React from "react";
import styled from "styled-components";
import zIndex from "../constants/zIndex";
import { Score } from "../typedef/Score";
import ScoreAPI from "../services/ScoreAPI";
import Item from "./RankingItem";
import color from "../constants/color";

interface Props {
  onClose(): void;
  user: any;
}

interface State {
  scores: Score[];
  isLoading: boolean;
}

class Ranking extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    ScoreAPI.getScores().then(res => {
      console.log(res);
      const { data } = res;
      const { scores } = data;
      this.setState({
        scores: scores
      });
    });
  }

  render() {
    const { onClose, user } = this.props;
    const { scores } = this.state;
    const uid = user && user.sub;
    return (
      <ModalWrapper>
        <InnterContainer>
          <ModalHeader>
            <ModalTitle>ランキング</ModalTitle>
            <CloseLink onClick={onClose}>閉じる</CloseLink>
          </ModalHeader>
          <ContentsWrapper>
            {scores.map((item, idx) => (
              <Item
                score={item.score}
                isMe={item.uid === uid}
                name={item.name}
                rank={idx + 1}
              />
            ))}
          </ContentsWrapper>
          >
        </InnterContainer>
      </ModalWrapper>
    );
  }
}
const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  color: ${color.black};
`;

const InnterContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
`;

const ModalTitle = styled.h3`
  text-align: center;
  font-size: 20px;
`;

const CloseLink = styled.span`
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: ${color.blue};
`;

const ContentsWrapper = styled.div`
  overflow-y: scroll;
  height: calc(100% - 56px);
  overflow-y: scroll;
`;

export default Ranking;
