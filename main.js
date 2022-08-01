// (function () {
//     var url = new URL(location.href);
//     if (url.protocol == "https:")
//     {
//         return;
//     }
//     url.protocol = "https:";
//     location.href = url.href;
// })();

(() => {

    
    
    
    var navEl = document.getElementById('theme-nav');
    navEl.addEventListener('click', (e) => {
        if (window.innerWidth <= 600) {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
            } else {
                navEl.style.height = 48 + document.querySelector('#theme-nav .nav-items').clientHeight + 'px'
            }
            navEl.classList.toggle('open')
        } else {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
                navEl.classList.remove('open')
            }
        }
    })
    window.addEventListener('resize', (e) => {
        if (navEl.classList.contains('open')) {
            navEl.style.height = 48 + document.querySelector('#theme-nav .nav-items').clientHeight + 'px'
        }
        if (window.innerWidth > 600) {
            if (navEl.classList.contains('open')) {
                navEl.style.height = ''
                navEl.classList.remove('open')
            }
        }
    })

    // 颜色切换
    const Cookies = new class {
        get(key, fallback) {
            const temp = document.cookie.split('; ').find(row => row.startsWith(key + '='))
            if (temp) {
                return temp.split('=')[1];
            } else {
                return fallback
            }
        }
        set(key, value) {
            document.cookie = key + '=' + value + '; path=' + document.body.getAttribute('data-config-root')
        }
    }


    const ColorScheme = new class {
        constructor() {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { this.updateCurrent(Cookies.get('color-scheme', 'auto')) })
        }
        get() {
            const stored = Cookies.get('color-scheme', 'auto')
            this.updateCurrent(stored)
            return stored
        }
        set(value) {
            bodyEl.setAttribute('data-color-scheme', value)
            Cookies.set('color-scheme', value)
            this.updateCurrent(value)
            return value
        }
        updateCurrent(value) {
            var current = 'light'
            if (value == 'auto') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    current = 'dark'
                }
            } else {
                current = value
            }
            document.body.setAttribute('data-current-color-scheme', current)
        }
    }

    
    if (document.getElementById('theme-color-scheme-toggle')) {
        var bodyEl = document.body
        var themeColorSchemeToggleEl = document.getElementById('theme-color-scheme-toggle')
        var options = themeColorSchemeToggleEl.getElementsByTagName('input')

        if (ColorScheme.get()) {
            bodyEl.setAttribute('data-color-scheme', ColorScheme.get())
        }

        for (const option of options) {
            if (option.value == bodyEl.getAttribute('data-color-scheme')) {
                option.checked = true
            }
            option.addEventListener('change', (ev) => {
                var value = ev.target.value
                ColorScheme.set(value)
                for (const o of options) {
                    if (o.value != value) {
                        o.checked = false
                    }
                }
            })
        }
    }

        
})()