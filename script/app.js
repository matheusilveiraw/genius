
function btnGreenClick() { 
    confereJogo(0)
}

function btnRedClick() { 
    confereJogo(1)
    
}

function btnBlueClick() { 
    confereJogo(2)
}

function btnYellowClick() { 
    confereJogo(3)
}

function comecarJogo() { 


    //console.log('começa jogo')
    desabilitarComandos(2)
    contagem() //-> gera cor -> pisca cor -> 1 habilita comandos 2desabilita btn centro 3confere jogo 

}

function desabilitarComandos(desabilita = 5) { 

    let btnRed = document.getElementById('btnRed')
    let btnGreen = document.getElementById('btnGreen')
    let btnBlue = document.getElementById('btnBlue')
    let btnYellow = document.getElementById('btnYellow')
    let btnStart = document.getElementById('botao-centro')

    if(desabilita == 1) {
        btnStart.removeEventListener("click", comecarJogo);
    } else if(desabilita == 2){
        btnStart.removeEventListener("click", comecarJogo);
        btnRed.removeEventListener("click", btnRedClick);
        btnGreen.removeEventListener("click", btnGreenClick);
        btnBlue.removeEventListener("click", btnBlueClick);
        btnYellow.removeEventListener("click", btnYellowClick)
    } else { 
        btnRed.removeEventListener("click", btnRedClick);
        btnGreen.removeEventListener("click", btnGreenClick);
        btnBlue.removeEventListener("click", btnBlueClick);
        btnYellow.removeEventListener("click", btnYellowClick)
    }

}

function habilitarComandos(habilita =  5) { 

    let btnStart = document.getElementById('botao-centro')
    let btnRed = document.getElementById('btnRed')
    let btnGreen = document.getElementById('btnGreen')
    let btnBlue = document.getElementById('btnBlue')
    let btnYellow = document.getElementById('btnYellow')

    if(habilita == 1) { 
        btnStart.addEventListener("click", comecarJogo);
    } else { 
        btnRed.addEventListener("click", btnRedClick);
        btnGreen.addEventListener("click", btnGreenClick);
        btnBlue.addEventListener("click", btnBlueClick);
        btnYellow.addEventListener("click", btnYellowClick)
    }
}

function contagem() {

    let btnStart = document.getElementById('botao-centro')

    setTimeout(function() { 
        btnStart.innerText = "3..."
        
        setTimeout(function() { 
            btnStart.innerText = "2..."


            setTimeout(function() { 
                btnStart.innerText = "1..."

                setTimeout(function() {
                    btnStart.innerText = "Preste Atenção!"
                    geraCor()
                },1000)

        }, 1000)
        }, 1000)
    }, 1000)

}

function geraCor() { 

    let cor = getRandomIntInclusive(0, 3)
    //console.log("Cor" + cor)

    let cores = localStorage.getItem('cores')

    if(cores == null) { 
        cores = []
    } else { 
        cores = JSON.parse(cores)
    }

    cores.push(cor)

    //console.log(cores)

    localStorage.setItem('cores', JSON.stringify(cores))

    piscaCor()
}

function getRandomIntInclusive(min, max) { //0-3
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function piscaCor() { 

    let i = 0

    let cores = JSON.parse(localStorage.getItem('cores'))

    let btnRed = document.getElementById('btnRed')
    let btnGreen = document.getElementById('btnGreen')
    let btnBlue = document.getElementById('btnBlue')
    let btnYellow = document.getElementById('btnYellow')
    let btnStart = document.getElementById('botao-centro')

    var x = setInterval(function() { 

        var y = setTimeout(function() { 
            btnGreen.style = "background-color: rgb(0, 128, 0);"
            btnRed.style = "background-color: red;"
            btnBlue.style = "background-color: blue;"
            btnYellow.style = "background-color: amarelo;"
            //clearTimeout(y)
        }, 500)


        switch(cores[i]) {
            case 0:
                btnGreen.style = "background-color: rgb(52, 167, 52);"
                //console.log(i + 'verde')
            break
    
            case 1:
                btnRed.style = "background-color: rgb(199, 62, 62);"
                //console.log(i + 'vermelho')
            break
    
            case 2:
                btnBlue.style = "background-color: rgb(52, 52, 245)"
                //console.log(i + 'azul')
            break
        
            case 3:
                btnYellow.style = "background-color: rgb(255, 255, 75)"
                //console.log(i + 'amarelo')
            break
        }
        
        if(cores.length != i) { 
            //console.log('repete o ciclo')
            i++
        } else { 
            clearInterval(x)
            btnStart.innerText = "Clique nas cores em ordem!"
            habilitarComandos()
            desabilitarComandos(1)
            //confereJogo()
        }
            
    },1000)
}

let pontuacaoAtual = 0
let jogada = 0
let faseAtual = 1

function confereJogo(btn = 5) { 

    let cores = JSON.parse(localStorage.getItem('cores'))
    let btnStart = document.getElementById('botao-centro')

/* esse trecho era para fazer com que o código zerasse fase e pontuação assim que o jogador desse reiniciar

    console.log(cores.length)
    if(cores.length == 1) { 
        jogada = 0
        faseAtual = 1
        salvaPontuacao(pontuacaoAtual)
        salvaFaseAtual(faseAtual)
    }*/
/*
    console.log('Jogada ' + jogada)
    console.log(cores)
    console.log('btn' + btn)
    console.log('cor jogada' + cores[jogada])
*/
    if(btn == cores[jogada]) { 
        //console.log('prossiga!')
        jogada += 1
        pontuacaoAtual += 2
        salvaPontuacao(pontuacaoAtual)

        if(jogada == cores.length) { 
            btnStart.innerText = 'Comece o próximo round!'
            jogada = 0
            desabilitarComandos()
            habilitarComandos(1)
            faseAtual += 1
            salvaFaseAtual(faseAtual)
        }
    } else if(btn != cores[jogada]) { 
        //console.log('Errou!')
        jogada = 0
        btnStart.innerText = 'Perdeu! Reinicie!'
        cores = []
        localStorage.setItem('cores', JSON.stringify(cores))
        desabilitarComandos(2)
        habilitarComandos(1)
        pontuacaoAtual = 0
        faseAtual = 1
        } 
    //console.log('---')

    salvaRecordes()
}
  
function apagarStorage() { 
    let cores = []
    localStorage.setItem('cores', JSON.stringify(cores));
    //console.log("!!!")
}

function setScript(){ 
    apagarStorage()
    salvaRecordes()
    habilitarComandos(1)
}

function salvaPontuacao(pontuacaoAtual) { 

    let elementPontuacaoAtual = document.getElementById('pontuacao-atual')
    elementPontuacaoAtual.innerText = pontuacaoAtual
}

function salvaFaseAtual(faseAtual) { 

    let elementFaseAtual = document.getElementById('fase-atual')
    elementFaseAtual.innerText = faseAtual

}

function salvaRecordes() { 
    
    let elementFaseAtual = parseInt(document.getElementById('fase-atual').innerText)
    let elementPontuacaoAtual = parseInt(document.getElementById('pontuacao-atual').innerText)

    //console.log(elementFaseAtual)
    //console.log(elementPontuacaoAtual)

    let recordes = localStorage.getItem('recordes')

    //console.log(recordes)

    if(recordes == null) { 
        recordes = [0,0]
    } else { 
        recordes = JSON.parse(recordes)
    }
    //console.log(recordes)

    if(recordes[0] < elementFaseAtual) {
        recordes[0] = elementFaseAtual
    }

    if(recordes[1] < elementPontuacaoAtual) { 
        recordes[1] = elementPontuacaoAtual
    }

    //console.log(recordes)

    localStorage.setItem('recordes', JSON.stringify(recordes))

    document.getElementById('recorde-fase').innerText = recordes[0]

    document.getElementById('recorde-pontuacao').innerText = recordes[1]
}