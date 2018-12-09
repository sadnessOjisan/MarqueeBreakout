import * as React from "react";
import styled from "styled-components";
import TextField from "@atlaskit/field-text";
import Select from "@atlaskit/select";
import Mode from "../constants/mode";
import Button from '@atlaskit/button';

interface Props {
  (obj: any): void;
}

const Panel = (props: Props) => {
  const { onSelect, onStart, onQuit } = props;
  return (
    <Wrapper>
      <TextField
        onChange={e => onSelect({ type: "BAR_SPEED", value: e.target.value })}
        label="bar scroll speed"
      />
      <TextField
        onChange={e =>
          onSelect({ type: "BALL_X_SPEED", value: e.target.value })
        }
        label="ball x scroll speed"
      />
      <TextField
        onChange={e =>
          onSelect({ type: "BALL_Y_SPEED", value: e.target.value })
        }
        label="ball y scroll speed"
      />
       <TextField
        onChange={e =>
          onSelect({ type: "WIDTH", value: e.target.value })
        }
        label="ball area width"
      />
      <div>
        <Heading>BALL_X_BEHAVIOR</Heading>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={[
            { label: "alternate", value: "alternate" },
            { label: "scroll", value: "scroll" },
            { label: "slide", value: "slide" }
          ]}
          placeholder="BALL_X_BEHAVIOR"
          onChange={e => onSelect({ type: "BALL_X_BEHAVIOR", value: e.value })}
        />
      </div>
      <div>
        <Heading>BALL_Y_BEHAVIOR</Heading>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={[
            { label: "alternate", value: "alternate" },
            { label: "slide", value: "slide" }
          ]}
          placeholder="BALL_Y_BEHAVIOR"
          onChange={e => onSelect({ type: "BALL_Y_BEHAVIOR", value: e.value })}
        />
      </div>
      
     
       <ButtonRow><StyledButton onClick={() => onQuit()} appearance='danger'>ゲームをやめる</StyledButton>
      <StyledButton onClick={() => onStart(Mode.practice)} appearance='default'>
        練習モード
      </StyledButton>
      <StyledButton onClick={() => onStart(Mode.normal)} appearance='primary' style={{height: '24px'}}>START</StyledButton>
    </ButtonRow>
    </Wrapper>
   
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  flex-wrap: wrap;
  > * {
    width: 140px;
    flex: initial;
    margin-right: 12px;
    
  }
`;

const ButtonRow = styled.div`
margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  flex-wrap: wrap;
  > * {
    width: 140px;
    flex: initial;
    margin-right: 12px;
    height: 36px;
  }
`;

const StyledButton = styled(Button)`
  height: 24px;
  text-align: center;
`

const Heading = styled.div`
      color: #6B778C;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.3333333333333333;
    padding: 20px 0px 4px 0px;
    word-wrap: break-word;
`;


export default Panel;
