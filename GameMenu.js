const marioTheme = document.getElementById('marioTheme');

let executed = false;
function loadMusic() {
  if (!executed) {
    marioTheme.play();
    executed = true;
  }
}

$('body').click(() => {
  loadMusic();
});
