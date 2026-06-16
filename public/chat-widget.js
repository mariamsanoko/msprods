(() => {
  const STORAGE_KEY = 'msprods-airtable-brain-session';
  const API_URL = window.MSPRODS_CHAT_API_URL || 'https://ms-brain.msprods.eu/api/chat';
  let UNAVAILABLE_MESSAGE = 'Désolé, le conseiller IA est indisponible pour le moment. Prochaine étape : laisse ton email ou réessaie dans quelques instants.';

  if (window.MSPRODS_CHAT_UNAVAILABLE_MESSAGE) {
    UNAVAILABLE_MESSAGE = window.MSPRODS_CHAT_UNAVAILABLE_MESSAGE;
  }
  UNAVAILABLE_MESSAGE = 'Désolé, le conseiller IA est indisponible pour le moment. Prochaine étape : laisse ton email ou réessaie dans quelques instants.'; // User-friendly message for API errors
  const quickPrompts = {
    Formations: 'Quelles formations MS Prods correspondent à mon profil ?',
    Prix: 'Quels sont les prix disponibles pour les formations ?',
    'Parcours-recommandé': 'Peux-tu me recommander un parcours selon mon objectif ?',
    'Contact': 'Je souhaite être recontacté(e) par un conseiller.'
  };

  const state = {
    history: loadHistory(),
    isLoading: false
  };

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').slice(-12);
    } catch {
      return [];
    }
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history.slice(-12)));
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function renderMessage(container, role, content) {
    const message = createElement('div', `ms-brain-message ${role}`);
    message.textContent = content;
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
    return message;
  }

  function renderTyping(container) {
    const wrapper = createElement('div', 'ms-brain-message assistant');
    const typing = createElement('div', 'ms-brain-typing');
    typing.setAttribute('aria-label', 'Réponse en cours');
    typing.innerHTML = '<span></span><span></span><span></span>';
    wrapper.appendChild(typing);
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
    return wrapper;
  }

  async function parseChatResponse(response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Erreur chatbot ${response.status}`);
      return data;
    }

    const body = await response.text();
    const responseType = body.trim().startsWith('<') ? 'HTML' : 'non JSON';
    throw new Error(`Réponse ${responseType} reçue depuis ${API_URL}. Vérifie que cette URL pointe vers le backend /chat.`);
  }

  async function sendMessage(message, messages, input) {
    const content = message.trim();
    if (!content || state.isLoading) return;

    state.isLoading = true;
    input.value = '';
    renderMessage(messages, 'user', content);
    state.history.push({ role: 'user', content });
    saveHistory();
    const typing = renderTyping(messages);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: state.history.slice(-8) })
      });

      const data = await parseChatResponse(response);

      typing.remove();
      const answer = data.answer || 'Je n’ai pas trouvé assez d’informations dans Airtable. Quel est ton objectif principal ?';
      renderMessage(messages, 'assistant', answer);
      state.history.push({ role: 'assistant', content: answer });
      saveHistory();
    } catch (error) {
      typing.remove();
      console.error('MS Prods chat error:', error);
      renderMessage(messages, 'assistant', UNAVAILABLE_MESSAGE);
    } finally {
      state.isLoading = false;
      input.focus();
    }
  }

  function initWidget() {
    if (document.querySelector('.ms-brain-launcher')) return;

    const launcher = createElement('button', 'ms-brain-launcher', '💬 MS Prods Brain');
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Ouvrir le chatbot MS Prods Airtable Brain');

    const panel = createElement('section', 'ms-brain-panel');
    panel.setAttribute('aria-label', 'MS Prods Airtable Brain');
    panel.innerHTML = `
      <header class="ms-brain-header">
        <div class="ms-brain-title">
          <strong>MS Prods Airtable Brain</strong>
          <span>Conseiller formations, IA & NoCode</span>
        </div>
        <button class="ms-brain-close" type="button" aria-label="Fermer le chatbot">×</button>
      </header>
      <div class="ms-brain-messages" aria-live="polite"></div>
      <div>
        <div class="ms-brain-actions"></div>
        <form class="ms-brain-form">
          <input class="ms-brain-input" name="message" autocomplete="off" placeholder="Pose ta question formation..." aria-label="Message" />
          <button class="ms-brain-send" type="submit" aria-label="Envoyer">➜</button>
          <small class="ms-brain-disclaimer">Réponses basées sur Airtable. Indique ton email pour être recontacté.</small>
        </form>
      </div>
    `;

    const messages = panel.querySelector('.ms-brain-messages');
    const input = panel.querySelector('.ms-brain-input');
    const form = panel.querySelector('.ms-brain-form');
    const actions = panel.querySelector('.ms-brain-actions');

    if (state.history.length) {
      state.history.forEach((item) => renderMessage(messages, item.role, item.content));
    } else {
      renderMessage(messages, 'assistant', 'Bonjour 👋 Je suis MS Prods Airtable Brain. Dis-moi ton objectif, ton niveau et ton budget : je te recommande le meilleur parcours disponible dans notre base Airtable.');
    }

    Object.entries(quickPrompts).forEach(([label, prompt]) => {
      const chip = createElement('button', 'ms-brain-chip', label);
      chip.type = 'button';
      chip.addEventListener('click', () => sendMessage(prompt, messages, input));
      actions.appendChild(chip);
    });

    launcher.addEventListener('click', () => {
      panel.classList.toggle('is-open');
      if (panel.classList.contains('is-open')) input.focus();
    });

    panel.querySelector('.ms-brain-close').addEventListener('click', () => {
      panel.classList.remove('is-open');
      launcher.focus();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      sendMessage(input.value, messages, input);
    });

    document.body.append(panel, launcher);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
