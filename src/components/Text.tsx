import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string; 
    size?: number;
    color?: string;
    children: React.ReactNode;
    align?: string;
}

const Text = (props:Props) => {
    const {children, className, color, size, align} = props;
    return <StyledText className={className} size={size} color={color} align={align}>{children}</StyledText>
}

const StyledText = styled.p`
  color: ${props=>props.color? props.color:'black'}; 
  font-size: ${props=>props.size? props.size:16}px;
  text-align: ${props=>props.align? props.align:'left'};
`

export default Text;