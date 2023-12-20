document.addEventListener('keydown', handleKeyPress);
let sounds = {
    green: new Audio('sons/MICOLEAOD.wav'),
    red: new Audio('sons/ESTADIOMARACANA.wav'),
    yellow: new Audio('sons/SAPO.wav'),
    blue: new Audio('sons/TRANSITO.wav'),
    orange: new Audio('sons/RITMO.wav'),
    notado: new Audio('sons/notado.mp3'),
    re: new Audio('sons/re.mp3'),
    mi: new Audio('sons/mi.mp3'),
    fa: new Audio('sons/fa.mp3'),
    sol: new Audio('sons/sol.mp3')
};
let concurrentPlay = false;

function handleKeyPress(event) {
    let circle, sound, additionalSound;
    switch (event.key) {
        case 'ArrowUp':
            circle = document.getElementById('green');
            additionalSound = sounds.notado;
            sound = sounds.green;
            break;
        case 'ArrowDown':
            circle = document.getElementById('red');
            additionalSound = sounds.re;
            sound = sounds.red;
            break;
        case 'ArrowLeft':
            circle = document.getElementById('yellow');
            additionalSound = sounds.mi;
            sound = sounds.yellow;
            break;
        case 'ArrowRight':
            circle = document.getElementById('blue');
            additionalSound = sounds.fa;
            sound = sounds.blue;
            break;
        case ' ':
            circle = document.getElementById('orange');
            additionalSound = sounds.sol;
            sound = sounds.orange;
            break;
        case 'Enter':
            toggleConcurrentPlay();
            return; // No need to play sound or change size
    }
    playAdditionalSound(circle, additionalSound, sound);
}

function playAdditionalSound(circle, additionalSound, mainSound) {
    if (!concurrentPlay) {
        stopAllSounds();
    }

    if (additionalSound) {
        additionalSound.play();
        setTimeout(() => {
            playSoundAndAnimate(circle, mainSound);
        }, 1000); // Ajuste esse tempo de acordo com a duração de cada som adicional
    } else {
        playSoundAndAnimate(circle, mainSound);
    }
}

function playSoundAndAnimate(circle, sound) {
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

// Add click event listeners to circles
document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', () => {
        let sound = sounds[circle.id];
        playSoundAndAnimate(circle, sound);
    });
});
