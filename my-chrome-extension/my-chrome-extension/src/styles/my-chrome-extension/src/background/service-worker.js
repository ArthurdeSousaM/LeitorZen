// (Atualizado) Service Worker - injeção do modo leitura
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensão Leitor Zen instalada.');
});

chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
  if (msg?.type !== 'ACTIVATE_READER') return;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('Aba ativa não encontrada.');

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleZenReaderOverlay,
      args: [chrome.runtime.getURL('src/styles/reader.css')],
    });

    sendResponse({ status: 'ok' });
  } catch (err) {
    console.error('Falha ao injetar modo leitura:', err);
    sendResponse({ status: 'error', message: String(err) });
  }
  return true;
});

function toggleZenReaderOverlay(cssUrl) {
  const ID = 'zen-reader-overlay';
  const existing = document.getElementById(ID);
  if (existing) { existing.remove(); document.documentElement.style.overflow=''; return; }

  const overlay = document.createElement('div');
  overlay.id = ID;
  overlay.className = 'zen-reader-overlay';

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;

  const container = document.createElement('div');
  container.className = 'zen-reader-content';

  const h1 = document.createElement('h1');
  h1.textContent = document.title || 'Leitura';

  const mainContent = document.querySelector('article, main, [role="main"]') || document.body;
  const clone = document.createElement('div');
  clone.textContent = mainContent.innerText || '';

  container.appendChild(h1);
  container.appendChild(clone);
  overlay.appendChild(container);

  document.head.appendChild(link);
  document.body.appendChild(overlay);
  document.documentElement.style.overflow = 'hidden';

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { overlay.remove(); document.documentElement.style.overflow=''; }
  }, { once: true });
}
