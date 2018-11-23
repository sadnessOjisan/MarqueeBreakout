import * as React from "react";
import styled from "styled-components";

interface Props {
  (obj: any): void;
}

const Panel = (props: Props) => {
  const { onSelect } = props;
  return (
    <Wrapper>
      <form>
        <label>bar scroll speed</label>
        <input
          onChange={e => onSelect({ type: "BAR_SPEED", value: e.target.value })}
        />
        <label>ball x scroll speed</label>
        <input
          onChange={e =>
            onSelect({ type: "BALL_X_SPEED", value: e.target.value })
          }
        />
        <label>ball y scroll speed</label>
        <input
          onChange={e =>
            onSelect({ type: "BALL_Y_SPEED", value: e.target.value })
          }
        />
        <label>ball x behavior</label>
        <select onChange={e =>
            onSelect({ type: "BALL_X_BEHAVIOR", value: e.target.value })
          }>
          <option value='alternate'>alternate</option>
          <option value='scroll'>scroll</option>
          <option value='slide'>slide</option>
        </select>
        <label>ball y behavior</label>
        <select onChange={e =>
            onSelect({ type: "BALL_Y_BEHAVIOR", value: e.target.value })
          }>
          <option value='alternate'>alternate</option>
          <option value='slide'>slide</option>
        </select>
        <label>bar behavior</label>
        <select onChange={e =>
            onSelect({ type: "BAR_BEHAVIOR", value: e.target.value })
          }>
          <option value='alternate'>alternate</option>
          <option value='scroll'>scroll</option>
          <option value='slide'>slide</option>
        </select>
        <label>width</label>
        <input
          onChange={e =>
            onSelect({ type: "WIDTH", value: e.target.value })
          }
        />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export default Panel;
