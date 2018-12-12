import * as React from "react";
import styled from "styled-components";
import Re from "../assets/react.svg";
import Vu from "../assets/vue.svg";
import Ng from "../assets/angular.svg";
import Gu from "../assets/gulp.svg";
import Gr from "../assets/GraphQL.svg";
import Br from "../assets/browserify.svg";

interface State {
  id: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  isCollapsed: boolean;
  img: string;
}

interface Position {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface Props {
  ballPosition: Position;
  idx: number;
  onCollide: (bottom: any) => void;
}

class Block extends React.Component<Props, State> {
  private block = React.createRef<HTMLParagraphElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      isCollapsed: false,
      img: ""
    };
  }

  componentDidMount() {
    const { idx } = this.props;
    let img: string;
    const amari = idx % 6;
    switch (amari) {
      case 0:
        img = Re;
        break;
      case 1:
        img = Vu;
        break;
      case 2:
        img = Ng;
        break;
      case 3:
        img = Gu;
        break;
      case 4:
        img = Gr;
        break;
      case 5:
        img = Br;
        break;
      default:
        img = Re;
        break;
    }

    if (this.block.current) {
      const blockPosition = this.block.current.getBoundingClientRect();
      const blockLeftPosition = blockPosition.left;
      const blockTopPosition = blockPosition.top;
      const blockBottomPosition = blockPosition.bottom;
      const blockRightPosition = blockPosition.right;
      this.setState({
        id: idx,
        top: blockTopPosition,
        left: blockLeftPosition,
        right: blockRightPosition,
        bottom: blockBottomPosition,
        img: img
      });
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const blockState = prevState;
    const { onCollide } = nextProps;
    const { left, right, top, bottom } = nextProps.ballPosition;
    if (left && right && top && !blockState.isCollapsed) {
      if (
        top <= blockState.bottom &&
        right >= blockState.left &&
        left <= blockState.right &&
        bottom >= blockState.top
      ) {
        onCollide(bottom);
        return { isCollapsed: true };
      }
    }
  }

  render() {
    const { isCollapsed, img } = this.state;
    return (
      <BlockOutline isCollapsed={isCollapsed} ref={this.block}>
        <img src={img} />
      </BlockOutline>
    );
  }
}

const BlockOutline = styled.div<any>`
  visibility: ${(props: any) => (props.isCollapsed ? "hidden" : "initial")};
  width: 35px;
  height: 35px;
`;

export default Block;
