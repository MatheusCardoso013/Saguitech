function calculaVendas() {
    let valorVendas = 0;
    itens.map(item => {
        valorServicoTotal = item.quantidade * item.valor;
        item.valorTotal = valorServicoTotal.toFixed(2);
        valorVendas = valorServicoTotal + valorVendas;
    })
    return valorVendas;
}

function calculaTotalImpostos(impostos, totalVendas) {
    let valorTotalImpostos = 0;
    impostos.forEach(element => {
        valorImposto = element.pct / 100 * totalVendas;
        element.valor = valorImposto.toFixed(2);
        valorTotalImpostos += valorImposto;
    });
    return valorTotalImpostos;
}

function gerarExibirNotaFiscal(event) {
    event.preventDefault();
    const irpf = parseFloat(document.getElementById('irpf').value);
    const pis = parseFloat(document.getElementById('pis').value);
    const cofins = parseFloat(document.getElementById('cofins').value);
    const inss = parseFloat(document.getElementById('inss').value);
    const issqn = parseFloat(document.getElementById('issqn').value);

    if (isNaN(irpf) || isNaN(pis) || isNaN(cofins) || isNaN(inss) || isNaN(issqn)) {
        alert('Insira todos os valores dos impostos.');
        return;
    }

    if (irpf < 0 || pis < 0 || cofins < 0 || inss < 0 || issqn < 0) {
        return;
    }

    const impostos = [
        { nome: 'IRPF', pct: irpf, valor: 0 },
        { nome: 'PIS', pct: pis, valor: 0 },
        { nome: 'COFINS', pct: cofins, valor: 0 },
        { nome: 'INSS', pct: inss, valor: 0 },
        { nome: 'ISSQN', pct: issqn, valor: 0 }
    ]

    const totalVendas = calculaVendas();
    console.log(totalVendas);
    const totalImpostos = calculaTotalImpostos(impostos, totalVendas);
    const totalAPagar = totalVendas + totalImpostos;
    console.log(totalImpostos)
    console.log(impostos);
    console.log(totalAPagar.toFixed(2));

    const notaFiscalHTML = `
        <h2 class="subtituloNotaFiscal">Nota Fiscal de Serviço (NFS-e)</h2>
        <p>Serviços:</p>
        <ul>
            ${itens.map(item => `<li>${item.servico} (${item.quantidade})<span>R$ ${item.valorTotal}</span></li>`).join('')}
        </ul>
        <p class="valorItens">Valor dos Itens: <span>R$ ${totalVendas.toFixed(2)}</span></p>
        <p>Impostos Calculados:</p>
        <ul>
            ${impostos.map(imposto => `<li>Imposto ${imposto.nome} (${imposto.pct}%): <span>R$ ${imposto.valor}</span></li>`).join('')}
        </ul>
        <p>Total de Impostos: <span>R$ ${totalImpostos.toFixed(2)}</span></p>
        <p class="total">Total a Pagar <span>R$ ${totalAPagar.toFixed(2)}</span></p>
    `

    document.querySelector(".notaFiscalGerada").innerHTML = notaFiscalHTML;
}

const itens = []
function adicionaItem() {
    const nomeServico = document.getElementById("servico").value;
    const quantidadeServico = parseFloat(document.getElementById("quantidade").value);
    const valorServico = parseFloat(document.getElementById("valor").value);

    if (nomeServico == '' || isNaN(quantidadeServico) || isNaN(valorServico)) {
        alert("Insira todos os dados de serviço.");
        return;
    }

    itens.push({ servico: nomeServico, quantidade: quantidadeServico, valor: valorServico, valorTotal: 0 })

    const itensAdicionados = `
        <tr>
            <th>Serviço</th>
            <th>Quantidade</th>
            <th>Valor</th>
        </tr>
        ${itens.map(item => `
            <tr>
                <td>${item.servico}</td>
                <td>${item.quantidade}</td>
                <td>${item.valor.toFixed(2)}</td>
            </tr>
        `).join('')}`

    console.log(itens);

    document.getElementById("tabela").innerHTML = itensAdicionados;

    document.getElementById("servico").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function limitarValorInput(inputId) {
    const input = document.getElementById(inputId);
    input.addEventListener('input', function () {
        const minValue = parseFloat(input.min);
        if (parseFloat(input.value) < minValue) {
            input.value = minValue;
        }
    });
}
limitarValorInput("quantidade");
limitarValorInput("valor");
limitarValorInput("irpf");
limitarValorInput("pis");
limitarValorInput("cofins");
limitarValorInput("inss");
limitarValorInput("issqn");
