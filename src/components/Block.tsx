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

class Block extends React.Component<any, State> {
  private block = React.createRef<HTMLParagraphElement>();
  constructor(props) {
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

  render() {
    const { isCollapsed, top, left } = this.state;
    return <BlockOutline isCollapsed={isCollapsed} ref={this.block}>
    top: {top} <br /> left: {left}
    </BlockOutline>;
  }
}

const BlockOutline = styled.div`
  background-color: ${(props:any) => props.isCollapsed ? "red" : "blue"};
  width: 50px;
  height: 50px;
  font-size: 6px;
`;

export default Block;
