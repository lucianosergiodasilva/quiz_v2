
// Armazena as alternativas
let alts = document.querySelectorAll('.alternativa')

// Armazena os pontos
let pontos = document.getElementById('pontos')

// Armazena o resultado
let resultado = document.getElementById('resultado')

let btnReiniciar = document.querySelector('#btnReiniciar')



let barra = document.querySelector('#barra')

// Objeto da pergunta
let perguntas = [
    {
        titulo: '0) Perguna',
        alternativas: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
        correta: 'Resposta correta',
        pagina: 0,
    },
    {
        titulo: '1) Gato',
        alternativas: ['Gat', 'Cat', 'Gate', 'Dog'],
        correta: 1,
        pagina: 1,
    },
    {
        titulo: '2) Fire',
        alternativas: ['Fogo', 'Água', 'Terra', 'Ar'],
        correta: 0,
        pagina: 2,
    },
    {
        titulo: '3) Bird',
        alternativas: ['Gato', 'Urubú', 'Pombo', 'Pássaro'],
        correta: 3,
        pagina: 3,
    },
]

let app = {
    // Mostra a questão, Trata o clique e Checa a resposta
    start: function () {

        this.posicaoAtual = 1
        this.totalPontos = 0
        this.paginaAtual = this.posicaoAtual

        //  FUNCIONAMENTO DO FOREACH: Para cada elemento de alts vou chamar uma função que recebe um elemento e a posição desse elemento.

        // Adiciona um evento de clique em cada alternativa.
        alts.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.checaResposta(index)
            })
        })

        this.atualizaPontos()
        app.mostraQuestao(perguntas[this.posicaoAtual])
    },

    // Mostra a questão
    mostraQuestao: function (q) {

        // Questão atual
        this.qAtual = q

        // Mostra o título
        let tituloDiv = document.getElementById('titulo')
        tituloDiv.textContent = q.titulo

        //  FUNCIONAMENTO DO FOREACH: Para cada elemento de alts vou chamar uma função que recebe um element e a posição desse elemento em index.

        // Mostra as alternativas
        alts.forEach(function (element, index) {
            element.textContent = q.alternativas[index]
        })

        // Mostra pagina
        let paginacao = document.getElementById('paginacao')
        paginacao.textContent = q.pagina + ' de ' + (perguntas.length - 1)

        // Atualiza a barra de progresso
        barra.value = q.pagina
        if (q.pagina == 0) {
            barra.style.width = '0%'
        }
        else if (q.pagina <= 1) {
            barra.style.width = '5%'

        }
        else if (q.pagina <= 2) {
            barra.style.width = '40%'

        }
        else if (q.pagina <= 3) {
            barra.style.width = '100%'

        } else {

        }
    },

    proximaPergunta: function () {
        this.posicaoAtual++
        if (this.posicaoAtual == perguntas.length) {
            // this.posicaoAtual = 1
            btnReiniciar.classList.remove('esconder')
        }

    },

    checaResposta: function (resposta) {
        if (this.qAtual.correta == resposta) {
            this.totalPontos += 10
            this.mostraResultado(true)
            console.log('Acertou!')
        } else {
            this.mostraResultado(false)
            console.log('Errou!')
        }

        this.atualizaPontos()
        this.proximaPergunta()
        this.mostraQuestao(perguntas[this.posicaoAtual])
    },

    atualizaPontos: function () {
        pontos.textContent = `Sua pontuação é: ${this.totalPontos}`
    },

    mostraResultado: function (correto) {
        let result = ''
        if (correto) {
            result = 'Alternativa correta'
        }
        else {
            // Questão atual
            let pergunta = perguntas[this.posicaoAtual]

            // Índice da alternativa correta, da questão atual
            let indexCorreto = pergunta.correta

            // Texto da alternativa correta, da questão atual
            let textoCorreto = pergunta.alternativas[indexCorreto]
            result = `Errou! Alternativa correta é: ${textoCorreto}`
        }
        resultado.textContent = result
    },
}

btnReiniciar.addEventListener('click', () => {
    location.reload()
})

// Excetucanto a função 
app.start()


