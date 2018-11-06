import './index.scss';

function insertFontCss() {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = '//haitao.nos.netease.com/af82192c-9c98-4143-8f5f-1e69180c652f.css';

    document.head.appendChild(fontLink);
}
insertFontCss();
