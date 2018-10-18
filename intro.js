const pacmanTheme = document.getElementById('pacmanTheme');

let executed = false;
function loadMusic() {
  if (!executed) {
    pacmanTheme.play();
    executed = true;
  }
}

$('body').click(() => {
  loadMusic();
});
