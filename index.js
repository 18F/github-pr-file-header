const pinCurrentFileHeader = () => {
  const toolbarHeight = document.querySelector('.pr-toolbar').getBoundingClientRect().height;
  let yOffset = toolbarHeight;

  const previousFile = document.querySelector('div.file-header[data-current-pinned-header]');
  if (previousFile) {
    yOffset += previousFile.getBoundingClientRect().height;
    previousFile.removeAttribute('data-current-pinned-header');
    previousFile.removeAttribute('style');
  }

  const currentFile = Array.from(document.querySelectorAll('div.file')).filter(e => e.getBoundingClientRect().y < yOffset).pop()

  if (currentFile) {
    const header = currentFile.querySelector('.file-header')
    header.setAttribute('data-current-pinned-header');
    header.setAttribute('style', 'position: fixed; top: 60px; left: ' + (currentFile.getBoundingClientRect().x) + 'px; width: ' + currentFile.getBoundingClientRect().width + 'px; border: 1px solid #ddd; z-index: 100;');
    return header.getAttribute('data-path');
  }
};

let ticking = false;

const handleScrollTick = () => {
  ticking = false;
  pinCurrentFileHeader();
};

Array.from(document.querySelectorAll('a.btn[aria-label="View the whole file"]')).forEach(button => button.innerText = 'View whole file');

window.addEventListener('scroll', e => {
  if (!ticking) {
    ticking = true;
    setTimeout(handleScrollTick, 100);
  }
});
