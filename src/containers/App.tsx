import * as React from "react";
import Block from "../components/Block";
import styled from "styled-components";
import { throttle } from "lodash";
import { createGlobalStyle } from "styled-components";
import Panel from "../components/Panel";
import Ranking from "../components/Ranking";
import UserScore from "../components/UserScore";
import zIndex from "../constants/zIndex";
import Mode from "../constants/mode";
import Text from "../components/Text";
import AuthAPI from "../services/AuthAPI";
import userAPI from "../services/userAPI";
import { splitCurrentURL, setHeader } from "../util/helper";
import ScoreAPI from "../services/ScoreAPI";

const GlobalStyle = createGlobalStyle`
  *,
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 62.5%;
    width: 100%;
    height: 100%;
}
`;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: any;
    }
  }
}

interface Props {}

interface Position {
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

interface User {
  top: number | null;
  left: number | null;
  bottom: number | null;
  right: number | null;
}

interface State {
  barPositon: Position;
  ballPosition: Position;
  vBallDirection: string;
  hBallDirection: string;
  bounceBorder: number | null;
  barSpeed: number;
  ballXSpeed: number;
  ballYSpeed: number;
  ballXBehavior: string;
  ballYBehavior: string;
  barBehavior: string;
  width: number;
  height: number;
  isStart: boolean;
  score: number;
  isModalOpen: boolean;
  mode: string;
  isLogin: boolean;
  accessToken: string;
  user: User;
  bestScore: number;
}

interface EventObject {
  type: string;
  value: string;
}

const GAME_SCREEN_HEIGHT = 640;

class App extends React.Component<Props, State> {
  private text = React.createRef<HTMLParagraphElement>();
  private ball = React.createRef<HTMLParagraphElement>();

  constructor(props: Props) {
    super(props);
    this.text = React.createRef();
    this.state = {
      barPositon: {
        top: null,
        left: null,
        right: null,
        bottom: null
      },
      barSpeed: 30,
      ballXSpeed: 30,
      ballYSpeed: 30,
      ballXBehavior: "alternate",
      ballYBehavior: "alternate",
      barBehavior: "alternate",
      width: 100,
      height: 100,
      ballPosition: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      vBallDirection: "up",
      hBallDirection: "right",
      bounceBorder: 34,
      isStart: false,
      score: 0,
      isModalOpen: false,
      mode: Mode.normal,
      isLogin: false,
      accessToken: "",
      bestScore: 0
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { barPositon, ballPosition, isStart, score, mode } = prevState;
    const ballBottom = ballPosition.bottom;
    if (isStart && ballBottom > 632) {
      const barLeft = barPositon.left;
      const barRight = barPositon.right;
      const ballLeft = ballPosition.left;
      const ballRight = ballPosition.right;
      if (ballRight < barLeft || ballLeft > barRight) {
        if (score !== 0) {
          if (mode === Mode.normal) {
            return {
              isStart: false,
              mode: Mode.score,
              isModalOpen: true,
              ballPosition: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }
            };
          } else if (mode === Mode.practice) {
            console.log("[無敵モード]あなたはいま死にました");
          }
        }
        return { isStart: true };
      }
      return null;
    }
    return null;
  }

  handleClide = throttle(this.bounceBall, 100);

  bounceBall(blockBottom) {
    this.setState({
      bounceBorder: 0, // 跳ね返り計算は諦めた
      score: this.state.score + 1
    });
  }

  setUserInfo(user) {
    localStorage.removeItem("user"); // 初期化
    this.setState({
      user: user
    });
    const uid = user.sub;
    userAPI.registerUser(uid, user.name);
    const highScore = ScoreAPI.getMyHighScore(uid);
    console.log("highscore: ", highScore);
    localStorage.setItem("user", JSON.stringify(user));
  }

  setMarqueeProperty(message: EventObject) {
    const type = message.type;
    const value = message.value;
    switch (type) {
      case "BAR_SPEED":
        this.setState({
          barSpeed: value
        });
        break;
      case "BALL_X_SPEED":
        this.setState({
          ballXSpeed: value
        });
        break;
      case "BALL_Y_SPEED":
        this.setState({
          ballYSpeed: value
        });
        break;
      case "BALL_X_BEHAVIOR":
        this.setState({
          ballXBehavior: value
        });
        break;
      case "BALL_Y_BEHAVIOR":
        this.setState({
          ballYBehavior: value
        });
        break;
      case "BAR_BEHAVIOR":
        this.setState({
          barBehavior: value
        });
        break;
      case "WIDTH":
        this.setState({
          width: value
        });
        break;
      case "HEIGHT":
        this.setState({
          height: value
        });
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const { isLogin } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!isLogin && !user) {
      // 見ログインかつuser情報を持たない時
      const params = splitCurrentURL("#");
      if (params) {
        const id = params.id_token;
        this.setState({
          accessToken: id,
          isLogin: true
        });
        setHeader(id);
        AuthAPI.getProfile(u => this.setUserInfo(u)); // auth0から認証情報を取り出してstateに登録
      }
    } else {
      // user情報をすでに持っていた時
      this.setState({
        user: user
      });
      const uid = user.sub;
      ScoreAPI.getMyHighScore(uid).then(res => {
        console.log(res);
        const { data } = res;
        const { score } = data;
        this.setState({
          accessToken: id,
          isLogin: true,
          bestScore: score
        });
      });
    }
    setInterval(() => {
      if (this.text.current && this.ball.current) {
        const barPosition = this.text.current.getBoundingClientRect();
        const barLeftPosition = barPosition.left;
        const barTopPosition = barPosition.top;
        const barBottomPosition = barPosition.bottom;
        const ballPosition = this.ball.current.getBoundingClientRect();
        const ballLeftPosition = ballPosition.left;
        const ballWidth = ballPosition.width;
        const ballRightPosition = ballLeftPosition + ballWidth;
        const ballTopPosition = ballPosition.top;
        const ballBottomPosition = ballPosition.bottom;
        const barWidth = this.text.current.getBoundingClientRect().width;
        const barRightPosition = barLeftPosition + barWidth;
        this.setState({
          barPositon: {
            left: barLeftPosition,
            right: barRightPosition,
            top: barTopPosition,
            bottom: barBottomPosition
          },
          ballPosition: {
            top: ballTopPosition,
            left: ballLeftPosition,
            right: ballRightPosition,
            bottom: ballBottomPosition
          }
        });
      }
    }, 1);
  }

  handleClickStartButton(mode: string) {
    this.setState({
      isStart: true,
      isModalOpen: false,
      mode: mode,
      score: 0
    });
  }

  handleGameQuit() {
    this.setState({
      isStart: false
    });
  }

  handleCloseModal() {
    this.setState({
      isModalOpen: false,
      isStart: false
    });
  }

  handleModalOpen(mode: string) {
    this.setState({
      isModalOpen: true,
      mode: mode
    });
  }

  render() {
    const {
      barPositon,
      ballPosition,
      vBallDirection,
      hBallDirection,
      bounceBorder,
      barSpeed,
      ballXSpeed,
      ballYSpeed,
      ballXBehavior,
      ballYBehavior,
      barBehavior,
      width,
      isStart,
      isModalOpen,
      score,
      mode,
      user,
      bestScore
    } = this.state;
    console.log("this.state", this.state);
    const ballTop = ballPosition.top;
    const ballRight = ballPosition.right;
    return (
      <Wrapper>
        <GlobalStyle />
        {isStart && (mode === Mode.normal || mode === Mode.practice) ? (
          <GameCanvas>
            <Score>your score is {score}. </Score>
            <BlockWrapper>
              {Array(300)
                .fill(0)
                .map((_, idx) => (
                  <Block
                    ballPosition={ballPosition}
                    onCollide={bottom => this.handleClide(bottom)}
                    idx={idx}
                    key={idx}
                  />
                ))}
            </BlockWrapper>
            <marquee
              behavior={ballYBehavior}
              scrollamount={ballYSpeed}
              height={GAME_SCREEN_HEIGHT}
              style={{ position: "absolute", top: `${bounceBorder}px` }}
              direction={vBallDirection}
            >
              <marquee
                behavior={ballXBehavior}
                scrollamount={ballXSpeed}
                direction={hBallDirection}
                width={`${width}%`}
              >
                <Ball ref={this.ball}>●</Ball>
              </marquee>
            </marquee>
            <marquee
              behavior={barBehavior}
              scrollamount={barSpeed}
              style={{ position: "absolute", top: GAME_SCREEN_HEIGHT }}
            >
              <span ref={this.text}>--------------------</span>
            </marquee>
          </GameCanvas>
        ) : (
          <div>
            <p
              onClick={() => {
                AuthAPI.login();
              }}
            >
              login
            </p>
            <p
              onClick={() => {
                AuthAPI.getProfile(u => this.setUserInfo(u));
              }}
            >
              get user info
            </p>
            <Text align="center">paramを設定してください</Text>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Text
              onClick={() => this.handleModalOpen(Mode.ranking)}
              align="center"
            >
              ランキングを確認する
            </Text>
          </div>
        )}
        <Panel
          onSelect={(obj: EventObject) => this.setMarqueeProperty(obj)}
          onStart={(mode: string) => this.handleClickStartButton(mode)}
          onQuit={() => this.handleGameQuit()}
        />
        {isModalOpen && mode === Mode.ranking ? (
          <Ranking
            onClose={() => this.handleCloseModal()}
            user={user}
          />
        ) : isModalOpen && mode === Mode.score ? (
          <UserScore
            onClose={() => this.handleCloseModal()}
            user={user}
            score={score}
            bestScore={bestScore}
          />
        ) : (
          <React.Fragment />
        )}
      </Wrapper>
    );
  }
}

const BlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameCanvas = styled.div`
  position: relative;
  height: 100vh;
`;

const Ball = styled.div`
  display: inline-block;
`;

const Wrapper = styled.div`
  z-index: ${zIndex.app};
`;

const Score = styled.p`
  position: absolute;
  top: 50%;
  left: 40%;
  text-align: center;
  font-size: 36px;
`;

export default App;
