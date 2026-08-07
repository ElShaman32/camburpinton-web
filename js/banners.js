// ============================================================
// 📢 BANNERS ROTATIVOS
// ============================================================

let banners = [];
let currentBanner = 0;
let bannerInterval = null;

async function cargarBanners() {
    const bannerSection = document.getElementById('bannerSection');
    try {
        const response = await fetch(PUBLICIDAD_URL);
        if (!response.ok) throw new Error('No disponible');
        banners = await response.json();
        
        if (banners && banners.length > 0) {
            bannerSection.classList.add('active');
            
            // Puntitos indicadores
            document.getElementById('bannerDots').innerHTML = banners.map((_, i) => 
                `<div class="banner-dot${i === 0 ? ' active' : ''}"></div>`
            ).join('');
            
            mostrarBanner(0);
            
            // Rotar cada 8 segundos si hay más de 1
            if (banners.length > 1) {
                if (bannerInterval) clearInterval(bannerInterval);
                bannerInterval = setInterval(() => {
                    currentBanner = (currentBanner + 1) % banners.length;
                    mostrarBanner(currentBanner);
                }, 8000);
            }
        }
    } catch (err) {
        console.log('Banners no disponibles.');
        bannerSection.classList.remove('active');
    }
}

function mostrarBanner(index) {
    document.getElementById('bannerImg').src = banners[index].imagen;
    document.getElementById('bannerImg').alt = banners[index].alt || 'Publicidad';
    document.getElementById('bannerLink').href = banners[index].enlace || '#';
    document.querySelectorAll('.banner-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}
