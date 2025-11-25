
// 1. Seleciona os elementos do HTML com os quais vamos interagir
const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("input[type='text']");
const botaoBusca = document.querySelector("#botao-busca");
let dados = []; // Array para armazenar os dados do data.json

// 2. Função para carregar os dados iniciais e configurar os eventos
async function inicializar() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // A linha abaixo foi removida para não exibir os cards inicialmente.

    // Remove o 'onclick' do HTML e adiciona o evento aqui no JS
    // Isso é uma prática melhor para separar o comportamento da estrutura
    botaoBusca.removeAttribute("onclick");
    botaoBusca.addEventListener("click", () => buscar());

    // Adiciona um evento para o campo de busca que escuta as teclas pressionadas
    campoBusca.addEventListener("keydown", (event) => {
        // Se a tecla pressionada for "Enter", chama a função de busca
        if (event.key === "Enter") {
            buscar();
        }
    });
}

// 3. Função que realiza a busca
function buscar() {
    const termo = campoBusca.value.toLowerCase(); // Pega o valor do input em minúsculas

    // Filtra o array 'dados'
    const resultados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        // Retorna true se o nome ou a descrição incluírem o termo buscado
        return nome.includes(termo) || descricao.includes(termo);
    });

    renderizarCards(resultados); // Exibe apenas os resultados filtrados
}

// 4. Função que renderiza os cards na tela
function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <p><strong>Ano de criação:</strong> ${dado.data_criacao}</p>
        <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// 5. Chama a função inicial para carregar os dados quando a página abre
inicializar();