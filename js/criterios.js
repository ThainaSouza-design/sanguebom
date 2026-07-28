const accordions=document.querySelectorAll('.accordionContent');

accordions.forEach(accordion =>{
  accordion.addEventListener('click', () => {
    const descricao = accordion.querySelector('.descricao');
    const botao = accordion.querySelector('.accordionHeader');
    const aberto = descricao.classList.toggle('active');
    botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  })
})