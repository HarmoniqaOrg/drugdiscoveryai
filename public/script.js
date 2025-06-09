const form = document.getElementById('query-form');
const queryInput = document.getElementById('query');
const responseEl = document.getElementById('response');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;

  responseEl.textContent = 'Loading...';
  responseEl.classList.remove('hidden');

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: query })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const data = await res.json();
    responseEl.textContent = data.response || JSON.stringify(data, null, 2);
  } catch (err) {
    responseEl.textContent = 'Error: ' + err.message;
  }
});
