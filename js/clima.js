// ============================================================
// 🌤️ DÓLAR + CLIMA DE VENEZUELA
// ============================================================

async function cargarClima() {
    try {
        const response = await fetch(VZLA_INFO_URL);
        if (!response.ok) throw new Error('No disponible');
        const data = await response.json();
        
        // Dólar
        const dollarEl = document.getElementById('topDollar');
        if (dollarEl && data.dollar) {
            dollarEl.textContent = '💵 Bs ' + data.dollar;
        }
        
        // Climas
        const weatherEl = document.getElementById('weatherInner');
        if (weatherEl && data.states && data.states.length > 0) {
            let weatherHTML = '';
            data.states.forEach(state => {
                weatherHTML += '🌤️ ' + state.name + ' ' + state.weather + ' • ';
            });
            weatherEl.textContent = weatherHTML + weatherHTML;
        }
    } catch (err) {
        console.log('Error cargando info Venezuela:', err);
        const dollarEl = document.getElementById('topDollar');
        const weatherEl = document.getElementById('weatherInner');
        if (dollarEl) dollarEl.textContent = '💵 Bs —';
        if (weatherEl) weatherEl.textContent = '🌤️ Venezuela —';
    }
}
