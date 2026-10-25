// CONFIGURE AQUI o número do WhatsApp do salão, com código do país e DDD.
// Exemplo: 5566991234567 (55 + DDD + número, somente dígitos).
const WHATSAPP_NUMBER = '5566999612535'; // TROQUE pelo número real do salão.
const WHATSAPP_SHORT_LINK = 'https://wa.me/message/QBT72Q3KAWCQM1';

const form = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const serviceInput = document.getElementById('service');
const statusMessage = document.getElementById('formStatus');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { serviceInput.value = link.dataset.service; });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    'Olá, Luana Bessani! Gostaria de solicitar um agendamento 💗',
    '',
    `Nome: ${data.get('name')}`,
    `Meu WhatsApp: ${data.get('phone')}`,
    `Serviço: ${data.get('service')}`,
    `Data desejada: ${data.get('date').split('-').reverse().join('/')}`,
    `Período/horário: ${data.get('time')}`,
    data.get('message') ? `Observações: ${data.get('message')}` : '',
    '',
    'Se possível, por favor, confirme a disponibilidade. Obrigado(a)!'
  ].filter(Boolean).join('\n');

  // Quando o número for configurado, abre uma conversa com a mensagem preenchida.
  // Até lá, usa o link curto do WhatsApp que aparece no perfil do salão.
  const configured = /^\d{12,13}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.endsWith('9999999');
  const url = configured
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `${WHATSAPP_SHORT_LINK}?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (!newWindow) window.location.href = url;
  statusMessage.textContent = 'Sua solicitação foi preparada para enviar pelo WhatsApp. O salão confirmará o horário por mensagem.';
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
