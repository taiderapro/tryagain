import React from 'react';
import { Container, Tabs, Title, Card, Center, Box } from '@mantine/core';
import { IconBook, IconFileText, IconListCheck, IconClipboardCheck } from '@tabler/icons-react';
import PlanoAula from './pages/PlanoAula';
import AssuntoContextualizado from './pages/AssuntoContextualizado';
import Questoes from './pages/Questoes';
import CorrecaoQuestoes from './pages/CorrecaoQuestoes';
import BaseLayout from './components/BaseLayout';

const App: React.FC = () => {
  return (
    <BaseLayout>
      <Container size="lg" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card shadow="md" padding="xl" radius="lg" style={{ backgroundColor: 'white', width: '100%', maxWidth: '900px' }}>
          <Center>
            <Title align="center" mb="xl" style={{ color: '#9167b9', fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📚 LECIONA AI 🦉
            </Title>
          </Center>
          
          <Tabs defaultValue="plano" variant="pills" color="violet" grow>
            <Tabs.List position="center" style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', gap: '12px' }}>
              <Tabs.Tab value="plano" icon={<IconBook size={18} />}>Plano de Aula</Tabs.Tab>
              <Tabs.Tab value="assunto" icon={<IconFileText size={18} />}>Assunto Contextualizado</Tabs.Tab>
              <Tabs.Tab value="questoes" icon={<IconListCheck size={18} />}>Questões</Tabs.Tab>
              <Tabs.Tab value="correcao" icon={<IconClipboardCheck size={18} />}>Correção de Questões</Tabs.Tab>
            </Tabs.List>

            <Box mt="lg">
              <Tabs.Panel value="plano" pt="xs">
                <PlanoAula />
              </Tabs.Panel>
              <Tabs.Panel value="assunto" pt="xs">
                <AssuntoContextualizado />
              </Tabs.Panel>
              <Tabs.Panel value="questoes" pt="xs">
                <Questoes />
              </Tabs.Panel>
              <Tabs.Panel value="correcao" pt="xs">
                <CorrecaoQuestoes />
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default App;
