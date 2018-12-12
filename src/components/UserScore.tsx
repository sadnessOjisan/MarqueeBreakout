import * as React from "react";
import styled from "styled-components";
import zIndex from "../constants/zIndex";
import ScoreAPI from "../services/ScoreAPI";
import * as Confetti from "react-confetti";
import color from "../constants/color";
import { UserInfo } from "../typedef/User";

interface Props {
  onClose: () => void;
  bestScore: number;
  user: UserInfo | null;
  score: number;
}

interface ConfettiSource {
  x: number;
  y: number;
  w: number; // displayサイズにしとけばよさそう
  h: number;
}

interface State {
  width: number;
  height: number;
  numberOfPieces: number;
  friction: number;
  wind: number;
  gravity: number;
  confettiSource: ConfettiSource;
}

class UserScore extends React.Component<Props, State> {
  private contents = React.createRef<HTMLParagraphElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      numberOfPieces: 200,
      friction: 0.99,
      wind: 0,
      gravity: 0.1,
      confettiSource: {
        x: 100,
        y: 0,
        w: 1000, // displayサイズにしとけばよさそう
        h: 0
      }
    };
  }

  componentDidMount() {
    const { user, score } = this.props;
    if (user) {
      const uid = user.sub;
      ScoreAPI.registerScore(uid, score);
    }
    this.setState({
      width: this.contents.current
        ? this.contents.current.getBoundingClientRect().width
        : this.state.width,
      height: this.contents.current
        ? this.contents.current.getBoundingClientRect().height
        : this.state.height,
      confettiSource: {
        x: this.contents.current
          ? this.contents.current.getBoundingClientRect().width / 2
          : this.state.confettiSource.x,
        y: 0,
        w: this.contents.current
          ? this.contents.current.getBoundingClientRect().width
          : this.state.confettiSource.w,
        h: this.contents.current
          ? this.contents.current.getBoundingClientRect().height
          : this.state.confettiSource.h
      }
    });
  }

  render() {
    const { onClose, score, bestScore } = this.props;
    const { confettiSource } = this.state;
    return (
      <ModalWrapper>
        <InnterContainer>
          <ModalHeader>
            <ModalTitle>スコア確認</ModalTitle>
            <CloseLink onClick={onClose}>閉じる</CloseLink>
          </ModalHeader>
          <ContentsWrapper ref={this.contents}>
            <ResultTitle>ただいまのスコア</ResultTitle>
            <ResultScore>{score}</ResultScore>
            <div
              style={{
                position: "absolute",
                top: 56,
                left: 0,
                width: "100%",
                height: "calc(100% - 56px)"
              }}
            >
              <Confetti
                {...this.state}
                confettiSource={confettiSource}
                run={score > bestScore}
              />
            </div>
          </ContentsWrapper>
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
  height: calc(100% - 56px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultTitle = styled.p`
  font-size: 20px;
  text-align: center;
`;
const ResultScore = styled.p`
  font-size: 200px;
  text-align: center;
  color: ${color.red};
`;

export default UserScore;
