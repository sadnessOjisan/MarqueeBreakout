import * as React from "react";
import styled from "styled-components";
import Re from '../assets/react.svg';
import Vu from '../assets/vue.svg';
import Ng from '../assets/angular.svg';
import Gu from '../assets/gulp.svg';
import Gr from '../assets/GraphQL.svg';
import Br from '../assets/browserify.svg'


interface State {
  id: number | null;
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
  isCollapsed: boolean;
  img: string | null
}

interface Position {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface Props {
  ballPosition: Position;
  idx: number
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
      isCollapsed: false, 
      img: null
    };
  }

  componentDidMount() {
    const{idx} = this.props;
    let img:string;
    const amari = idx % 6;
    switch(amari){
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
        img = Re
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
        console.log(bottom);
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

const BlockOutline = styled.div`
  visibility: ${(props: any) => (props.isCollapsed ? "hidden" : "initial")};
  width: 20px;
  height: 20px;
`;

export default Block;
