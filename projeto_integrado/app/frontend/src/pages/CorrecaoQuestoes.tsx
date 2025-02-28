import React from 'react';
import { AppShell, Title, Text, Stack } from '@mantine/core';

const CorrecaoQuestoes: React.FC = () => {
  return (
    <AppShell
      padding="md"
      style={{ backgroundColor: "white", color: "black", minHeight: "100vh" }}
    >
      <Stack spacing="md" style={{ backgroundColor: "white", color: "black", padding: "1rem" }}>
        <Title order={3} style={{ color: "#9167b9" }}>
          Correção de Questões
        </Title>
        <Text style={{ color: "black" }}>
          Este módulo estará disponível em breve.
        </Text>
      </Stack>
    </AppShell>
  );
};

export default CorrecaoQuestoes;
