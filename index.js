// ****** FORMULARIO ****** //

// Informações iniciais
var valoresIniciais = [
    {
        id: 0,
        titulo: "React Native",
        skill: "Programação",
        categoria: "FullStack",
        descricao:
            'O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.',
        video: "https://www.youtube.com/watch?v=aJR7f45dBNs",
    },
    {
        id: 1,
        titulo: "Grid vs Flex-Box",
        skill: "CSS",
        categoria: "FrontEnd",
        descricao:
            "A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e outro ser bi-dimensional, é que o controle do layout do grid vem do container e no flexbox vem dos elementos. A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e outro ser bi-dimensional, é que o controle do layout do grid vem do container e no flexbox vem dos elementos.",
        video: "https://www.youtube.com/watch?v=DXxt4oIAI4Y",
    },
];

// Variaveis globais
var id = 2,
    cards = [],
    frontEnd = 0,
    backEnd = 0,
    fullStack = 0,
    softSkill = 0,
    total = 0;
    formListener = true;

// Carregar dados do Local Storage
cards = JSON.parse(localStorage.getItem("Cards"));
if (cards == null) {
    window.addEventListener("load", () => {
        localStorage.setItem("Cards", JSON.stringify(valoresIniciais));
        carregarElementosNaTela(valoresIniciais);
        cards = JSON.parse(localStorage.getItem("Cards"));
        updateCardsIndicativos(cards);
    });
} else {
    window.addEventListener("load", () => {
        carregarElementosNaTela(cards);
        updateCardsIndicativos(cards);
    });
}

// === Carregar Cards indicativos === //
function updateCardsIndicativos(array) {
    var cardTotal = document.getElementById("qtd-total");
    var cardFrontEnd = document.getElementById("qtd-frontend");
    var cardBackEnd = document.getElementById("qtd-backend");
    var cardFullStack = document.getElementById("qtd-fullstack");
    var cardSoftSkill = document.getElementById("qtd-softskill");
    (frontEnd = 0), (backEnd = 0), (fullStack = 0), (softSkill = 0), (total = 0);

    //Contagem dos itens
    array.forEach(function (card, index) {
        if (card.categoria == "FrontEnd") {
            frontEnd++;
        } else if (card.categoria == "BackEnd") {
            backEnd++;
        } else if (card.categoria == "FullStack") {
            fullStack++;
        } else if (card.categoria == "Comportamental/SoftSkill") {
            softSkill++;
        }
    });
    total = frontEnd + backEnd + fullStack + softSkill;

    //Atulizacao dos valores
    cardTotal.innerHTML = total;
    cardFrontEnd.innerHTML = frontEnd;
    cardBackEnd.innerHTML = backEnd;
    cardFullStack.innerHTML = fullStack;
    cardSoftSkill.innerHTML = softSkill;
}

// ========= Botao Salvar ========= //
botaoSalvar = document.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formListener != false) {
        
        displayCard();
    }
});

// ======= Criar elemento, enviar para o Local Storage e imprimir na tela ====== //
function displayCard() {
    var titulo = document.getElementById("title-input").value;
    var skill = document.getElementById("skill-input").value;
    //pegar o valor do select
    var tagCategoria = document.querySelector("#category-input");
    var categoria = tagCategoria.options[tagCategoria.selectedIndex].text;
    var descricao = document.getElementById("description-input").value;
    var video = document.getElementById("video-input").value;

    let object = {
        id: id,
        titulo: titulo,
        skill: skill,
        categoria: categoria,
        descricao: descricao,
        video: video,
    };

    //pegar os elementos do localStorage
    cards = "";
    cards = JSON.parse(localStorage.getItem("Cards"));
    cards.push(object);
    id++;

    //Envia o array e o id atualizados para o localStorage
    localStorage.setItem("Cards", JSON.stringify(cards));

    //Carregar elementos na tela
    carregarElementosNaTela(cards);

    //Atualizar Cards indicativos
    updateCardsIndicativos(cards);

    // Limpar os dados dos campos do formulario
    document.querySelector("[id='title-input']").value = ``;
    document.querySelector("[id='skill-input']").value = ``;
    document.querySelector(
        "[id='category-input']"
    ).value = `Selecione`;
    document.querySelector(
        "[id='description-input']"
    ).value = ``;
    document.querySelector("[id='video-input']").value = ``;

    //Mensagem de Sucesso
    window.alert(`SUCESSO!\n\nDica de título "${titulo}" cadastrada na base do conhecimento.`)
}

// Carregar elementos na tela
function carregarElementosNaTela(array) {
    let listaDeCards = document.querySelector("#cards");
    listaDeCards.innerHTML = "";

    array.forEach(function (card, index) {
        if (card.video == "") {
            listaDeCards.innerHTML += `<div id="data">
            <h3>${card.titulo}</h3>
            <p><strong>Linguagem/Skill:</strong> ${card.skill}</p>
            <p><strong>Categoria:</strong> ${card.categoria}</p>
            <textarea cols="30" rows="10">
            ${card.descricao}
            </textarea>
            <div id="card-botton">
                <button id="bin" type="button" onclick="deleteCard(${index})"><img src="./images/bin.png" alt="Remover"></button>
                <button id="edit" type="button" onclick="editCard(${index})"><img src="./images/edit.png" alt="Editar"></button>
            </div>
        </div>`;
        } else {
            listaDeCards.innerHTML += `<div id="data">
            <h3>${card.titulo}</h3>
            <p><strong>Linguagem/Skill:</strong> ${card.skill}</p>
            <p><strong>Categoria:</strong> ${card.categoria}</p>
            <textarea cols="30" rows="10">
            ${card.descricao}
            </textarea>
            <div id="card-botton">
                <button id="bin" type="button" onclick="deleteCard(${index})"><img src="./images/bin.png" alt="Remover"></button>
                <button id="edit" type="button" onclick="editCard(${index})"><img src="./images/edit.png" alt="Editar"></button>
                <a href="${card.video}" target="_blank">
                <button id="video" type="button">
                <img src="./images/video.png" alt="Remover">
                </button>
                </a>
            </div>
        </div>`;
        }
    });
}


// ==************== ACOES CARDS CRIADOS ==************== //

// ===== Barra de busca ===== //
function searchCard() {
    cards = JSON.parse(localStorage.getItem("Cards"));
    var searchInputValue = document.querySelector(".searchBar").value;

    searchResult = cards.find((n) => n.titulo == searchInputValue);
    if (searchResult != null) {
        carregarElementosNaTela([searchResult]);
    } else {
        window.alert(
            "O ítem que você está procurando não está na base de dados.\n\nConfira o texto digitado e tente novamente."
        );
    }
}

// ==== Botao Limpar input busca ==== //
function limparSearchBar() {
    cards = JSON.parse(localStorage.getItem("Cards"));
    document.querySelector("[id='searchBar']").value = "";
    carregarElementosNaTela(cards);
}

// ==== Botoes card: Deletar dica ==== //
function deleteCard(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));

    cards.forEach(function (card, index) {
        if (index == cardIndex) {
            var confirm = window.confirm(
                `DELETANDO!\n\nVocê tem certeza de que deseja deletar a dica de título: ${card.titulo}.\n\nClique em:\nCancelar: NÃO DELETAR a dica\nOK: DELETAR a dica.`
            );
        }
        if (index == cardIndex && confirm == true) {
            cards.splice(index, 1);
            //Atualizar as infos no localStorage
            localStorage.setItem("Cards", JSON.stringify(cards));
            carregarElementosNaTela(cards);
            updateCardsIndicativos(cards);
        }
    });
}

// ==== Botoes card: Editar dica ==== //
function editCard(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));

    window.alert('As informações da dica selecionada para edição serão enviadas para a barra lateral.\n\nRealize as devidas edições e clique em Salvar para finalizar.');

    cards.forEach(function (card, index) {
        if (index == cardIndex) {
            // Inserir os dados nos campos do formulario
            document.querySelector("[id='title-input']").value = `${card.titulo}`;
            document.querySelector("[id='skill-input']").value = `${card.skill}`;
            document.querySelector(
                "[id='category-input']"
            ).value = `${card.categoria}`;
            document.querySelector(
                "[id='description-input']"
            ).value = `${card.descricao}`;
            document.querySelector("[id='video-input']").value = `${card.video}`;
        }
    });

    var formButtons = document.getElementById('buttons');
    formButtons.innerHTML = '';
    formButtons.innerHTML += `<button class="btn-erase" type="cancelar" onclick="cancelEdition(${cardIndex})">Cancelar</button>
    <button id="btn-save1" class="btn-save" type="submit" onclick="saveEdition(${cardIndex})">Salvar Edição</button>`;
}

// Salvar a edicao feita na dica
function saveEdition(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));

    cards.forEach(function (card, index) {
        if (index == cardIndex) {
            var confirm = window.confirm(
                `Você deseja salvar as edições feitas na dica de título: ${card.titulo}.\n\nClique em:\n\nCancelar: Para cancelar a edição feita\nOK: Para confirmar o a edição`
            );
        }
        
        var titulo = document.getElementById("title-input").value;
        var skill = document.getElementById("skill-input").value;
        //pegar o valor do meu select
        var tagCategoria = document.querySelector("#category-input");
        var categoria = tagCategoria.options[tagCategoria.selectedIndex].text;
        var descricao = document.getElementById("description-input").value;
        var video = document.getElementById("video-input").value;

        if (index == cardIndex && confirm == true) {

            // Atualizar os valores do card
            card.titulo = titulo;
            card.skill = skill;
            card.categoria = categoria;
            card.descricao = descricao;
            card.video = video;

            // Atualizar as infos no localStorage
            localStorage.setItem("Cards", JSON.stringify(cards));
            carregarElementosNaTela(cards);
            updateCardsIndicativos(cards);

        } else if (index == cardIndex && confirm == false) {
            window.alert(`As edições da dica de título: ${card.titulo} estão sendo canceladas.`)
            formListener = false;
        }
        
        // Limpar os dados dos campos do formulario
        document.querySelector("[id='title-input']").value = ``;
        document.querySelector("[id='skill-input']").value = ``;
        document.querySelector(
            "[id='category-input']"
        ).value = ``;
        document.querySelector(
            "[id='description-input']"
        ).value = ``;
        document.querySelector("[id='video-input']").value = ``;

        //Atualizar os botoes
        let formButtons = document.getElementById('buttons');
        formButtons.innerHTML = '';
        formButtons.innerHTML += `<button class="btn-erase" type="reset">Limpar</button>
        <button id="btn-save1" class="btn-save" type="submit" onclick="displayCard()">Salvar</button>`;
    });

}

//Cancelar edicao da dica
function cancelEdition(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));

    cards.forEach(function (card, index) {
        if (index == cardIndex) {
            var confirm = window.confirm(
                `Você realmente deseja CANCELAR A EDIÇÃO da dica de título: ${card.titulo}.\n\nClique em:\n\nCancelar: Para voltar à edição\nOK: Para confirmar o cancelamento da edição`
            );
        }

        if (index == cardIndex && confirm == true) {
            // Limpar os dados dos campos do formulario
            document.querySelector("[id='title-input']").value = ``;
            document.querySelector("[id='skill-input']").value = ``;
            document.querySelector(
                "[id='category-input']"
            ).value = ``;
            document.querySelector(
                "[id='description-input']"
            ).value = ``;
            document.querySelector("[id='video-input']").value = ``;

            //Alterar os botoes do formulario
            let formButtons = document.getElementById('buttons');
            formButtons.innerHTML = '';
            formButtons.innerHTML += `<button class="btn-erase" type="reset">Limpar</button>
            <button id="btn-save1" class="btn-save" type="submit" onclick="displayCard()">Salvar</button>`;
        } else if (index == cardIndex && confirm == false) {
            window.alert(`As edições da dica de título: ${card.titulo} estão sendo canceladas.`)
        }
    });
}