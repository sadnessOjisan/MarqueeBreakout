import * as React from "react";
import styled from "styled-components";
import zIndex from "../constants/zIndex";
import ScoreAPI from "../services/ScoreAPI";
import Confetti from "react-confetti";

interface Props {
  onClose(): void;
}

class UserScore extends React.Component {
  private contents = React.createRef<HTMLParagraphElement>();

  constructor(props) {
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
    const uid = user.sub;
    this.setState({
      width:
        this.contents.current &&
        this.contents.current.getBoundingClientRect().width,
      height:
        this.contents.current &&
        this.contents.current.getBoundingClientRect().height,
      confettiSource: {
        x:
          this.contents.current &&
          this.contents.current.getBoundingClientRect().width / 2,
        y: 0,
        w:
          this.contents.current &&
          this.contents.current.getBoundingClientRect().width,
        h:
          this.contents.current &&
          this.contents.current.getBoundingClientRect().height
      }
    });
    ScoreAPI.registerScore(uid, score);
  }

  render() {
    const { onClose, user, score } = this.props;
    const { confettiSource } = this.state;
    return (
      <ModalWrapper>
        <InnterContainer>
          <ModalHeader>
            <ModalTitle>スコア確認</ModalTitle>
            <CloseLink onClick={onClose}>閉じる</CloseLink>
          </ModalHeader>
          <ContentsWrapper ref={this.contents}>
            > current score {score}
            name: {user.name}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            >
              <Confetti {...this.state} confettiSource={confettiSource} />
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
`;

const StyledConf = styled(Confetti)`
  height: 40%;
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
`;

const ModalTitle = styled.h3`
  text-align: center;
`;

const CloseLink = styled.span`
  position: absolute;
  right: 12px;
  top: 0;
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export default UserScore;
