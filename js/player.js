// ============================================================
// 🎧 REPRODUCTOR CAMBUR DJ
// ============================================================

let audio = null;
let isPlaying = false;
let ecualizadorInterval = null;
let titleInterval = null;
let dotVisible = true;

const playBtn = document.getElementById('playBtn');
const playerBar = document.getElementById('playerBar');
const npTitle = document.getElementById('npTitle');
const npArtist = document.getElementById('npArtist');
const liveText = document.getElementById('liveText');
const volumeSlider = document.getElementById('volumeSlider');
const djDisco = document.getElementById('djDisco');
const djLuces = document.getElementById('djLuces');
const djCambur = document.getElementById('djCambur');
const pageTitle = document.getElementById('pageTitle');

function togglePlay() {
    isPlaying ? pauseAudio() : playAudio();
}

function playAudio() {
    if (!audio) {
        audio = new Audio(STREAM_URL);
        audio.volume = volumeSlider.value / 100;
        audio.preload = 'auto';
        audio.onerror = () => {
            isPlaying = false;
            updateBotonPlay();
            detenerEcualizador();
            detenerEfectoTitulo();
            detenerDjVisual();
        };
    }
    audio.play().then(() => {
        isPlaying = true;
        updateBotonPlay();
        iniciarEcualizador();
        iniciarEfectoTitulo();
        iniciarDjVisual();
    }).catch(() => {
        isPlaying = false;
        updateBotonPlay();
    });
}

function pauseAudio() {
    if (audio) {
        audio.pause();
        audio.src = '';
        audio = null;
    }
    isPlaying = false;
    updateBotonPlay();
    detenerEcualizador();
    detenerEfectoTitulo();
    detenerDjVisual();
}

function updateBotonPlay() {
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    playBtn.classList.toggle('playing', isPlaying);
}

function cambiarVolumen(val) {
    if (audio) audio.volume = val / 100;
}

function ajustarVolumen(cambio) {
    let nuevo = parseInt(volumeSlider.value) + (cambio * 100);
    nuevo = Math.max(0, Math.min(100, nuevo));
    volumeSlider.value = nuevo;
    if (audio) audio.volume = nuevo / 100;
}

// Efectos visuales DJ
function iniciarDjVisual() {
    djDisco.classList.add('girando');
    djLuces.classList.add('activo');
    djCambur.classList.add('bailando');
}

function detenerDjVisual() {
    djDisco.classList.remove('girando');
    djLuces.classList.remove('activo');
    djCambur.classList.remove('bailando');
}

// Ecualizador
function iniciarEcualizador() {
    detenerEcualizador();
    ecualizadorInterval = setInterval(() => {
        document.querySelectorAll('.eq-bar').forEach(bar => {
            bar.style.height = (Math.random() * 22 + 3) + 'px';
        });
    }, 100);
}

function detenerEcualizador() {
    if (ecualizadorInterval) {
        clearInterval(ecualizadorInterval);
        ecualizadorInterval = null;
    }
    document.querySelectorAll('.eq-bar').forEach(bar => bar.style.height = '5px');
}

// Efecto título
function iniciarEfectoTitulo() {
    detenerEfectoTitulo();
    titleInterval = setInterval(() => {
        dotVisible = !dotVisible;
        if (pageTitle) pageTitle.textContent = dotVisible ? '🟢 EN VIVO - Cambur Pintón' : '🍌 Cambur Pintón';
    }, 1500);
}

function detenerEfectoTitulo() {
    if (titleInterval) {
        clearInterval(titleInterval);
        titleInterval = null;
    }
    if (pageTitle) pageTitle.textContent = '🍌 Cambur Pintón';
}

// Modo offline
function setOfflineMode() {
    playerBar.classList.add('offline');
    if (liveText) liveText.textContent = 'SIN LUZ';
    if (npTitle) npTitle.textContent = '🔌 Modo ahorro energético';
    if (npArtist) npArtist.textContent = 'Forzado... ¡Volvemos en un rato! 🕯️';
    detenerEcualizador();
    detenerDjVisual();
}

function setOnlineMode() {
    playerBar.classList.remove('offline');
    if (liveText) liveText.textContent = 'EN VIVO';
}

// Pedir canción
function abrirPedirCancion() {
    document.getElementById('requestFrame').src = REQUEST_URL;
    document.getElementById('requestModal').classList.add('active');
}

function cerrarPedirCancion() {
    document.getElementById('requestModal').classList.remove('active');
    document.getElementById('requestFrame').src = '';
}

document.getElementById('requestModal').addEventListener('click', function(e) {
    if (e.target === this) cerrarPedirCancion();
});
