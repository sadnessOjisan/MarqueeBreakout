import * as React from "react";
import Block from "../components/Block";
import styled from "styled-components";
import {throttle} from 'lodash'
import { createGlobalStyle } from "styled-components";

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
  top: number| null,
  left: number| null,
  bottom: number| null,
  right: number| null,
}

interface State {
  barPositon: Position, 
  ballPosition: Position, 
  vBallDirection: string, 
  hBallDirection: string, 
  bounceBorder: number | null
}

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
      ballPosition: {
        top: null,
        left: null,
        right: null,
        bottom: null
      }, 
      vBallDirection: 'up', 
      hBallDirection: 'right', 
      bounceBorder: 34
    };
  }

  _bounceBall = throttle(this.bounceBall, 1000)

  bounceBall(blockBottom){
    console.log('_bounceBall fire')
    console.log(blockBottom)
    this.setState({
      bounceBorder: 0 // 跳ね返り計算は諦めた
    })
  }

  componentDidMount() {
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

  render() {
    const { barPositon, ballPosition, vBallDirection, hBallDirection, bounceBorder } = this.state;
    const { left, right } = barPositon;
    const ballTop = ballPosition.top;
    const ballRight = ballPosition.right;
    return (
      <GameCanvas>
        <GlobalStyle />
        <BlockWrapper>
          {[
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ].map(_ => (
            <Block ballPosition={ballPosition} onCollide={(bottom)=>this._bounceBall(bottom)} />
          ))}
        </BlockWrapper>
        <marquee
          behavior="alternate"
          scrollamount="40"
          height={`${400-bounceBorder}`}
          style={{ position: "absolute", top: `${bounceBorder}px` }}
          direction={vBallDirection}
        >
          <marquee behavior="alternate" scrollamount="30" direction={hBallDirection}>
            <Ball ref={this.ball} ballPosition={ballPosition}>●</Ball>
          </marquee>
        </marquee>
        <marquee
          behavior="alternate"
          scrollamount="30"
          style={{ position: "absolute", top: 400 }}
        >
          <span ref={this.text}>--------------------</span>
        </marquee>
        <p>ball</p>
        ball top: {ballTop} <br />
        ball right: {ballRight}
        <p>bar</p>
        left: {left} <br />
        right: {right}
      </GameCanvas>
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
`

export default App;
