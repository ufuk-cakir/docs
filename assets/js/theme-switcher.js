(() => {
  const themeSwitcher = document.querySelector('#theme-switcher');
  const selected = localStorage.getItem('preferred-theme') ?? 'system';

  themeSwitcher.addEventListener('input', (e) => {
    localStorage.setItem('preferred-theme', e.target.value);
    document.documentElement.setAttribute('data-theme-mode', e.target.value);
    themeSwitcher.setAttribute('data-theme-mode', e.target.value);
  });

  themeSwitcher.querySelector(`option[value="${selected}"]`).selected = 'selected';
  themeSwitcher.setAttribute('data-theme-mode', selected);
})();
