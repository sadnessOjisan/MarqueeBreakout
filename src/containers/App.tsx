import * as React from "react";

declare global {
  namespace JSX {
      interface IntrinsicElements {
          'marquee': any;
      }
  }
}

interface Props {

}

class App extends React.Component<Props, any> {
  private text = React.createRef<HTMLParagraphElement>();

  constructor(props:Props) {
    super(props);
    this.text = React.createRef();
    this.state = {
      left: null, 
      right: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      const left = this.text.current ? this.text.current.getBoundingClientRect().left:0;
      const barWidth = this.text.current ? this.text.current.getBoundingClientRect().width:0; 
      const right = left + barWidth
      this.setState({
        left: left, 
        right: right
      });
    }, 100);
  }

  render() {
    const {
      left, right
    } = this.state;
    return ( <div className = "App" >
      <marquee behavior = "alternate" scrollamount = "30" >
      <span ref = {this.text} >--------------------</span></marquee >
      left: {
        left
      }  <br />
      right: {
        right
      }</div>
    );
  }
}

export default App;
