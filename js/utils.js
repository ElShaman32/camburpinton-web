// ============================================================
// 🕐 UTILIDADES: HORA VENEZUELA + HISTORIAL + API NOW PLAYING
// ============================================================

let apiFailCount = 0;
let nowPlayingInterval = null;

// Reloj de Venezuela
function iniciarReloj() {
    function actualizar() {
        const el = document.getElementById('venezuelaTime');
        if (el) {
            el.textContent = new Date().toLocaleTimeString('es-VE', {
                timeZone: 'America/Caracas',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        }
    }
    actualizar();
    setInterval(actualizar, 1000);
}

// Now Playing desde AzuraCast
async function fetchNowPlaying() {
    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': 'Basic ' + btoa(API_KEY) }
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        
        apiFailCount = 0;
        setOnlineMode();
        
        if (data.now_playing && data.now_playing.song) {
            if (npTitle) npTitle.textContent = data.now_playing.song.title || 'Música en vivo';
            if (npArtist) npArtist.textContent = data.now_playing.song.artist || 'Cambur Pintón';
        }
        
        // Historial
        if (data.song_history && data.song_history.length > 0) {
            const historyList = document.getElementById('historyList');
            if (historyList) {
                historyList.innerHTML = data.song_history.slice(0, 3).map((entry, index) => {
                    const song = entry.song;
                    const minutesAgo = Math.floor((Date.now() / 1000 - entry.played_at) / 60);
                    let timeText = minutesAgo < 1 ? 'Ahora' : minutesAgo === 1 ? 'Hace 1 min' : minutesAgo < 60 ? `Hace ${minutesAgo} min` : 'Hace +1 hora';
                    return `<div class="history-item-mini">
                        <div class="history-song-mini">${index === 0 ? '🍌' : '🎵'} ${song.title || 'Canción'}</div>
                        <div class="history-artist-mini">${song.artist || 'Artista'}</div>
                        <div class="history-time-mini">${timeText}</div>
                    </div>`;
                }).join('');
            }
        }
    } catch (err) {
        console.error('Error API:', err);
        apiFailCount++;
        if (apiFailCount >= 3) setOfflineMode();
    }
}

// Iniciar ahora
nowPlayingInterval = setInterval(fetchNowPlaying, 15000);
fetchNowPlaying();
