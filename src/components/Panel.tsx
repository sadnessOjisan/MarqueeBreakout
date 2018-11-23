import * as React from "react";
import styled from "styled-components";
import { render } from "react-dom";

interface Props {
    onSelect: any => void
}

const Panel = (props:Props) => {
    const {onSelect} = props;
    return (<Wrapper>

        <form>
        <label>bar scroll speed</label>
        <input onChange={(e)=>onSelect({type: 'BAR_SPEED', value: e.target.value})}></input>
            <label>aaa</label>
            <select>
                <option>aaa</option>
                <option>aaa</option>
            </select></form>
        </Wrapper>)
}

const Wrapper = styled.div`
  width: 40%;
  position: absolute; 
  bottom: 0;
`


export default Panel;
