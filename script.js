

let cardapio = []

// função de salvar dados no localStorege
function salvarDados() {
    localStorage.setItem('cardapio', JSON.stringify(cardapio))
    localStorage.setItem('teste',JSON.stringify(teste))

}
//função de carregar os dados salvos no localStorege
function carregarDados() {

    cardapio = JSON.parse(localStorage.getItem('cardapio')) || []
    teste = JSON.parse(localStorage.getItem('teste')) || []


}
//função de CREATE: Cadastrar
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
    mostrarTodos()
    limparFormulario()

}

//função READ: Mostrar todos os produtos cadastrados
function mostrarTodos() {
    carregarDados()
    
    document.getElementById("grupo").style.display = "none"
    document.getElementById('painel-cardapio').innerHTML = ""
    
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

//funcção pesquisar por produto
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
function salvarProduto() {
    let id = Number(document.getElementById('input-id').value)

    for (let i = 0; i < cardapio.length; i++) {
        if (id == cardapio[i].id) {
            // console.log(cardapio[i]);
            cardapio[i].preco = document.getElementById('input-preco').value
            cardapio[i].categoria = document.getElementById('input-categoria').value
            cardapio[i].quantidade = document.getElementById('input-quantidade').value
            cardapio[i].tamanho = document.getElementById('input-tamanho').value
            cardapio[i].id = document.getElementById('input-id').value
            // console.log(i);
        }
    }
    salvarDados()
    mostrarTodos()
    limparFormulario()
}

//função DELETE: Deletar um item cadastrado
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

//função do dashboard: abrir card
function dashboard() {

    carregarDados()
    
    document.getElementById("grupo").style.display = "none"
    document.getElementById("painel-botoes").style.display = "none"
    document.getElementById("painel-cardapio").style.display = "none"
    
    if (cardapio.length == 0) {
        document.getElementById("painel-dashboard").style.display = "block"
        document.getElementById("painel-dashboard").innerHTML = ""

        "<h2>Não existe produtos cadastrados</h2>"
        
        return
    }
    
    document.getElementById("painel-dashboard").style.display = "block";

    
    let produtoMaisCaro = cardapio[0]
    let produtoMaisBarato = cardapio[0]
    let quantidadeTotal = 0
    let somaPrecos = 0
    let bebidas = 0
    let lanches = 0
    let sobremesas = 0
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
        
        if (cardapio[i].categoria == "Bebida") {
            bebidas++
        } else if (cardapio[i].categoria == "Lanches") {
            lanches++
        } else if (cardapio[i].categoria == "Sobremesas") {
            sobremesas++
        }
    }
    
    let mediaPreco = somaPrecos / cardapio.length
    
    document.getElementById("total-produtos").innerHTML = cardapio.length
    
    document.getElementById("total-itens").innerHTML = quantidadeTotal
    
    document.getElementById("media-preco").innerHTML = "R$" + mediaPreco.toFixed(2)
    
    document.getElementById("bebidas").innerHTML = bebidas
    
    document.getElementById("lanches").innerHTML = lanches
    
    document.getElementById("sobremesas").innerHTML = sobremesas
    
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
function limparFormulario() {
    document.getElementById('input-nome').value = ''
    document.getElementById('input-preco').value = ''
    document.getElementById('input-categoria').value = ''
    document.getElementById('input-quantidade').value = ''
    document.getElementById('input-tamanho').value = ''
    document.getElementById('input-id').value = ''

    document.getElementById('input-nome').focus()
}

function testar() {
    

    carregarDados()

    
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
            nome: "sobremesa 1",
            preco: 16,
            categoria: "Sobremesas", 
            quantidade: 5,
            tamanho: "P"
        },
    ]


    console.log(teste);
    salvarDados()

}
