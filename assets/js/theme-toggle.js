document.addEventListener('DOMContentLoaded', () => {
    // Theme Handling logic
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = '<i class="bi bi-sun"></i>';
    const moonIcon = '<i class="bi bi-moon-stars"></i>';
    
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) updateToggleIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateToggleIcon(targetTheme);
        });
    }
    
    function updateToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }

    // RTL Handling logic
    const rtlToggle = document.querySelector('.rtl-toggle');
    const currentRTL = localStorage.getItem('rtl') === 'true';
    
    if (currentRTL) {
        document.body.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRTL = document.body.getAttribute('dir') === 'rtl';
            if (isRTL) {
                document.body.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
            } else {
                document.body.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
        });
    }
});
