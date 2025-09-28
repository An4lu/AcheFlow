import type { CSS } from "@stitches/react";
import { ModalBackground, ModalContent, ModalParagraph } from "./styles";
import { Title } from "../Title";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  css?: CSS;
}

export function IAche({ isOpen, onClose, css }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} css={css}>
        <div style={{ width: '95%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Title>IAche</Title>
          <ModalParagraph>Funcionalidade em desenvolvimento.</ModalParagraph>
        </div>
      </ModalContent>
    </ModalBackground>
  );
}
