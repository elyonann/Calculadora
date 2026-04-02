# Visualizar o site do mapa de câmeras

Este projeto é um site estático (HTML + CSS + JavaScript). Não precisa instalar dependências.

## Opção 1 (mais simples): abrir direto no navegador
1. Entre na pasta do projeto:
   ```bash
   cd /workspace/Calculadora
   ```
2. Abra o arquivo `index.html` com duplo clique.

> Em alguns navegadores, abrir arquivo local pode limitar alguns recursos. Se isso acontecer, use a Opção 2.

## Opção 2 (recomendada): subir um servidor local
1. No terminal, entre na pasta do projeto:
   ```bash
   cd /workspace/Calculadora
   ```
2. Rode:
   ```bash
   python3 -m http.server 8000
   ```
3. Abra no navegador:
   ```
   http://localhost:8000/index.html
   ```

## Como usar a tela
1. **Planta da empresa**: selecione a imagem da planta.
2. **Nome da câmera**: escreva um nome (ex.: "Portaria").
3. **Foto da câmera**: selecione a foto da câmera.
4. Clique em **Adicionar câmera**.
5. Clique no ponto da planta onde a câmera está.
6. Clique no ícone 📷 criado para abrir a foto e usar zoom (+ / - / Resetar).
7. Use **Limpar câmeras** para remover todos os marcadores.

## Observação importante
- O sistema **não é em tempo real**: ele mostra somente as fotos que você escolher manualmente.
