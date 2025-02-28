import React, { useState } from 'react';
import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { gerarQuestoes } from '../services/api';
import ResultActions from '../components/ResultActions';

interface QuestoesForm {
  ano: string;
  componente: string;
  assunto: string;
  dificuldade: string;
  numero_questoes: number;
  tipo: string;
  contexto: string;
}

const ANOS_SERIES = [
  'EF - 1º Ano', 'EF - 2º Ano', 'EF - 3º Ano',
  'EF - 4º Ano', 'EF - 5º Ano', 'EF - 6º Ano',
  'EF - 7º Ano', 'EF - 8º Ano', 'EF - 9º Ano',
  'EM - 1º Ano', 'EM - 2º Ano', 'EM - 3º Ano'
];

const COMPONENTES = [
  'Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Arte',
  'Educação Física', 'Inglês', 'Biologia', 'Física', 'Química', 'Sociologia',
  'Filosofia', 'Redação', 'Literatura'
];

const Questoes: React.FC = () => {
  const inputStyles = {
    input: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
      "&:focus": {
        borderColor: "#9167b9",
        boxShadow: "none",
      },
    },
  };

  const [formData, setFormData] = useState<QuestoesForm>({
    ano: '',
    componente: '',
    assunto: '',
    dificuldade: 'Médio',
    numero_questoes: 5,
    tipo: 'Objetivas',
    contexto: ''
  });
  const [resultado, setResultado] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [textoEditado, setTextoEditado] = useState<string>('');

  const handleChange = <T extends keyof QuestoesForm>(field: T, value: QuestoesForm[T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await gerarQuestoes(formData);
      if (!res) throw new Error("Nenhum resultado retornado");
      setResultado(res);
      setTextoEditado(res);
      showNotification({ color: 'green', title: 'Sucesso', message: 'Questões geradas!' });
    } catch (error) {
      console.error("Erro ao gerar questões:", error);
      showNotification({ color: 'red', title: 'Erro', message: 'Falha ao gerar questões.' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([resultado], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'questoes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEditar = () => setModoEdicao(true);
  const handleSalvarEdicao = () => {
    setResultado(textoEditado);
    setModoEdicao(false);
  };
  const handleNovo = () => {
    setResultado('');
    setTextoEditado('');
    setModoEdicao(false);
    setFormData({
      ano: '',
      componente: '',
      assunto: '',
      dificuldade: 'Médio',
      numero_questoes: 5,
      tipo: 'Objetivas',
      contexto: ''
    });
  };

  return (
    <Stack spacing="md" style={{ backgroundColor: "white", color: "black", padding: "1rem" }}>
      <Title order={3} style={{ color: "#9167b9" }}>Gerar Questões</Title>

      {!resultado && (
        <>
          <Select
            label="Ano / Série"
            placeholder="Selecione o ano"
            data={ANOS_SERIES}
            value={formData.ano}
            onChange={(value: string | null) => handleChange('ano', value ?? '')}
            styles={inputStyles}
          />
          <Select
            label="Componente Curricular"
            placeholder="Selecione o componente"
            data={COMPONENTES}
            value={formData.componente}
            onChange={(value: string | null) => handleChange('componente', value ?? '')}
            styles={inputStyles}
          />
          <TextInput
            label="Assunto (opcional)"
            placeholder="Ex.: Frações"
            value={formData.assunto}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('assunto', e.currentTarget.value)
            }
            styles={inputStyles}
          />
          <Select
            label="Dificuldade"
            placeholder="Selecione"
            data={['Fácil', 'Médio', 'Difícil']}
            value={formData.dificuldade}
            onChange={(value: string | null) => handleChange('dificuldade', value ?? 'Médio')}
            styles={inputStyles}
          />
          <NumberInput
            label="Número de Questões"
            value={formData.numero_questoes}
            onChange={(value: number | null) =>
              handleChange('numero_questoes', value === null ? 5 : value)
            }
            min={1}
            max={20}
            styles={inputStyles}
          />
          <Select
            label="Tipo de Questões"
            placeholder="Selecione"
            data={['Objetivas', 'Dissertativas']}
            value={formData.tipo}
            onChange={(value: string | null) => handleChange('tipo', value ?? 'Objetivas')}
            styles={inputStyles}
          />
          <Textarea
            label="Contexto (opcional)"
            placeholder="Cole o texto extraído de um arquivo, se houver"
            value={formData.contexto}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange('contexto', e.currentTarget.value)
            }
            styles={inputStyles}
          />

          <Group position="right">
            <Button onClick={handleSubmit} loading={loading} color="violet">
              Gerar Questões
            </Button>
          </Group>
        </>
      )}

      {resultado && (
        <>
          <ResultActions
            isEditing={modoEdicao}
            onEdit={handleEditar}
            onDownload={handleDownload}
            onNew={handleNovo}
            onSaveEdit={handleSalvarEdicao}
            onCancelEdit={() => setModoEdicao(false)}
            groupPosition="right"
          />

          {!modoEdicao ? (
            <Textarea
              label="Questões Geradas"
              value={resultado}
              autosize
              minRows={6}
              readOnly
              styles={inputStyles}
            />
          ) : (
            <Textarea
              label="Editar Questões Geradas"
              value={textoEditado}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTextoEditado(e.currentTarget.value)
              }
              autosize
              minRows={6}
              styles={inputStyles}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default Questoes;
