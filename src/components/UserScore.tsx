import * as React from "react";
import styled from "styled-components";
import zIndex from "../constants/zIndex";

interface Props {
    onClose():void
}

const UserScore = (props: Props) => {
    const {onClose} = props;
  return (
    <ModalWrapper>
      <InnterContainer>
        <ModalHeader>
            <ModalTitle>スコア確認</ModalTitle>
            <CloseLink onClick={onClose}>閉じる</CloseLink>
        </ModalHeader>
        <ContentsWrapper>

        </ContentsWrapper>
      </InnterContainer>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;

const InnterContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
position: relative;
  width: 100%;
`;

const ModalTitle = styled.h3`
  text-align: center;
`

const CloseLink = styled.span`
  position: absolute; 
  right: 12px;
  top: 0;
  cursor: pointer;
`

const ContentsWrapper = styled.div`
  height: 100%; 
  overflow-y: scroll;
`

export default UserScore;
