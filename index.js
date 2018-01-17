const updateTextLabel = text => {
  let div = document.getElementById('___github_current_file');
  if (!div) {
    div = document.createElement('div');
    div.setAttribute('id', '___github_current_file');
    div.setAttribute('style', 'position: fixed; top: 60px; background: #dbedff; width: 100%; text-align: center; height: 23px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 15px;')
    document.body.appendChild(div);

    document.querySelector('.pr-toolbar-shadow').setAttribute('style', 'top: 83px;');
  }
  div.innerHTML = '<span style="margin-right: 10px;">⤹</span>' + text + '<span style="margin-left: 10px; display: inline-block; transform: scale(-1, 1);">⤹</span>';
};

const removeTextLabel = () => {
  let div = document.getElementById('___github_current_file');
  if (div) {
    document.body.removeChild(div);
    document.querySelector('.pr-toolbar-shadow').removeAttribute('style');
  }
};

const getCurrentlyScrolledFile = () => {
  const toolbarHeight = document.querySelector('.pr-toolbar').getBoundingClientRect().height;
  const currentFile = Array.from(document.querySelectorAll('div.file')).filter(e => e.getBoundingClientRect().y < toolbarHeight).pop()

  if (currentFile) {
    return currentFile.querySelector('.file-header').getAttribute('data-path');
  }
};

let ticking = false;

const handleScrollTick = () => {
  ticking = false;
  const filename = getCurrentlyScrolledFile();
  if (filename) {
    updateTextLabel(filename);
  } else {
    removeTextLabel();
  }
};

window.addEventListener('scroll', e => {
  if (!ticking) {
    ticking = true;
    setTimeout(handleScrollTick, 50);
  }
});
