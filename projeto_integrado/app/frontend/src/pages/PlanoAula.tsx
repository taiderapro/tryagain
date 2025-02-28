import React, { useState } from 'react';
import { Button, Group, NumberInput, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { gerarPlanoAula } from '../services/api';
import ResultActions from '../components/ResultActions';

export interface PlanoAulaData {
  ano: string;
  componente: string;
  assunto: string;
  duracao: number;
  metodologia: string;
  caracteristicas: string;
  contexto: string;
}

const PlanoAula: React.FC = () => {
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

  const [formData, setFormData] = useState<PlanoAulaData>({
    ano: '',
    componente: '',
    assunto: '',
    duracao: 50,
    metodologia: '',
    caracteristicas: '',
    contexto: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<string>('');
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [textoEditado, setTextoEditado] = useState<string>('');

  const handleChange = (field: keyof PlanoAulaData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { ano, componente, assunto, duracao, metodologia, caracteristicas, contexto } = formData;
    const res = await gerarPlanoAula({
      ano,
      componente,
      assunto,
      duracao,
      metodologia,
      caracteristicas,
      contexto,
    });
    setResultado(res);
  };

  const handleDownload = () => {
    const blob = new Blob([resultado], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plano_de_aula.txt';
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
  const handleNovoPlano = () => {
    setResultado('');
    setTextoEditado('');
    setModoEdicao(false);
    setFormData({
      ano: '',
      componente: '',
      assunto: '',
      duracao: 50,
      metodologia: '',
      caracteristicas: '',
      contexto: ''
    });
  };

  return (
    <Stack spacing="md" style={{ backgroundColor: "white", color: "black", padding: "1rem" }}>
      <Title order={3} style={{ color: "#9167b9" }}>Gerar Plano de Aula</Title>

      {!resultado && (
        <>
          <Select
            label="Ano / Série"
            placeholder="Selecione o ano"
            data={["EF - 1º Ano", "EF - 2º Ano", "EF - 3º Ano"]}
            value={formData.ano}
            onChange={(value: string | null) => handleChange('ano', value ?? '')}
            styles={inputStyles}
          />
          <Select
            label="Componente Curricular"
            placeholder="Selecione o componente"
            data={["Matemática", "Português", "Ciências"]}
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
          <NumberInput
            label="Duração da aula (min)"
            value={formData.duracao}
            onChange={(value: number | null) =>
              handleChange('duracao', value ?? 50)
            }
            min={10}
            max={180}
            styles={inputStyles}
          />
          <TextInput
            label="Metodologia"
            placeholder="Ex.: Expositiva, Interativa"
            value={formData.metodologia}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('metodologia', e.currentTarget.value)
            }
            styles={inputStyles}
          />
          <Textarea
            label="Características da Turma (opcional)"
            value={formData.caracteristicas}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange('caracteristicas', e.currentTarget.value)
            }
            styles={inputStyles}
          />
          <Textarea
            label="Contexto (opcional)"
            value={formData.contexto}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange('contexto', e.currentTarget.value)
            }
            styles={inputStyles}
          />

          <Group position="right">
            <Button onClick={handleSubmit} loading={loading} color="violet">
              Gerar Plano
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
            onNew={handleNovoPlano}
            onSaveEdit={handleSalvarEdicao}
            onCancelEdit={() => setModoEdicao(false)}
            groupPosition="right"
          />

          {!modoEdicao ? (
            <Textarea
              label="Plano de Aula Gerado"
              value={resultado}
              autosize
              minRows={6}
              readOnly
              styles={inputStyles}
            />
          ) : (
            <Textarea
              label="Editar Plano de Aula"
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

export default PlanoAula;
