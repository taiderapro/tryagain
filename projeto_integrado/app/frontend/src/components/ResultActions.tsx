// src/components/ResultActions.tsx
import React from 'react';
import { Button, Group } from '@mantine/core';

interface ResultActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onDownload: () => void;
  onNew: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  groupPosition?: 'left' | 'center' | 'right' | 'apart';
}

const ResultActions: React.FC<ResultActionsProps> = ({
  isEditing,
  onEdit,
  onDownload,
  onNew,
  onSaveEdit,
  onCancelEdit,
  groupPosition = 'right', // Padrão: alinhar à direita
}) => {
  return (
    <Group position={groupPosition} style={{ marginTop: '1rem' }}>
      {!isEditing ? (
        <>
          <Button variant="outline" onClick={onEdit}>
            ✏️ Editar
          </Button>
          <Button variant="outline" onClick={onDownload}>
            📥 Baixar
          </Button>
          <Button color="red" onClick={onNew}>
            🆕 Novo
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onSaveEdit}>💾 Salvar Edição</Button>
          <Button variant="outline" onClick={onCancelEdit}>
            Cancelar
          </Button>
        </>
      )}
    </Group>
  );
};

export default ResultActions;
