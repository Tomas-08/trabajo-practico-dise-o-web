function abrirMenu() {
    const nav = document.getElementById('nav');
    const boton = document.getElementById('boton-menu');
    nav.classList.toggle('abierto');
    boton.textContent = nav.classList.contains('abierto') ? '✕' : '☰';
}

function toggleFaq(boton) {
    const respuesta = boton.nextElementSibling;
    const estaActiva = boton.classList.contains('activa');

    document.querySelectorAll('.donar-faq-pregunta').forEach(b => {
        b.classList.remove('activa');
        b.nextElementSibling.classList.remove('visible');
    });
                                                                                                                      
    if (!estaActiva) {
        boton.classList.add('activa');
        respuesta.classList.add('visible');
    }
}

function abrirModal() {

    let modal = document.createElement("div");

    modal.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
        <div class="modal-box">

            <button class="modal-cerrar-x" id="cerrarX">✕</button>

            <div class="modal-icono">🐾</div>
            <h2 class="modal-titulo">Calculadora de Impacto</h2>
            <p class="modal-subtitulo">Descubrí cuántas vidas podés salvar con tu donación</p>

            <div class="modal-input-wrap">
                <span class="modal-peso">$</span>
                <input type="number" id="montoDonacion" class="modal-input" placeholder="Ingresá un monto">
            </div>

            <button class="modal-btn-calcular" id="calcularImpacto">Calcular impacto</button>

            <div class="modal-resultado" id="resultadoImpacto"></div>

            <button class="modal-btn-donar" id="hacerDonacion">Hacer la donación 🐾</button>
            <button class="modal-btn-cerrar" id="cerrar">Cerrar</button>

        </div>
    </div>`;

    document.body.appendChild(modal);


    let inputMonto         = modal.querySelector("#montoDonacion");
    let botonCalcular      = modal.querySelector("#calcularImpacto");
    let resultadoImpacto   = modal.querySelector("#resultadoImpacto");
    let botonHacerDonacion = modal.querySelector("#hacerDonacion");
    let botonCerrar        = modal.querySelector("#cerrar");
    let botonCerrarX       = modal.querySelector("#cerrarX");
    let overlay            = modal.querySelector("#modalOverlay");

    function calcularImpacto(monto) {
        monto = parseFloat(monto);

        if (isNaN(monto) || monto <= 0) {
            resultadoImpacto.innerHTML = `<span class="resultado-error">Por favor ingresá un monto válido.</span>`;
            return;
        }

        let costoVacuna      = 3000;   // vacuna individual
        let costoAlimento    = 8000;   // bolsa de alimento 
        let costoEsterilizar = 15000;  // esterilización
        let costoSalvarVida  = 20000;  // rescate + atención médica completa

        let vidas        = Math.floor(monto / costoSalvarVida);
        let esterilizar  = Math.floor(monto / costoEsterilizar);
        let alimentos    = Math.floor(monto / costoAlimento);
        let vacunas      = Math.floor(monto / costoVacuna);

        let mensajePrincipal = "";
        let emoji = "";

        if (monto >= costoSalvarVida) {
            emoji = "🐕";
            mensajePrincipal = `Tu donación de <strong>$${monto.toLocaleString()}</strong> puede salvar la vida de <strong>${vidas} cachorros${vidas > 1 ? "s" : ""}</strong>, cubriendo rescate y atención médica completa.`;
        } else if (monto >= costoEsterilizar) {
            emoji = "🏥";
            mensajePrincipal = `Tu donación de <strong>$${monto.toLocaleString()}</strong> puede costear <strong>${esterilizar} esterilización${esterilizar > 1 ? "es" : ""}</strong>, ayudando a controlar la sobrepoblación.`;
        } else if (monto >= costoAlimento) {
            emoji = "🥣";
            mensajePrincipal = `Tu donación de <strong>$${monto.toLocaleString()}</strong> puede alimentar a <strong>${alimentos} perrito${alimentos > 1 ? "s" : ""}</strong> durante un mes completo.`;
        } else if (monto >= costoVacuna) {
            emoji = "💉";
            mensajePrincipal = `Tu donación de <strong>$${monto.toLocaleString()}</strong> puede cubrir <strong>${vacunas} vacuna${vacunas > 1 ? "s" : ""}</strong> para nuestros Camperitos.`;
        } else {
            emoji = "❤️";
            mensajePrincipal = `Cada peso suma. Con <strong>$${monto.toLocaleString()}</strong> contribuís al cuidado diario de nuestros Camperitos.`;
        }

        resultadoImpacto.innerHTML = `
            <div class="resultado-card">
                <span class="resultado-emoji">${emoji}</span>
                <p>${mensajePrincipal}</p>
                <p class="resultado-extra">Con $20.000 salvás la vida de un Camperito 🐾</p>
            </div>`;
    }

    botonCalcular.addEventListener("click", function () {
        let monto = inputMonto.value;
        calcularImpacto(monto);
    });

    inputMonto.addEventListener("keydown", function (e) {
        if (e.key === "Enter") calcularImpacto(inputMonto.value);
    });

    function cerrarModal() {
        modal.remove();
    }
    botonCerrar.addEventListener("click", cerrarModal);
    botonCerrarX.addEventListener("click", cerrarModal);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) cerrarModal();
    });

    botonHacerDonacion.addEventListener("click", function () {
        let monto = parseFloat(inputMonto.value) || 0;
        modal.querySelector(".modal-box").innerHTML = `
            <div class="modal-gracias">
                <div class="modal-icono">🐾</div>
                <h2 class="modal-titulo">¡Gracias por tu donación!</h2>
                <p class="modal-subtitulo">Tu apoyo hace posible que sigamos rescatando y cuidando a nuestros Camperitos.</p>
                ${monto >= 20000 ? `<p class="resultado-extra">Con tu donación de <strong>$${monto.toLocaleString()}</strong> estás salvando una vida. 🐕</p>` : ""}
                <a class="modal-btn-calcular" href="../Donar.html">Ir a donar</a>
                <button class="modal-btn-cerrar" id="cerrarGracias">Volver</button>
            </div>`;
        modal.querySelector("#cerrarGracias").addEventListener("click", cerrarModal);
    });
}
    