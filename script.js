
// C >> Create  >> Cadastrar
// R   >> Read   >> Ler
// U   >>  Update  >> alterar/atualizar/editar/fuçar/mudar
// D   >>  Delete  >> Apagar/deletar/excluir

// ctrl + ;

// const nomes = []
// const alturas = []





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
    carregarDados() 
}


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

function salvarProduto() {
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

function excluirProduto() {
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
    document.getElementById('painel-dashboard').innerHTML = ""
    let produtoMaisCaro = cardapio[0]
    for (let i = 1; i < cardapio.length; i++) {
        if (cardapio[i].preco > produtoMaisCaro.preco) {
            produtoMaisCaro = cardapio[i];
        }
    }
    console.log("Protudo mais caro:" + produtoMaisCaro.nome);

}
function voltar() {
    document.getElementById('painel-cardapio').innerHTML = ""
}