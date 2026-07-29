let cardapio = []

// função de salvar dados no localStorege
function salvarDados() {
    localStorage.setItem('cardapio', JSON.stringify(cardapio))
}
// função de salvar dados teste no localStorege
function salvarDadosTeste() {
    localStorage.setItem('teste', JSON.stringify(teste))
}
//função de carregar os dados salvos no localStorege
function carregarDados() {
    cardapio = JSON.parse(localStorage.getItem('cardapio')) || []
}
//função de carregar os dados teste salvos no localStorege
function carregarDadosTeste() {
    teste = JSON.parse(localStorage.getItem('teste')) || []

}
// função de CREATE: Cadastrar
// cria novo produto com ID unico (Date.now()),nome,preço...
// salva o produto no localStorage e atualiza a lista 
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

    salvarDados()
    // mostrarTodos()
    limparFormulario()

}

//função READ: Mostrar todos os produtos cadastrados
// carrega os produtos salvos
// exibe eles em formato de cards mostrandos as informações cadastradas
function mostrarTodos() {
    carregarDados()
    carregarDadosTeste()

    document.getElementById("grupo").style.display = "none"
    document.getElementById('painel-cardapio').innerHTML = ""

    for (let i = 0; i < cardapio.length; i++) {
        document.getElementById('painel-cardapio').innerHTML +=
            `<div class="card-cardapio">
        <h2>${cardapio[i].nome}</h2>
        <p>Preco: R$ ${cardapio[i].preco}</p>
        <p>Categoria: ${cardapio[i].categoria}</p>
        <p>Quantidade: ${cardapio[i].quantidade}</p>
        <p>Tamanho: ${cardapio[i].tamanho}</p>
        <p>${cardapio[i].id}</p>
        
        </div>
        `
    }
    for (let i = 0; i < teste.length; i++) {
        document.getElementById('painel-cardapio').innerHTML +=
            `<div class="card-teste">
        <h2>${teste[i].nome}</h2>
        <p>Preco: R$ ${teste[i].preco}</p>
        <p>Categoria: ${teste[i].categoria}</p>
        <p>Quantidade: ${teste[i].quantidade}</p>
        <p>Tamanho: ${teste[i].tamanho}</p>
        <p>${teste[i].id}</p>
        
        </div>
        `

    }
}


//funcção pesquisar por produto
// busca produto pelo nome
// preenche automaticamente o formulário com os dados 
// facilita a altera ou excluir o produto
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
    salvarDados()
    carregarDados()

}

// função UPDATE salvar/alterar produto
// localiza o produto pelo ID
//atualiza/altera as informações, salvando as no localStorage
function salvarProduto() {
    let id = Number(document.getElementById('input-id').value)

    for (let i = 0; i < cardapio.length; i++) {
        if (id == cardapio[i].id) {
            cardapio[i].preco = document.getElementById('input-preco').value
            cardapio[i].categoria = document.getElementById('input-categoria').value
            cardapio[i].quantidade = document.getElementById('input-quantidade').value
            cardapio[i].tamanho = document.getElementById('input-tamanho').value
            cardapio[i].id = document.getElementById('input-id').value
        }
    }
    salvarDados()
    mostrarTodos()
    limparFormulario()
}

//função DELETE: Deletar um item cadastrado
// remove um produto da lista pelo ID
// e atualiza os dados na lista
function excluirProduto() {
    let id = Number(document.getElementById('input-id').value)

    for (let i = 0; i < cardapio.length; i++) {
        if (id == cardapio[i].id) {
            console.log(cardapio[i]);
            cardapio.splice(i, 1)
            console.log(i);
        }
    }
    salvarDados()
    mostrarTodos()
    limparFormulario()
}

//função do dashboard:
// pega os dados no localStorage
//exibe apenas o dashboard
//percorre o vetor cardapio todo para descobrir as informações 
//calcula media de preço
//atualiza e mostra os resultados

function dashboard() {

    carregarDados()

    document.getElementById("grupo").style.display = "none"
    document.getElementById("painel-botoes").style.display = "none"
    document.getElementById("painel-cardapio").style.display = "none"
    document.getElementById("painel-dashboard").style.display = "block";


    let produtoMaisCaro = cardapio[0]
    let produtoMaisBarato = cardapio[0]
    let quantidadeTotal = 0
    let somaPrecos = 0
    let bebidas = 0
    let lanches = 0
    let sucos = 0
    let outros = 0




    for (let i = 1; i < cardapio.length; i++) {
        if (cardapio[i].preco > produtoMaisCaro.preco) {
            produtoMaisCaro = cardapio[i]
        }
    }
    document.getElementById("mais-caro").innerHTML = produtoMaisCaro.nome + " - R$ " + produtoMaisCaro.preco;

    for (let i = 1; i < cardapio.length; i++) {
        if (cardapio[i].preco < produtoMaisBarato.preco) {
            produtoMaisBarato = cardapio[i]
        }
    }
    document.getElementById("mais-barato").innerHTML = produtoMaisBarato.nome + " - R$ " + produtoMaisBarato.preco;

    for (let i = 0; i < cardapio.length; i++) {

        quantidadeTotal += Number(cardapio[i].quantidade)

        somaPrecos += Number(cardapio[i].preco)

        if (cardapio[i].categoria == "bebidas") {
            bebidas++
        } else if (cardapio[i].categoria == "lanches") {
            lanches++
        } else if (cardapio[i].categoria == "sucos") {
            sucos++
        }
    }

    let mediaPreco = somaPrecos / cardapio.length

    document.getElementById("total-produtos").innerHTML = cardapio.length

    document.getElementById("total-itens").innerHTML = quantidadeTotal

    document.getElementById("media-preco").innerHTML = "R$" + mediaPreco.toFixed(2)

    document.getElementById("bebidas").innerHTML = bebidas

    document.getElementById("lanches").innerHTML = lanches

    document.getElementById("sucos").innerHTML = sucos

}

//função fechar cardápio
function fechar() {
    document.getElementById('painel-cardapio').innerHTML = ""
    document.getElementById("grupo").style.display = ""
}

//função fechar daschboard
function fecharDashboard() {
    document.getElementById("painel-dashboard").style.display = "none"
    document.getElementById("grupo").style.display = ""
    document.getElementById("painel-botoes").style.display = ""
    document.getElementById("painel-cardapio").style.display = ""

}
//limpa todo os compos do formulário para proximo operação
function limparFormulario() {
    document.getElementById('input-nome').value = ''
    document.getElementById('input-preco').value = ''
    document.getElementById('input-categoria').value = ''
    document.getElementById('input-quantidade').value = ''
    document.getElementById('input-tamanho').value = ''
    document.getElementById('input-id').value = ''

    document.getElementById('input-nome').focus()
}
//gerar dados de teste automaticos
// facilitar a demostração do sistema
function testar() {


    carregarDadosTeste()


    teste = [
        {
            id: 1718324500001,
            nome: "prato 1",
            preco: 10,
            categoria: "Lanches",
            quantidade: 5,
            tamanho: "M"
        },
        {
            id: 1718324500002,
            nome: "prato 2",
            preco: 15,
            categoria: "Lanches",
            quantidade: 3,
            tamanho: "G"
        },
        {
            id: 1718324500003,
            nome: "Bebida 1",
            preco: 8,
            categoria: "bebidas",
            quantidade: 5,
            tamanho: "P"
        },
        {
            id: 1718324500004,
            nome: "Sucos 1",
            preco: 16,
            categoria: "Sucos",
            quantidade: 5,
            tamanho: "P"
        },
    ]


    console.log(teste);
    salvarDadosTeste()

}
