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
      position: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      console.log(this.text.current);
      console.log(this.text.current);
      const left = this.text.current && this.text.current.getBoundingClientRect().left;
      this.setState({
        position: left
      });
    }, 100);
  }

  render() {
    const {
      position
    } = this.state;
    return ( <div className = "App" >
      <h1> Hello CodeSandbox </h1>
      <h2 > Start editing to see some magic happen! </h2>
      <marquee behavior = "alternate" scrollamount = "30" >
      <span ref = {this.text} >--------------------</span></marquee >
      left: {
        position
      } </div>
    );
  }
}

export default App;
