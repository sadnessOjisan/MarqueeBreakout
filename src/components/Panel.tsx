import * as React from "react";
import styled from "styled-components";
import TextField from "@atlaskit/field-text";
import Select from "@atlaskit/select";
import Mode from "../constants/mode";
import Button from "@atlaskit/button";

interface FormValues {
  barSpeed:number;
  ballXSpeed:number;
  ballYSpeed:number;
  ballXBehavior:string;
  ballYBehavior:string;
  barBehavior:string;
  width:number;
}

interface Props {
  onSelect: (obj: any) => void;
  onStart: (mode: string) => void;
  onQuit: () => void;
  formValues: FormValues;
}

interface SelectEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const Panel = (props: Props) => {
  const { onSelect, onStart, onQuit,formValues } = props;
  return (
    <Wrapper>
      <TextField
        onChange={(e:SelectEvent) => onSelect({ type: "BAR_SPEED", value: e.target.value })}
        label="bar scroll speed"
        value={String(formValues.barSpeed)}
      />
      <TextField
        onChange={(e:SelectEvent) =>
          onSelect({ type: "BALL_X_SPEED", value: e.target.value })
        }
        label="ball x scroll speed"
        value={String(formValues.ballXSpeed)}
      />
      <TextField
        onChange={(e:SelectEvent) =>
          onSelect({ type: "BALL_Y_SPEED", value: e.target.value })
        }
        label="ball y scroll speed"
        value={String(formValues.ballYSpeed)}
      />
      <TextField
        onChange={(e:SelectEvent) => onSelect({ type: "WIDTH", value: e.target.value })}
        label="ball area width"
        value={String(formValues.width)}
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
          onChange={(e:any) => onSelect({ type: "BALL_X_BEHAVIOR", value: e.value })}
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
          onChange={(e:any) => onSelect({ type: "BALL_Y_BEHAVIOR", value: e.value })}
        />
      </div>
      <div>
        <Heading>BAR_BEHAVIOR</Heading>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={[
            { label: "alternate", value: "alternate" },
            { label: "scroll", value: "scroll" },
            { label: "slide", value: "slide" }
          ]}
          placeholder="BAR_BEHAVIOR"
          onChange={(e:any) => onSelect({ type: "BAR_BEHAVIOR", value: e.value })}
        />
      </div>
      <ButtonRow>
        <StyledButton onClick={() => onQuit()} appearance="danger">
          ゲームをやめる
        </StyledButton>
        <StyledButton
          onClick={() => onStart(Mode.practice)}
          appearance="default"
        >
          練習モード
        </StyledButton>
        <StyledButton
          onClick={() => onStart(Mode.normal)}
          appearance="primary"
          style={{ height: "24px" }}
        >
          START
        </StyledButton>
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

const StyledButton = styled(Button)<any>`
  height: 24px;
  text-align: center;
`;

const Heading = styled.div`
  color: #6b778c;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3333333333333333;
  padding: 20px 0px 4px 0px;
  word-wrap: break-word;
`;

export default Panel;
