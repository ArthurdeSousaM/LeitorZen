document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('activate-reader-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    chrome.runtime.sendMessage({ type: 'ACTIVATE_READER' }, (resp) => {
      console.log('Leitor Zen:', resp?.status || 'ok');
      window.close();
    });
  });
});
