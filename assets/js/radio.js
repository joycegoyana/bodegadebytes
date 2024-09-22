const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackTitle = document.getElementById('trackTitle');
let currentTrackIndex = 0;
let playlist = [];

fetch('/assets/audio/playlists/playlist-lofi.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        if (!data.tracks || !Array.isArray(data.tracks)) {
            throw new Error('Estrutura do JSON inválida');
        }
        playlist = data.tracks;
        loadTrack(currentTrackIndex);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

function loadTrack(index) {
    if (index < 0 || index >= playlist.length) {
        console.error('Índice da faixa fora do intervalo');
        return;
    }
    audioPlayer.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
    audioPlayer.load();
}


playPauseBtn.addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
    } else {
        audioPlayer.pause();
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
    }
});

prevBtn.addEventListener('click', function () {
    currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : playlist.length - 1;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('play');
    playPauseBtn.classList.add('pause');
});

nextBtn.addEventListener('click', function () {
    currentTrackIndex = (currentTrackIndex < playlist.length - 1) ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('play');
    playPauseBtn.classList.add('pause');
});

window.addEventListener('load', function () {
    if (audioPlayer.paused) {
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
    } else {
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
    }
});