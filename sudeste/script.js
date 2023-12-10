document.addEventListener('keydown', handleKeyPress);
let sounds = {
    green: new Audio('sons/MICOLEAOD.wav'),
    red: new Audio('sons/ESTADIOMARACANA.wav'),
    yellow: new Audio('sons/SAPO.wav'),
    blue: new Audio('sons/TRANSITO.wav'),
    orange: new Audio('sons/RITMO.wav')
};
let concurrentPlay = false;

function handleKeyPress(event) {
    let circle, sound;
    switch (event.key) {
        case 'ArrowUp':
            circle = document.getElementById('green');
            sound = sounds.green;
            break;
        case 'ArrowDown':
            circle = document.getElementById('red');
            sound = sounds.red;
            break;
        case 'ArrowLeft':
            circle = document.getElementById('yellow');
            sound = sounds.yellow;
            break;
        case 'ArrowRight':
            circle = document.getElementById('blue');
            sound = sounds.blue;
            break;
        case ' ':
            circle = document.getElementById('orange');
            sound = sounds.orange;
            break;
        case 'Enter':
            toggleConcurrentPlay();
            return; // No need to play sound or change size
    }

    if (!concurrentPlay) {
        stopAllSounds();
    }

    if (circle) {
        circle.style.width = '100px';
        circle.style.height = '100px';
        setTimeout(() => {
            circle.style.width = '';
            circle.style.height = '';
        }, 1000);
    }

    if (sound) {
        sound.play();
    }
}

function toggleConcurrentPlay() {
    concurrentPlay = !concurrentPlay;
    if (!concurrentPlay) {
        stopAllSounds();
    }
}

function stopAllSounds() {
    for (let key in sounds) {
        sounds[key].pause();
        sounds[key].currentTime = 0;
    }
}

// Reset circle sizes on key up
document.addEventListener('keyup', () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.width = '';
        circle.style.height = '';
    });
});
