// lang-config.js

// 言語を切り替える共通関数
function setLanguage(lang) {
    // 1. 設定をブラウザに保存 (ページをまたいでも消えない)
    localStorage.setItem('preferredLang', lang);

    // 2. 表示を切り替える
    const jpElements = document.querySelectorAll('.lang-jp');
    const enElements = document.querySelectorAll('.lang-en');

    if (lang === 'en') {
        jpElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = 'inline-block');
    } else {
        jpElements.forEach(el => el.style.display = 'inline-block');
        enElements.forEach(el => el.style.display = 'none');
    }

    // 3. メニューリンクの文字切り替え
    const links = document.querySelectorAll('.menu-link');
    links.forEach(link => {
        const text = link.getAttribute(`data-${lang}`);
        if (text) link.textContent = text;
    });
}

// 初期化処理（ページ読み込み時に実行）
function initLanguage() {
    // A. 保存された設定を確認
    const savedLang = localStorage.getItem('preferredLang');
    
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        // B. 保存されていなければブラウザ言語を確認
        const browserLang = (window.navigator.language || window.navigator.userLanguage || 'ja').slice(0, 2).toLowerCase();
        if (browserLang !== 'ja') {
            setLanguage('en');
        } else {
            setLanguage('jp');
        }
    }
}

// 各ページでこの関数を呼び出す
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    
    // 言語切り替えボタンがあればイベントを設定
    const langBtn = document.getElementById('langSwitch');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const current = localStorage.getItem('preferredLang') || 'jp';
            const next = current === 'jp' ? 'en' : 'jp';
            setLanguage(next);
        });
    }
});
