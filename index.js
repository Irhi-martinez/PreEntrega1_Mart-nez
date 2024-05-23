function simularCredito() {
    const monto = parseFloat(document.getElementById('monto').value);
    const interes = parseFloat(document.getElementById('interes').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    if (isNaN(monto) || isNaN(interes) || isNaN(plazo) || monto <= 0 || interes <= 0 || plazo <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const resultado = calcularCredito(monto, interes, plazo);
    mostrarResultado(resultado);
}

function calcularCredito(monto, interes, plazo) {
    const n = plazo * 12;
    const tasaMensual = interes / 100 / 12;
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
    const totalPagar = cuotaMensual * n;

    let amortizacion = [];
    for (let i = 0; i < n; i++) {
        amortizacion.push({
            mes: i + 1,
            cuota: cuotaMensual.toFixed(2),
            saldo: (monto - cuotaMensual * (i + 1)).toFixed(2)
        });
    }

    return {
        cuotaMensual: cuotaMensual.toFixed(2),
        totalPagar: totalPagar.toFixed(2),
        amortizacion: amortizacion
    };
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Cuota Mensual: $${resultado.cuotaMensual}</p>
        <p>Total a Pagar: $${resultado.totalPagar}</p>
        <h3>Amortización:</h3>
        <table>
            <tr>
                <th>Mes</th>
                <th>Cuota</th>
                <th>Saldo</th>
            </tr>
            ${resultado.amortizacion.map(amort => `
                <tr>
                    <td>${amort.mes}</td>
                    <td>${amort.cuota}</td>
                    <td>${amort.saldo}</td>
                </tr>
            `).join('')}
        </table>
    `;
}
