import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: any;
    }
  }
}

interface Props {}

class App extends React.Component<Props, any> {
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
      }
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.text.current && this.ball.current) {
        const barPosition = this.text.current.getBoundingClientRect();
        const barLeftPosition = barPosition.left;
        const ballPosition = this.ball.current.getBoundingClientRect();
        const ballLeftPosition = ballPosition.left;
        const ballWidth = ballPosition.width;
        const ballRightPosition = ballLeftPosition + ballWidth
        const ballTopPosition = ballPosition.top;
        const ballBottomPosition = ballPosition.bottom;
        const barWidth = this.text.current.getBoundingClientRect().width;
        const barRightPosition = barLeftPosition + barWidth;
        this.setState({
          barPositon: {
            left: barLeftPosition,
            right: barRightPosition
          }, 
          ballPosition: {
            top: ballTopPosition, 
            left: ballLeftPosition, 
            right: ballRightPosition, 
            bottom: ballBottomPosition
          }
        });
      }
    }, 100);
  }

  render() {
    const { barPositon, ballPosition } = this.state;
    const { left, right } = barPositon;
    const ballTop = ballPosition.top;
    const ballRight = ballPosition.right;
    return (
      <div className="App">
        <marquee
          behavior="alternate"
          scrollamount="30"
          height="400"
          direction="up"
        >
          <marquee behavior="alternate" scrollamount="30">
            <span ref={this.ball}>●</span>
          </marquee>
        </marquee>
        <marquee behavior="alternate" scrollamount="30">
          <span ref={this.text}>--------------------</span>
        </marquee>
        <p>ball</p>
        ball top: {ballTop} <br />
        ball right: {ballRight}
        <p>bar</p>
        left: {left} <br />
        right: {right}
      </div>
    );
  }
}

export default App;
