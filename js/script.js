let songs = [];
let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const songTitle = document.getElementById('song-title');
const playPauseButton = document.getElementById('play-pause-button');
const progressBar = document.getElementById('progress-bar');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', handleFiles);

function handleFiles() {
    const files = fileInput.files;
    songs = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        songs.push({ title: file.name, src: url });
    }

    currentSongIndex = 0;
    loadSong(currentSongIndex);
    playSong();
}

function loadSong(songIndex) {
    const song = songs[songIndex];
    audioSource.src = song.src;
    audioPlayer.load();
    songTitle.textContent = song.title;
    isPlaying = false;
    updatePlayPauseButton();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseButton();
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    if (isPlaying) {
        playPauseButton.innerHTML = '&#10074;&#10074;';
    } else {
        playPauseButton.innerHTML = '&#9654;';
    }
}

function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
}

audioPlayer.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

// No initial song load since we wait for user to upload files
