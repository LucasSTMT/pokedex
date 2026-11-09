const pokemons =[
    {numero: "#0001", nome: "Bulbasaur", tipo: "Planta / Venenoso"},
    {numero: "#0002", nome: "Ivysaur", tipo: "Planta / Venenoso"},
    {numero: "#0003", nome: "Venusaur", tipo: "Planta / Venenoso"},
    {numero: "#0004", nome: "Charmander", tipo: "Fogo"},
    {numero: "#0005", nome: "Charmeleon", tipo: "Fogo"},
    {numero: "#0006", nome: "Charizard", tipo: "Fogo / Voador"},
    {numero: "#0007", nome: "Squirtle", tipo: "Água"},
    {numero: "#0008", nome: "Wartortle", tipo: "Água"},
    {numero: "#0009", nome: "Blastoise", tipo: "Água"},
    {numero: "#0010", nome: "Caterpie", tipo: "Inseto"},
    {numero: "#0011", nome: "Metapod", tipo: "Inseto"},
    {numero: "#0012", nome: "Butterfree", tipo: "Inseto / Voador"},
    {numero: "#0013", nome: "Weedle", tipo: "Inseto / Venenoso"},
    {numero: "#0014", nome: "Kakuna", tipo: "Inseto / Venenoso"},
    {numero: "#0015", nome: "Beedrill", tipo: "Inseto / Venenoso"},
    {numero: "#0016", nome: "Pidgey", tipo: "Normal / Voador"},
    {numero: "#0017", nome: "Pidgeotto", tipo: "Normal / Voador"},
    {numero: "#0018", nome: "Pidgeot", tipo: "Normal / Voador"},
    {numero: "#0019", nome: "Rattata", tipo: "Normal"},
    {numero: "#0020", nome: "Raticate", tipo: "Normal"},
    {numero: "#0021", nome: "Spearow", tipo: "Normal / Voador"},
    {numero: "#0022", nome: "Fearow", tipo: "Normal / Voador"},
    {numero: "#0023", nome: "Ekans", tipo: "Venenoso"},
    {numero: "#0024", nome: "Arbok", tipo: "Venenoso"},
    {numero: "#0025", nome: "Pikachu", tipo: "Elétrico"},
    {numero: "#0026", nome: "Raichu", tipo: "Elétrico"},
    {numero: "#0027", nome: "Sandshrew", tipo: "Terra"},
    {numero: "#0028", nome: "Sandslash", tipo: "Terra"},
    {numero: "#0029", nome: "Nidoran♀", tipo: "Venenoso"},
    {numero: "#0030", nome: "Nidorina", tipo: "Venenoso"},
    {numero: "#0031", nome: "Nidoqueen", tipo: "Venenoso / Terra"},
    {numero: "#0032", nome: "Nidoran♂", tipo: "Venenoso"},
    {numero: "#0033", nome: "Nidorino", tipo: "Venenoso"},
    {numero: "#0034", nome: "Nidoking", tipo: "Venenoso / Terra"},
    {numero: "#0035", nome: "Clefairy", tipo: "Fada"},
    {numero: "#0036", nome: "Clefable", tipo: "Fada"},
    {numero: "#0037", nome: "Vulpix", tipo: "Fogo"},
    {numero: "#0038", nome: "Ninetales", tipo: "Fogo"},
    {numero: "#0039", nome: "Jigglypuff", tipo: "Normal / Fada"},
    {numero: "#0040", nome: "Wigglytuff", tipo: "Normal / Fada"},
    {numero: "#0041", nome: "Zubat", tipo: "Venenoso / Voador"},
    {numero: "#0042", nome: "Golbat", tipo: "Venenoso / Voador"},
    {numero: "#0043", nome: "Oddish", tipo: "Planta / Venenoso"},
    {numero: "#0044", nome: "Gloom", tipo: "Planta / Venenoso"},
    {numero: "#0045", nome: "Vileplume", tipo: "Planta / Venenoso"},
    {numero: "#0046", nome: "Paras", tipo: "Inseto / Planta"},
    {numero: "#0047", nome: "Parasect", tipo: "Inseto / Planta"},
    {numero: "#0048", nome: "Venonat", tipo: "Inseto / Venenoso"},
    {numero: "#0049", nome: "Venomoth", tipo: "Inseto / Venenoso"},
    {numero: "#0050", nome: "Diglett", tipo: "Terra"},
    {numero: "#0051", nome: "Dugtrio", tipo: "Terra"},
    {numero: "#0052", nome: "Meowth", tipo: "Normal"},
    {numero: "#0053", nome: "Persian", tipo: "Normal"},
    {numero: "#0133", nome: "Eeve", tipo: "Normal"},
    {numero: "#0150", nome: "Mewtwo", tipo: "Psíquico"},
    {numero: "#0250", nome: "Ho-oh", tipo: "Fogo / Voador"}

];


// CONFIGURAÇÕES DA PAGINAÇÃO

let PaginaAtual = 1;
const PokemonsPorPagina = 12;
let totalPaginas = 1;


// IDENTIFICAR OS ELEMENTOS HTML

const catalogo = document.querySelector(".catalogo");

const botaoAnterior =
    document.querySelector("#botao-anterior");

const botaoProximo =
    document.querySelector("#botao-proximo");

const formulario =
    document.querySelector("#form-busca");


// FUNÇÃO PARA IGNORAR ACENTOS

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


// CRIAR OS CARDS DOS POKÉMON

pokemons.forEach(function(pokemon) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
        <span class="numero">${pokemon.numero}</span>
        <h3>${pokemon.nome}</h3>
        <p class="tipo">${pokemon.tipo}</p>
    `;

    catalogo.appendChild(card);
});


// FUNÇÃO PARA ATUALIZAR A PÁGINA

function atualizarPagina() {

    const pesquisa = normalizarTexto(
        document.querySelector("#pesquisa").value
    );

    const cards = Array.from(
        document.querySelectorAll(".card")
    );


// FILTRAR OS POKÉMON PELA PESQUISA

    const correspondentes = cards.filter(function(card) {

        const nome = normalizarTexto(
            card.querySelector("h3").textContent
        );

        const tipo = normalizarTexto(
            card.querySelector(".tipo").textContent
        );

        const numero = normalizarTexto(
            card.querySelector(".numero").textContent
        );

        return nome.includes(pesquisa) ||
               tipo.includes(pesquisa) ||
               numero.includes(pesquisa);
    });


// CALCULAR QUANTAS PÁGINAS EXISTEM

    totalPaginas = Math.max(1, Math.ceil(correspondentes.length / PokemonsPorPagina));

    if (PaginaAtual > totalPaginas) {
        PaginaAtual = totalPaginas;
    }


// SELECIONAR OS CARDS DA PÁGINA ATUAL

    const inicio = (PaginaAtual - 1) * PokemonsPorPagina;
    const fim = inicio + PokemonsPorPagina;


// ESCONDER TODOS OS CARDS

    cards.forEach(function(card) {
        card.style.display = "none";
    });


// MOSTRAR APENAS OS CARDS DA PÁGINA

    correspondentes.slice(inicio, fim).forEach(function(card) {
        card.style.display = "";
    });


// ATUALIZAR OS CONTADORES

    document.querySelector("#resultado-busca").textContent =
        `Total: ${pokemons.length} | Encontrados: ${correspondentes.length}`;

    document.querySelector("#pagina-atual").textContent =
        `Página ${PaginaAtual} de ${totalPaginas}`;


// ATIVAR OU DESATIVAR OS BOTÕES

    botaoAnterior.disabled = PaginaAtual === 1;
    botaoProximo.disabled = PaginaAtual === totalPaginas;
}


// BOTÃO ANTERIOR

botaoAnterior.addEventListener("click", function() {

    if (PaginaAtual > 1) {
        PaginaAtual--;
        atualizarPagina();
    }

});


// BOTÃO PRÓXIMO

botaoProximo.addEventListener("click", function() {

    if (PaginaAtual < totalPaginas) {
        PaginaAtual++;
        atualizarPagina();
    }

});


// SISTEMA DE PESQUISA

formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    PaginaAtual = 1;

    atualizarPagina();
});


// CARREGAR A PRIMEIRA PÁGINA

atualizarPagina();