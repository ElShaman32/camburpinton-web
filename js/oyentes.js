// ============================================================
// 👥 CONTADOR DE OYENTES SIMULADO
// ============================================================

function actualizarOyentes() {
    const listenersCount = document.getElementById('listenersCount');
    if (!listenersCount) return;
    
    const hora = new Date().getHours();
    // Más oyentes en horas pico (8am-10pm), menos en madrugada
    let base = (hora >= 8 && hora <= 22) ? 72 : 62;
    let variacion = Math.floor(Math.random() * 15) - 7;
    let oyentesSimulados = base + variacion;
    oyentesSimulados = Math.max(55, Math.min(85, oyentesSimulados));
    listenersCount.textContent = oyentesSimulados;
}

// Actualizar cada 2-3 minutos
actualizarOyentes();
setInterval(actualizarOyentes, 150000 + Math.floor(Math.random() * 60000));
