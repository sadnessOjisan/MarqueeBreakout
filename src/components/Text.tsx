import * as React from "react";
import styled from "styled-components";

interface Props {
  className?: string;
  size?: any;
  color?: string;
  children: React.ReactNode;
  align?: string;
  onClick?: any;
}

const Text = (props: Props) => {
  const { children, className, color, size, align, onClick } = props;
  return (
    <StyledText
      className={className}
      size={size}
      color={color}
      align={align}
      onClick={onClick}
    >
      {children}
    </StyledText>
  );
};

const StyledText = styled.p<any>`
  color: ${(props: any) => (props.color ? props.color : "black")};
  font-size: ${(props: any) => (props.size ? props.size : 16)}px;
  text-align: ${(props: any) => (props.align ? props.align : "left")};
`;

export default Text;
