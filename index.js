document.addEventListener('keypress', e => {
    if(e.key === ' ') {
      new Game();
      document.querySelectorAll('.text').forEach(text => text.textContent = '');
      document.querySelector('.modal').style.display = 'none';
    }
  });