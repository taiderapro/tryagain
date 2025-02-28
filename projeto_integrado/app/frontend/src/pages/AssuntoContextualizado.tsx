import React, { useState } from 'react';
import { Button, Group, Select, Stack, TextInput, Textarea, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { gerarAssuntoContextualizado } from '../services/api';
import ResultActions from '../components/ResultActions';

export interface AssuntoContextualizadoData {
  ano: string;
  componente: string;
  assunto: string;
  interesse: string;
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

const AssuntoContextualizado: React.FC = () => {
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

  const selectStyles = {
    input: {
      backgroundColor: "white",
      color: "black !important",
      border: "1px solid black",
      "&::placeholder": {
        color: "black !important",
      },
      "&:focus": {
        borderColor: "#9167b9",
        boxShadow: "none",
      },
    },
    dropdown: {
      backgroundColor: "white",
      border: "1px solid black",
    },
    item: {
      color: "black !important",
      "&[data-hovered]": {
        backgroundColor: "#e6e6e6",
        color: "black !important",
      },
      "&[data-selected]": {
        backgroundColor: "#f3e9fa",
        color: "black !important",
      },
    },
  };

  const [formData, setFormData] = useState<AssuntoContextualizadoData>({
    ano: '',
    componente: '',
    assunto: '',
    interesse: '',
    contexto: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<string>('');
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [textoEditado, setTextoEditado] = useState<string>('');

  const handleChange = (field: keyof AssuntoContextualizadoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await gerarAssuntoContextualizado(formData);
      if (!res) throw new Error("Nenhum resultado retornado");
      setResultado(res);
      setTextoEditado(res);
      showNotification({ color: 'green', title: 'Sucesso', message: 'Assunto contextualizado gerado!' });
    } catch (error) {
      console.error("Erro ao gerar assunto:", error);
      showNotification({ color: 'red', title: 'Erro', message: 'Falha ao gerar assunto contextualizado' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([resultado], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assunto_contextualizado.txt';
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
      interesse: '',
      contexto: ''
    });
  };

  return (
    <Stack spacing="md" style={{ backgroundColor: "white", color: "black", padding: "1rem" }}>
      <Title order={3} style={{ color: "#9167b9" }}>Gerar Assunto Contextualizado</Title>

      {!resultado && (
        <>
          <Select
            label="Ano / Série"
            placeholder="Selecione o ano"
            data={ANOS_SERIES}
            value={formData.ano}
            onChange={(value: string | null) => handleChange('ano', value ?? '')}
            styles={selectStyles}
          />
          <Select
            label="Componente Curricular"
            placeholder="Selecione o componente"
            data={COMPONENTES}
            value={formData.componente}
            onChange={(value: string | null) => handleChange('componente', value ?? '')}
            styles={selectStyles}
          />
          <TextInput
            label="Assunto (opcional)"
            placeholder="Ex.: Aceleração"
            value={formData.assunto}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('assunto', e.currentTarget.value)
            }
            styles={inputStyles}
          />
          <TextInput
            label="Tema de Interesse (opcional)"
            placeholder="Ex.: Fórmula 1"
            value={formData.interesse}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('interesse', e.currentTarget.value)
            }
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
              Gerar Assunto
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
              label="Assunto Contextualizado Gerado"
              value={resultado}
              autosize
              minRows={6}
              readOnly
              styles={inputStyles}
            />
          ) : (
            <Textarea
              label="Editar Assunto Contextualizado"
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

export default AssuntoContextualizado;
