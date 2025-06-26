document.addEventListener('DOMContentLoaded', function () {
  const conversationsSidebar = document.getElementById('conversationsSidebar');
  const conversationList = document.getElementById('conversationList');
  const chatContainer = document.getElementById('chatContainer');
  const chatMessages = document.getElementById('chatMessages');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatInputContainer = document.getElementById('chatInputContainer');
  const currentChatTitle = document.getElementById('currentChatTitle');
  const backToConversations = document.getElementById('backToConversations');

  let currentChatId = null;
  let messages = {};

  // Dados simulados das conversas
  const conversations = [
    {
      id: 1,
      name: "João Silva",
      lastMessage: "Gostei muito do vestido que você anunciou.",
      time: "10:30",
      unread: 2
    },
    {
      id: 2,
      name: "Maria Oliveira",
      lastMessage: "Qual o valor do aluguel por 3 dias?",
      time: "09:15",
      unread: 0
    },
    {
      id: 3,
      name: "Carlos Souza",
      lastMessage: "Obrigado, vou pensar e te aviso!",
      time: "Ontem",
      unread: 0
    },
    {
      id: 4,
      name: "Ana Santos",
      lastMessage: "Você tem mais fotos do vestido?",
      time: "Ontem",
      unread: 1
    }
  ];

  // Dados simulados das mensagens
  const messagesData = {
    1: [
      {
        sender: "João Silva",
        content: "Olá! Gostei muito do vestido que você anunciou.",
        time: "10:30",
        isMe: false
      },
      {
        sender: "Você",
        content: "Oi João! Que bom que gostou. Ele está disponível para aluguel na próxima semana.",
        time: "10:32",
        isMe: true
      }
    ],
    2: [
      {
        sender: "Maria Oliveira",
        content: "Qual o valor do aluguel por 3 dias?",
        time: "09:15",
        isMe: false
      }
    ],
    3: [
      {
        sender: "Você",
        content: "O paletó está disponível para o final de semana?",
        time: "16:45",
        isMe: true
      },
      {
        sender: "Carlos Souza",
        content: "Obrigado, vou pensar e te aviso!",
        time: "17:20",
        isMe: false
      }
    ],
    4: [
      {
        sender: "Ana Santos",
        content: "Você tem mais fotos do vestido?",
        time: "14:10",
        isMe: false
      }
    ]
  };

  // Carregar lista de conversas
  function loadConversations() {
    conversationList.innerHTML = '';

    conversations.forEach(conv => {
      const convElement = document.createElement('div');
      convElement.className = 'conversation';
      convElement.dataset.id = conv.id;

      convElement.innerHTML = `
                        <div class="conversation-name">
                            ${conv.name}
                            <span class="conversation-time">${conv.time}</span>
                        </div>
                        <div class="conversation-preview">${conv.lastMessage}</div>
                        ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
                    `;

      convElement.addEventListener('click', function () {
        selectConversation(conv.id, conv.name);
      });

      conversationList.appendChild(convElement);
    });
  }

  // Selecionar uma conversa
  function selectConversation(id, name) {
    currentChatId = id;
    currentChatTitle.textContent = name;
    chatInputContainer.style.display = 'flex';

    // Carregar mensagens da conversa selecionada
    loadMessages(id);

    // Em um app real, aqui você marcaria as mensagens como lidas

    // Para mobile, esconder a lista e mostrar o chat
    if (window.innerWidth <= 768) {
      conversationsSidebar.classList.remove('active');
      chatContainer.classList.add('active');
    }
  }

  // Carregar mensagens de uma conversa
  function loadMessages(conversationId) {
    chatMessages.innerHTML = '';

    if (messagesData[conversationId]) {
      messagesData[conversationId].forEach(msg => {
        addMessageToChat(msg.sender, msg.content, msg.time, msg.isMe);
      });
    } else {
      messagesData[conversationId] = [];
    }

    scrollToBottom();
  }

  // Adicionar nova mensagem ao chat
  function addMessageToChat(sender, content, time, isMe) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isMe ? 'sender' : 'receiver'} new-message`;

    messageDiv.innerHTML = `
                    <div class="message-content">${content}</div>
                    <div class="message-info">
                        ${!isMe ? `<span class="message-sender">${sender}</span>` : ''}
                        <span class="message-time">${time}</span>
                    </div>
                `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
  }

  // Rolagem para o final do chat
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Enviar mensagem
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '' || !currentChatId) return;

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // Adicionar mensagem ao chat
    addMessageToChat('Você', message, timeString, true);

    // Adicionar mensagem aos dados (em um app real, seria uma chamada AJAX)
    messagesData[currentChatId].push({
      sender: 'Você',
      content: message,
      time: timeString,
      isMe: true
    });

    // Atualizar última mensagem na lista de conversas
    updateLastMessage(currentChatId, message, timeString);

    // Limpar campo de input
    messageInput.value = '';
  }

  // Atualizar última mensagem na lista de conversas
  function updateLastMessage(conversationId, message, time) {
    const conversationElements = document.querySelectorAll('.conversation');

    conversationElements.forEach(element => {
      if (element.dataset.id == conversationId) {
        const preview = element.querySelector('.conversation-preview');
        const timeElement = element.querySelector('.conversation-time');

        preview.textContent = message.length > 30 ? message.substring(0, 30) + '...' : message;
        timeElement.textContent = time;

        // Mover conversa para o topo
        element.parentNode.insertBefore(element, element.parentNode.firstChild);
      }
    });
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);

  messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Botão para voltar para a lista de conversas (mobile)
  backToConversations.addEventListener('click', function () {
    conversationsSidebar.classList.add('active');
    chatContainer.classList.remove('active');
  });

  // Verificar tamanho da tela
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      conversationsSidebar.classList.add('active');
      chatContainer.classList.remove('active');
      backToConversations.style.display = 'block';
    } else {
      conversationsSidebar.classList.remove('active');
      chatContainer.classList.add('active');
      backToConversations.style.display = 'none';
    }
  }

  // Carregar dados iniciais
  loadConversations();
  checkScreenSize();

  // Verificar mudanças no tamanho da tela
  window.addEventListener('resize', checkScreenSize);
});

const exitChatBtn = document.getElementById('exitChatBtn');

exitChatBtn.addEventListener('click', function () {
  window.history.back();
});
