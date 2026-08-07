// ============================================================
// 📰 NOTICIAS PINTONAS + TALENTOS + SALUDOS
// ============================================================

async function cargarNoticias() {
    const newsContainer = document.getElementById('newsContainer');
    const bottomRow = document.getElementById('bottomRow');
    
    try {
        const response = await fetch(NEWS_URL);
        if (!response.ok) throw new Error('No disponible');
        const data = await response.json();
        
        if (data && data.noticias && data.noticias.length >= 4) {
            const fecha = data.actualizado || 'Reciente';
            
            // 3 noticias principales
            const noticias = data.noticias.slice(0, 3);
            let html = `<div class="news-update-time" style="grid-column:1/-1;">📅 ${fecha}</div>`;
            noticias.forEach(item => {
                html += `
                    <div class="news-card">
                        <div class="news-category">${item.categoria}</div>
                        <div class="news-title">${item.titulo}</div>
                        <div class="news-excerpt">${item.resumen}</div>
                    </div>`;
            });
            newsContainer.innerHTML = html;
            
            // Mensaje motivacional
            const motivacional = data.noticias[3];
            const motivacionalHTML = `
                <div class="news-card">
                    <div class="news-category">${motivacional.categoria}</div>
                    <div class="news-title">${motivacional.titulo}</div>
                    <div class="news-excerpt">${motivacional.resumen}</div>
                </div>`;
            
            cargarTalentos(motivacionalHTML, bottomRow);
        }
    } catch (err) {
        console.log('Noticias no disponibles.');
        cargarTalentos(null, bottomRow, true);
    }
}

async function cargarTalentos(motivacionalHTML, container, soloTalentos = false) {
    try {
        const response = await fetch(TALENTOS_URL);
        if (!response.ok) throw new Error('No disponible');
        const talentos = await response.json();
        
        let html = motivacionalHTML || (soloTalentos ? 
            '<div class="news-card"><div class="news-category">🌞 Mensaje del día</div><div class="news-title">¡Bienvenido a Cambur Pintón!</div><div class="news-excerpt">La radio más chevere de Venezuela 🍌</div></div>' 
            : '');
        
        if (talentos && talentos.length >= 2) {
            talentos.slice(0, 2).forEach(t => {
                html += `
                    <div class="news-card">
                        <div class="news-category">🎬 Talento Pintón</div>
                        <div class="news-title">${t.nombre || 'Talento'}</div>
                        <div class="video-wrapper">
                            <iframe src="https://www.youtube.com/embed/${t.video_id}" allowfullscreen></iframe>
                        </div>
                        <div class="news-excerpt">${t.descripcion || ''}</div>
                    </div>`;
            });
        } else {
            html += '<div class="news-card"><div class="news-category">🎬 Talento Pintón</div><div class="news-title">Próximamente</div><div class="news-excerpt">Aquí verás los talentos de nuestra radio</div></div>';
            html += '<div class="news-card"><div class="news-category">🎬 Talento Pintón</div><div class="news-title">Próximamente</div><div class="news-excerpt">Aquí verás los talentos de nuestra radio</div></div>';
        }
        
        container.innerHTML = html;
    } catch (err) {
        console.log('Talentos no disponibles.');
        let html = motivacionalHTML || '<div class="news-card"><div class="news-category">🌞 Mensaje del día</div><div class="news-title">¡Bienvenido a Cambur Pintón!</div><div class="news-excerpt">La radio más chevere de Venezuela 🍌</div></div>';
        html += '<div class="news-card"><div class="news-category">🎬 Talento Pintón</div><div class="news-title">Próximamente</div><div class="news-excerpt">Crea el archivo talentos.json en GitHub</div></div>';
        html += '<div class="news-card"><div class="news-category">🎬 Talento Pintón</div><div class="news-title">Próximamente</div><div class="news-excerpt">Crea el archivo talentos.json en GitHub</div></div>';
        container.innerHTML = html;
    }
}

// Saludos
async function cargarSaludos() {
    try {
        const response = await fetch(SALUDOS_URL);
        if (!response.ok) throw new Error('No disponible');
        const data = await response.json();
        if (data && data.saludos && data.saludos.length > 0) {
            document.getElementById('saludosContainer').innerHTML = data.saludos.map(s => 
                `<div class="news-card">
                    <div class="news-category">💬 ${s.remitente || 'Oyente'}</div>
                    <div class="news-title">${s.mensaje}</div>
                    <div class="news-excerpt">${s.fecha || ''}</div>
                </div>`
            ).join('');
        }
    } catch (err) {
        console.log('Saludos no disponibles.');
    }
}
