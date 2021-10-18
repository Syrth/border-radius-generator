const preview = document.querySelector('.content__preview'),
  corners = document.querySelectorAll('.content__control--input'),
  popup = document.querySelector('.content__alert'),
  txtarea = document.querySelector('#code');

const applyPreview = {
  'top-left': (value) => preview.style.borderTopLeftRadius = value,
  'top-right': (value) => preview.style.borderTopRightRadius = value,
  'bottom-right': (value) => preview.style.borderBottomRightRadius = value,
  'bottom-left': (value) => preview.style.borderBottomLeftRadius = value
};

corners.forEach(corner => {
  corner.addEventListener('input', () => {
    applyPreview[corner.id](`${validate(corner, corner.value)}%`);
    update();
  });
});

function validate(atr, value) {
  if (value <= 0) {
    atr.value = value != '' ? 0 : '';
    return 0;
  }
  else if (value >= 100) {
    atr.value = 100;
    return 100;
  }
  else return value;
}

function update() {
  let style = window.getComputedStyle(preview);
  let code = [
    `-webkit-border-radius: ${style.getPropertyValue('border-radius')};`,
    `-moz-border-radius: ${style.getPropertyValue('border-radius')};`,
    `border-radius: ${style.getPropertyValue('border-radius')};`
    ];
  txtarea.value = code.join('\n');
}

function copyToClipboard() {
  txtarea.focus();
  txtarea.select();
  document.execCommand('copy');
  if (window.getSelection) {
    if (window.getSelection().empty) { // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) { // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) { // IE?
    document.selection.empty();
  }

  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}