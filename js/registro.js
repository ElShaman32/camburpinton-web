// ============================================================
// 🎤 REGISTRO DE TALENTO PINTÓN (FIREBASE)
// ============================================================

// Inicializar Firebase
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

function abrirRegistroTalento() {
    document.getElementById('talentoModal').classList.add('active');
    document.getElementById('talentoForm').reset();
    document.getElementById('talentoConfirmation').style.display = 'none';
    document.getElementById('btnSubmitTalento').disabled = false;
    document.getElementById('btnSubmitTalento').textContent = '🎤 ¡Quiero ser Talento Pintón!';
}

function cerrarRegistroTalento() {
    document.getElementById('talentoModal').classList.remove('active');
}

document.getElementById('talentoModal').addEventListener('click', function(e) {
    if (e.target === this) cerrarRegistroTalento();
});

async function enviarRegistroTalento(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitTalento');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    const data = {
        nombreArtistico: document.getElementById('tNombreArtistico').value.trim(),
        nombreReal: document.getElementById('tNombreReal').value.trim(),
        talento: document.getElementById('tTalento').value.trim(),
        ciudad: document.getElementById('tCiudad').value.trim(),
        whatsapp: document.getElementById('tWhatsapp').value.trim(),
        redes: document.getElementById('tRedes').value.trim(),
        link: document.getElementById('tLink').value.trim(),
        fecha: new Date().toISOString()
    };
    
    try {
        await db.collection('talentos').add(data);
        document.getElementById('talentoConfirmation').style.display = 'block';
        document.getElementById('talentoForm').reset();
        btn.textContent = '🎤 ¡Quiero ser Talento Pintón!';
        setTimeout(cerrarRegistroTalento, 3000);
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('Hubo un error. Intenta de nuevo.');
        btn.disabled = false;
        btn.textContent = '🎤 ¡Quiero ser Talento Pintón!';
    }
}
