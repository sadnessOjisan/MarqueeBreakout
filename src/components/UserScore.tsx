import * as React from "react";
import styled from 'styled-components';
import zIndex from '../constants/zIndex';

interface Props {
    
}

const UserScore = (props: Props) => {
    return(<ModalWrapper>
        <InnterContainer>
            <ModalHeader>aaaaa</ModalHeader>
            score
        </InnterContainer>
    </ModalWrapper>)
}

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
`

const InnterContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 80%; 
  height: 80%;
`

const ModalHeader = styled.div`
  width: 100%;
`

export default UserScore;
