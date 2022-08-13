// ****** FORMULARIO ****** //

// Informações iniciais
var valoresIniciais = [
  {
    id: 0,
    titulo: "A arte de comunicar",
    skill: "Comunicação",
    categoria: "Comportamental/SoftSkill",
    descricao:
      'Um bom comunicador é sempre um bom ouvinte. Quem sabe ouvir não perde informações, faz perguntas apropriadas e entende seu interlocutor. Você pode criar empatia com frases com frases como "Fale mais sobre esse tópico" ou "Estou interessado no que você diz. Fale mais detalhes para entender por que você pensa assim."',
    video: "https://www.youtube.com/watch?v=I9KSgDkBSQg",
  },
  {
    id: 1,
    titulo: "Grid vs Flex-Box",
    skill: "CSS",
    categoria: "FrontEnd",
    descricao:
      "A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e outro ser bi-dimensional, é que o controle do layout do grid vem do container e no flexbox vem dos elementos. A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e outro ser bi-dimensional, é que o controle do layout do grid vem do container e no flexbox vem dos elementos.",
    video: "https://www.youtube.com/watch?v=I9KSgDkBSQg",
  },
];

// Variaveis globais
var id = 2, cards = [], frontEnd = 0, backEnd = 0, fullStack = 0, softSkill = 0, total = 0;

// Carregar dados do Local Storage
cards = JSON.parse(localStorage.getItem("Cards"));
if (cards == null) {
    window.addEventListener("load", ()=>{localStorage.setItem("Cards", JSON.stringify(valoresIniciais));
    carregarElementosNaTela(valoresIniciais);
    cards = JSON.parse(localStorage.getItem("Cards"));
    updateCardsIndicativos(cards);
    formCleaner();
    });
} else {
    window.addEventListener("load", ()=>{
        carregarElementosNaTela(cards);
        updateCardsIndicativos(cards);
        formCleaner();
    });
}

// === Carregar Cards indicativos === //
function updateCardsIndicativos(array) {
    var cardTotal = document.getElementById('qtd-total');
    var cardFrontEnd = document.getElementById('qtd-frontend');
    var cardBackEnd = document.getElementById('qtd-backend');
    var cardFullStack = document.getElementById('qtd-fullstack');
    var cardSoftSkill = document.getElementById('qtd-softskill');
    frontEnd = 0, backEnd = 0, fullStack = 0, softSkill = 0, total = 0;
    
    //Contagem dos itens
    array.forEach(function(card, index) {
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
botao = document.getElementById("btn-save1");

botao.addEventListener("click", displayCard);


// ======= Criar elemento, enviar para o Local Storage e imprimir na tela ====== //
var javascript_DOM_methods_are_efficient = false;

function displayCard() {
  if (javascript_DOM_methods_are_efficient) {
    console.log("");
  } else {
    var titulo = document.getElementById("title-input").value;
    var skill = document.getElementById("skill-input").value;
    //pegar o valor do meu select
    var tagCategoria = document.querySelector("#category-input");
    var categoria = tagCategoria.options[tagCategoria.selectedIndex].text;
    var descricao = document.getElementById("description-input").value;
    var video = document.getElementById("video-input").value;

    if (titulo == "" || skill == "" || categoria == "" || descricao == "") {
      window.alert("O formulário precisa ser preenchido antes de ser enviado.");
    } else {
        
        //criar o objeto
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

        //Limpar formulario
        formCleaner();
    }
  }
}

function init() {
  document
    .getElementById("btn-save1")
    .addEventListener("click", displayCard, false);
}
document.addEventListener("DOMContentLoaded", init, false);


// Carregar elementos na tela
function carregarElementosNaTela(array) {
  let listaDeCards = document.querySelector("#cards");
  listaDeCards.innerHTML = "";

  array.forEach(function (card, index) {
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
  });
}

// ===== Funcao Limpar campos do Formulario ===== //
function formCleaner() {
    document.querySelector("[id='title-input']").value = "";
    document.querySelector("[id='skill-input']").value = "";
    document.querySelector("[id='category-input']").value = 'Selecione';
    document.querySelector("[id='description-input']").value = "";
    document.querySelector("[id='video-input']").value = "";
}


// ==************== ACOES CARDS CRIADOS ==************== //

// ===== Barra de busca ===== //
function searchCard(){
    cards = JSON.parse(localStorage.getItem("Cards"));
    var searchInputValue = document.querySelector('.searchBar').value;

    searchResult = cards.find(n => n.titulo == searchInputValue);
    if (searchResult != null) {
        carregarElementosNaTela([searchResult]);
    } else {
        window.alert('O ítem que você está procurando não está na base de dados.\n\nConfira o texto digitado e tente novamente.')
    }
}

// ==== Botao Limpar input busca ==== //
function limparSearchBar(){
    cards = JSON.parse(localStorage.getItem("Cards"));
    document.querySelector("[id='searchBar']").value = "";
    carregarElementosNaTela(cards);
}

//Criar o botao btn-save com a funcao salvar >>> ainda nao esta pronto
// function setarBotaoFormParaSalvar() {
//     var botoesFormulario = document.querySelector(".buttons");
//     botoesFormulario.innerHTML = `<button class="btn-erase" type="reset">Limpar</button>
//     <button id="btn-save1" class="btn-save" type="button" onclick="editar()">Salvar Edição</button>`
// }

// ==== Botoes card: Deletar dica ==== //
function deleteCard(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));
        
    cards.forEach(function(card, index) {
        if (index == cardIndex) {
            var confirm = window.confirm(`Você realmente deseja excluir o Card de título: ${card.titulo}.`);
        }
        if (index == cardIndex && confirm == true) {
            cards.splice(index,1);
            //Atualizar as infos no localStorage
            localStorage.setItem("Cards", JSON.stringify(cards));
            carregarElementosNaTela(cards);
            updateCardsIndicativos(cards);
        };
    });
}

// ==== Botoes card: Editar dica ==== //
function editCard(cardIndex) {
    cards = JSON.parse(localStorage.getItem("Cards"));
    
    cards.forEach(function(card, index) {
        if (index == cardIndex) {
            var confirm = window.confirm(`Você realmente deseja editar o Card de título: ${card.titulo}.`);
        }
        if (index == cardIndex && confirm == true) {
            // Inserir os dados nos campos do formulario
            document.querySelector("[id='title-input']").value = `${card.titulo}`;
            document.querySelector("[id='skill-input']").value = `${card.skill}`;
            document.querySelector("[id='category-input']").value = `${card.categoria}`;
            document.querySelector("[id='description-input']").value = `${card.descricao}`;
            document.querySelector("[id='video-input']").value = `${card.video}`;

            // Mudar o atributo do botao salvar
            let saveBtn = document.getElementById('btn-save1');
            saveBtn.setAttribute("onclick", saveEdition());
            saveBtn.setAttribute("onclick", '');
        };
    });
}

// Funcao para salvar a edicao feita no Card
function saveEdition() {
    cards = JSON.parse(localStorage.getItem("Cards"));
    
    cards.forEach(function(card, index) {
        if (index == cardIndex) {
            var titulo = document.getElementById("title-input").value;
            var skill = document.getElementById("skill-input").value;
            //pegar o valor do meu select
            var tagCategoria = document.querySelector("#category-input");
            var categoria = tagCategoria.options[tagCategoria.selectedIndex].text;
            var descricao = document.getElementById("description-input").value;
            var video = document.getElementById("video-input").value;

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
        }
    })
}

// Ideia: Quando clicado pode carregar o formulário de cadastro para edição, facilitando a codificação do sistema.

// ==== Botoes card: Abrir Video ==== //

// ****** Alertas ****** //

// ===== Alerta de EDICAO ===== //

// EDICAO!
// As informações da dica selecionada para eição foram enviadas para a barra lateral.
// Realize as devidas edições e clique em Salvar para finalizar.
// Opcoes: OK

// ===== Alerta de SUCESSO ===== //

// SUCESSO!
// Dica cadastrada na base do conhecimento.
// Opcoes: OK

// ===== Alerta de DELECAO ===== //

// Msg de confirmacao
// DELETANDO!
//  Você tem certeza de que deseja deletar esta dica?
// Opcoes: SIM E NAO

// ======= Estrutura pode ser usada ========= //

// var botao = document.getElementsByClassName('btn');
// var info = document.getElementsByClassName('info');

// botao.addEventListener('click', () => {
//     var input = document.getElementsByClassName('cep-entrada').value;
//     info.innerHTML = "";

//     // Fetch
//     const options = {
//         method: "GET",
//         header: {'contentType': 'application/json'},
//     }

//     fetch(`https://viacep.com.br/ws/${input}/json/`, options)
//     .then((response)=>{
//         return response.json(); // o .json() transforma a requisicao em JSON
//     }).then((response)=>{ // o segundo .then e para trazer o response em formato de json
//         info.innerHTML += `<br><br>Bairro: ${response.bairro}`;
//         info.innerHTML += `<br>Logradouro: ${response.logradouro}`;
//         info.innerHTML += `<br>Localidade: ${response.localidade}`;
//     }).catch((err)=>{
//         console.error(err)
//     });
// })
