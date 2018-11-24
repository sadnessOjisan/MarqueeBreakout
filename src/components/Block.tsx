import * as React from "react";
import styled from "styled-components";

interface State {
  id: number | null;
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
  isCollapsed: boolean;
}

interface Position {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface Props {
  ballPosition: Position;
}

class Block extends React.Component<Props, State> {
  private block = React.createRef<HTMLParagraphElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      id: null,
      top: null,
      left: null,
      right: null,
      bottom: null,
      isCollapsed: false
    };
  }

  componentDidMount() {
    if (this.block.current) {
      const blockPosition = this.block.current.getBoundingClientRect();
      const blockLeftPosition = blockPosition.left;
      const blockTopPosition = blockPosition.top;
      const blockBottomPosition = blockPosition.bottom;
      const blockRightPosition = blockPosition.right;
      this.setState({
        top: blockTopPosition,
        left: blockLeftPosition,
        right: blockRightPosition,
        bottom: blockBottomPosition
      });
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const blockState = prevState
    const { onCollide } = nextProps;
    const { left, right, top, bottom } = nextProps.ballPosition;
    if (left && right && top && !blockState.isCollapsed) {
      if (
        top <= blockState.bottom &&
        right >= blockState.left &&
        left <= blockState.right && 
        bottom >= blockState.top
      ) {
        console.log(bottom);
        onCollide(bottom);
        return { isCollapsed: true };
      }
    }
  }

  render() {
    const { isCollapsed, top, left } = this.state;
    return (
      <BlockOutline isCollapsed={isCollapsed} ref={this.block}>
      a
      </BlockOutline>
    );
  }
}

const BlockOutline = styled.div`
  background-color: ${(props: any) => (props.isCollapsed ? "red" : "blue")};
  width: 20px;
  height: 20px;
`;

export default Block;
