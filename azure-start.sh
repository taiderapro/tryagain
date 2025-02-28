#!/bin/bash

echo "Instalando dependências do Backend..."
cd projeto_integrado/app/backend
npm install

echo "Rodando build do Backend..."
npm run build || echo "Nenhuma build configurada para o backend"

cd ../..

echo "Instalando dependências do Frontend..."
cd projeto_integrado/app/frontend
npm install

echo "Rodando build do Frontend..."
npm run build

echo "Deploy pronto!"
