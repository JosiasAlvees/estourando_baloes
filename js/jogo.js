var timerID = null;  //Variável que armazena a chamada da função timeout

function iniciaJogo() {
    var url = window.location.search;
    var nivel_jogo = url.replace("?", " ");
    var tempo_segundos = 0;

    if (nivel_jogo == 1) {  //1 - Fácil = 120 segundos
        tempo_segundos = 120;
    }

    if (nivel_jogo == 2) {  //2 - Normal = 60 segundos
        tempo_segundos = 60;
    }

    if (nivel_jogo == 3) {  //3 - Díficil = 30 segundos
        tempo_segundos = 30;
    }

    //Inserindo segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //Criando balões
    var qtdBaloes = 5;
    
    criaBaloes(qtdBaloes);

    //Imprimir qtd balões inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtdBaloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1)
}


function contagem_tempo(segundos) {
    segundos = segundos -1;

    if (segundos == -1) {
        clearTimeout(timerID) //para a contagem da função
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerID = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    remove_eventos_baloes();
    alert('Fim de Jogo, você não conseguiu estourar todos os balões!');
}situacao_jogo:

function criaBaloes(qtdBaloes) {

    for(var i = 1; i <= qtdBaloes; i++){
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png"
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function(){
            estourar_balao(this)
        }

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar_balao(e){

    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if (baloes_inteiros == 0) {
        alert('Parabéns, você conseguiu estourar todos balões a tempo');

        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerID);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}