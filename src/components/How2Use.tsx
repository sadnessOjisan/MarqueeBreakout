import * as React from "react";
import styled from "styled-components";
import Text from "./Text";
import zIndex from "../constants/zIndex";
import color from "../constants/color";

interface Props {
  onClose(): void;
}

const How2Use = (props: Props) => {
  const { onClose } = props;
  return (
    <ModalWrapper>
      <InnterContainer>
        <ModalHeader>
          <ModalTitle>遊び方</ModalTitle>
          <CloseLink onClick={onClose}>閉じる</CloseLink>
        </ModalHeader>
        <ContentsWrapper>
          <Text>
            marqueeタグのプロパティを制御することで、ブロック崩しをしよう
          </Text>
          <Text>プロパティは最下部のコンソールから触れるよ</Text>
          <Text>数値を変更するだけでプロパティが反映されるよ</Text>
          <Text>ブロックを崩すと点数がもらえるよ</Text>
          <Text>ログインしていると点数で全国ランクを競えるよ</Text>
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
  color: ${color.black};
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
`;

const ModalTitle = styled.h3`
  text-align: center;
  font-size: 20px;
`;

const CloseLink = styled.span`
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: ${color.blue};
`;

const ContentsWrapper = styled.div`
  overflow-y: scroll;
  height: calc(100% - 56px);
  overflow-y: scroll;
  padding: 16px;
`;

export default How2Use;
