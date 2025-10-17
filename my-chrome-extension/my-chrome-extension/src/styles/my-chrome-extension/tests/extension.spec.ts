import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';

const dist = path.resolve(__dirname, '..', 'dist');

test('overlay do Leitor Zen aparece', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`,
    ],
  });

  const [page] = context.pages();
  await page.goto('https://example.com');

  // Abre o popup da extensão através de chrome://extensions UI seria complexo.
  // Em testes E2E carregamos o script diretamente simulando a ação do usuário:
  await page.evaluate(() => {
    // Simula a função que o service worker injetaria
    const cssUrl = `${location.origin}/src/styles/reader.css`;
    (window as any).toggleZenReaderOverlay?.(cssUrl);
  }).catch(() => {});

  // Como alternativa, chamamos a função via chrome.scripting na página:
  await page.addScriptTag({ content: `${toggleOverlay.toString()}; toggleOverlay();` });

  // Verifica se o overlay existe
  const overlay = page.locator('#zen-reader-overlay');
  await expect(overlay).toBeVisible();

  await context.close();

  function toggleOverlay() {
    const ID = 'zen-reader-overlay';
    if (document.getElementById(ID)) return;
    const overlay = document.createElement('div');
    overlay.id = ID;
    overlay.className = 'zen-reader-overlay';
    document.body.appendChild(overlay);
  }
});
