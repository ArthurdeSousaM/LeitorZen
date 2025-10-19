# Leitor Zen (MV3) — pacote pronto

Este pacote já vem com:
- Estrutura `src/` conforme o manifest
- Script de build que gera `dist/` e `dist/extension.zip`
- Teste E2E com Playwright (Chromium)
- Dockerfile + docker-compose
- GitHub Actions publicando artefatos (relatório HTML e `.zip`)

## Como usar
1. Publique este repositório no GitHub (branch `main`).
2. (Opcional) Rodar local sem instalar nada: use Docker
   ```bash
   docker compose build
   docker compose run --rm e2e
   ```
3. No GitHub, veja a aba **Actions**: baixe os artefatos
   - `playwright-report` (HTML)
   - `extension-zip` (`dist/extension.zip`)

### Desenvolvimento local 
```bash
npm i
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

---

## Estrutura
```
my-chrome-extension/
├─ src/
│  ├─ popup/ (popup.html/css/js)
│  ├─ background/service-worker.js
│  └─ styles/reader.css
├─ scripts/build-extension.mjs
├─ tests/(playwright)
├─ Dockerfile
├─ docker-compose.yml
├─ .github/workflows/ci.yml
├─ package.json
└─ manifest.json
```


---

## README original do usuário

# Leitor Zen - Extensão para Chrome (MV3)

Projeto desenvolvido para o Bootcamp II, focado na criação de uma extensão para Google Chrome com Manifest V3.

## Descrição

A "Leitor Zen" é uma extensão simples que remove todas as distrações visuais (propagandas, menus, sidebars) de uma página de artigo, proporcionando uma experiência de leitura limpa e focada.

## Instalação (Modo Desenvolvedor)

1.  Baixe a última versão da extensão a partir da [página de Releases](https://github.com/<seu-usuario>/<seu-repositorio>/releases).
2.  Descompacte o arquivo `.zip` em uma pasta no seu computador.
3.  Abra o Google Chrome e navegue até `chrome://extensions`.
4.  Ative o "Modo de desenvolvedor" no canto superior direito.
5.  Clique em "Carregar sem compactação" e selecione a pasta que você acabou de descompactar.
6.  A extensão estará pronta para uso!

## Como Usar

1.  Navegue até uma página com um artigo ou texto longo que você deseja ler.
2.  Clique no ícone da extensão "Leitor Zen" na barra de ferramentas do Chrome.
3.  No popup que aparecer, clique no botão "Ativar Modo Leitura".
4.  A página será substituída por uma visualização limpa e legível do conteúdo.
5.  Para sair do modo de leitura, simplesmente pressione a tecla **`Esc`**.

## Permissões

Esta extensão requer as seguintes permissões:
* `activeTab`: Acesso temporário à aba ativa para poder modificar seu conteúdo.
* `scripting`: Permissão para injetar o script que limpa a página.
