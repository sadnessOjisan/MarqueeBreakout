import * as React from "react";
import styled from "styled-components";
import Component from '../components/Component'

class App extends React.Component {
  render() {
    return (
      <div>
        <Text>hellooohh!</Text>
        <Component />
      </div>
    );
  }
}

const Text = styled.p`
  color: red;
`;

export default App;
