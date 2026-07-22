
// C >> Create  >> Cadastrar
// R   >> Read   >> Ler
// U   >>  Update  >> alterar/atualizar/editar/fuçar/mudar
// D   >>  Delete  >> Apagar/deletar/excluir

// ctrl + ;

// const nomes = []
// const alturas = []




// console.log(dino);

let cardapio = []

function salvarDados() {
    localStorage.setItem('cardapio', JSON.stringify(cardapio))

    // let texto = JSON.stringify(cardapio)
    // localStorage.setItem('cardapio', texto)
}

function carregarDados() {

    cardapio = JSON.parse(localStorage.getItem('cardapio')) || []

    // let textoLido = localStorage.getItem('cardapio')
    // cardapio = JSON.parse(textoLido)
}

function cadastrarProduto() {

    carregarDados()

    const novoCardapio = {
        id: Date.now(),
        nome: document.getElementById('input-nome').value,
        preco: Number(document.getElementById("input-preco").value),
        categoria: document.getElementById("input-categoria").value,
        quantidade: Number(document.getElementById("input-quantidade").value),
        tamanho: document.getElementById("input-tamanho").value,
    }
    cardapio.push(novoCardapio)

    console.log(cardapio);

    limparFormulario()
    mostrarTodos()

    salvarDados()
}

function limparFormulario() {
    document.getElementById('input-nome').value = ''
    document.getElementById('input-preco').value = ''
    document.getElementById('input-categoria').value = ''
    document.getElementById('input-quantidade').value = ''
    document.getElementById('input-tamanho').value = ''
    document.getElementById('input-id').value = ''

    document.getElementById('input-nome').focus()
}

function mostrarTodos() {
    document.getElementById('painel-cardapio').innerHTML = ''

    for (let i = 0; i < cardapio.length; i++) {
        // alert(cardapio[i].nome)
        document.getElementById('painel-cardapio').innerHTML +=
            `<div class="card-dino">
            <h2>${cardapio[i].nome}</h2>
            <p>Preco: R$ ${cardapio[i].preco}</p>
            <p>Categoria: ${cardapio[i].categoria}</p>
            <p>Quantidade: ${cardapio[i].quantidade}</p>
            <p>Tamanho: ${cardapio[i].tamanho}</p>
            <p>${cardapio[i].id}</p>
        
        </div>
        `
    }
}


// function testar() {

//     // window.location.href = 'teste.html'

//     carregarDados()

//     localStorage.setItem('teste', 45)

//     let testeDeLeitura = localStorage.getItem('teste')
//     console.log(testeDeLeitura);


//     cardapio = [
//         {
//             id: 1718324500001,
//             nome: "Rex",
//             preco: 6.1,
//             categoria: "#8B4513", // Marrom
//             quantidade: 150000
//         },
//         {
//             id: 1718324500002,
//             nome: "Velo",
//             preco: 2.0,
//             categoria: "#2E8B57", // Verde escuro
//             quantidade: 85000
//         },
//         {
//             id: 1718324500003,
//             nome: "Trike",
//             preco: 3.0,
//             categoria: "#708090", // Cinza
//             quantidade: 120000
//         },
//         {
//             id: 1718324500004,
//             nome: "Braqui",
//             preco: 13.0,
//             categoria: "#556B2F", // Verde oliva
//             quantidade: 250000
//         },
//         {
//             id: 1718324500005,
//             nome: "Ptero",
//             preco: 1.5,
//             categoria: "#4682B4", // Azul aço
//             quantidade: 95000
//         }
//     ]

//     console.log(cardapio);

// }

function pesquisar() {
    let nomeProcurado = document.getElementById('input-nome').value

    for (let i = 0; i < cardapio.length; i++) {
        if (nomeProcurado == cardapio[i].nome) {
            console.log(cardapio[i]);
            document.getElementById('input-preco').value = cardapio[i].preco
            document.getElementById('input-categoria').value = cardapio[i].categoria
            document.getElementById('input-quantidade').value = cardapio[i].quantidade
            document.getElementById('input-tamanho').value = cardapio[i].tamanho
            document.getElementById('input-id').value = cardapio[i].id
            console.log(i);
        }

    }

}

function salvarDino() {
    let id = Number(document.getElementById('input-id').value)

    for (let i = 0; i < cardapio.length; i++) {
        if (id == cardapio[i].id) {
            console.log(cardapio[i]);
            cardapio[i].preco = document.getElementById('input-preco').value
            cardapio[i].categoria = document.getElementById('input-categoria').value
            cardapio[i].quantidade = document.getElementById('input-quantidade').value
            cardapio[i].tamanho = document.getElementById('input-tamanho').value
            cardapio[i].id = document.getElementById('input-id').value
            console.log(i);
        }
    }
    mostrarTodos()
    limparFormulario()
}

function excluirDino() {
    let id = Number(document.getElementById('input-id').value)

    for (let i = 0; i < cardapio.length; i++) {
        if (id == cardapio[i].id) {
            console.log(cardapio[i]);
            cardapio.splice(i, 1)
            console.log(i);
        }
    }
    mostrarTodos()
    limparFormulario()
}

function dashboard() {
    document.getElementById('painel-cardapio').innerHTML = ""

    document.getElementById('painel-dashboard').innerHTML = ""
    let produtoMaisCaro = cardapio[0]
    for (let i = 1; i < cardapio.length; i++) {
        if (cardapio[i].preco > produtoMaisCaro.preco) {
            produtoMaisCaro = cardapio[i];
        }
    }
     
} 