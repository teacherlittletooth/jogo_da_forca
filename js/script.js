const letra = document.getElementById("letra")
const jogar = document.getElementById("jogar")
const conteudo = document.getElementById("conteudo")
const enviar = document.getElementById("enviar")
const lista = document.getElementById("lista")
const palavra = document.getElementById("palavra")
const placar = document.getElementById("placar")
const boneco = document.getElementById("boneco")

var tentativas = []

var palavras = Array(
    "Carro",
    "Casa",
    "Dinheiro",
    "Escola",
    "Flor",
    "Lâmpada",
    "Bola"
)

var sorteio = Math.floor( Math.random() * palavras.length )
var palavraSorteada = palavras[sorteio].toUpperCase().split("")
var palavraSecreta = []

palavraSorteada.forEach( () => palavraSecreta.push("_") )

console.log( palavraSorteada )
console.log( palavraSecreta )

var vidas = 6
var acertos = 0

placar.innerHTML = vidas
palavraSecreta.forEach( () => palavra.innerHTML += "_ " )

function pegaLetra() {
    if(estaVazio()) {
        alert("Digite uma LETRA!")
    } else if(!testaLetra()) {
        alert("Digite apenas LETRAS!")
    } else if(repetida()) {
        alert("Letra repetida!")
    } else {
        tentativas.unshift(letra.value.toUpperCase())
        lista.innerHTML = tentativas
        adivinharLetra()
    }

    letra.value = ""
    letra.focus()

    perdeu()
    ganhou()
}


function estaVazio() {
    return (letra.value == "" || letra.value == " ")
}

function testaLetra() {
    return (/[a-zA-Z]|ç/.test(letra.value))
}

function repetida() {
    return tentativas.find( (item) => item == letra.value.toUpperCase())
}

function adivinharLetra() {
    let errou = true
    palavraSorteada.find( function(item, index){
        let itemSemAcento = item.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        if( letra.value.toUpperCase() == itemSemAcento ) {
            palavraSecreta[index] = item
            console.log( palavraSecreta )
            errou = false
            acertos++
            //console.log(acertos)
            palavra.innerHTML = ""
            palavraSecreta.forEach( (i) => palavra.innerHTML += i + " " )
        }
    })
    if(errou) {
        vidas--
        //console.log(vidas)
        placar.innerHTML = vidas
        boneco.src = "img/" + vidas + ".png"
    }
}

function ganhou() {
    if( acertos == palavraSorteada.length ) {
        setTimeout(() => {
            if( confirm( "Parabéns! Você ganhou!\nDeseja jogar novamente?" ) ) {
                window.location.reload()
            } else {
                window.close()
            }
        }, 500);
    }
}

function perdeu() {
    if( vidas == 0 ) {
        setTimeout(() => {
            if( confirm( "Você perdeu!\nDeseja jogar novamente?" ) ) {
                window.location.reload()
            } else {
                window.close()
            }
        }, 500);
    }
}

enviar.addEventListener("click", pegaLetra)

letra.addEventListener("input", function(){
    enviar.focus()
})

function iniciar() {
    conteudo.style.display = "block"
    jogar.style.display = "none"
    letra.focus()
}