const player1 = {
  NOME: 'Mario',
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0
}
const player2 = {
  NOME: 'Bowser',
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
  let random = Math.random()
  let result

  switch (true) {
    case random < 0.33:
      result = 'RETA'
      break
    case random < 0.66:
      result = 'CURVA'
      break

    default:
      result = 'CONFRONTO'
      break
  }

  return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
  return console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `
  )
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`)

    // sortear bloco
    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`)

    // rolar os dados

    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    // teste de habilidades

    let totalTestSkills1 = 0
    let totalTestSkills2 = 0

    if (block === 'RETA') {
      totalTestSkills1 = diceResult1 + character1.VELOCIDADE
      totalTestSkills2 = diceResult2 + character2.VELOCIDADE
      await logRollResult(
        player1.NOME,
        'Velocidade',
        diceResult1,
        character1.VELOCIDADE
      )
      await logRollResult(
        player2.NOME,
        'Velocidade',
        diceResult2,
        character2.VELOCIDADE
      )
    } else if (block === 'CURVA') {
      totalTestSkills1 = diceResult1 + character1.MANOBRABILIDADE
      totalTestSkills2 = diceResult2 + character2.MANOBRABILIDADE

      await logRollResult(
        player1.NOME,
        'MANOBRABILIDADE',
        diceResult1,
        character1.MANOBRABILIDADE
      )
      await logRollResult(
        player2.NOME,
        'MANOBRABILIDADE',
        diceResult2,
        character2.MANOBRABILIDADE
      )
    }
    if (block === 'CONFRONTO') {
      let powerResult1 = diceResult1 + character1.PODER
      let powerResult2 = diceResult2 + character2.PODER

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`)

      await logRollResult(player1.NOME, 'PODER', diceResult1, character1.PODER)
      await logRollResult(player2.NOME, 'PODER', diceResult2, character2.PODER)

      if (powerResult1 > powerResult2) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
        )
        if (character2.PONTOS > 0) character2.PONTOS--
      } else if (powerResult2 > powerResult1) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
        )
        if (character1.PONTOS > 0) character1.PONTOS--
      } else {
        console.log('Confronto empatado! Nenhum ponto foi perdido')
      }
    }

    if (block !== 'CONFRONTO') {
      if (totalTestSkills1 > totalTestSkills2) {
        console.log(`${character1.NOME} Marcou um ponto!`)
        character1.PONTOS++
      } else if (totalTestSkills1 < totalTestSkills2) {
        console.log(`${character2.NOME} Marcou um ponto!`)
        character2.PONTOS++
      }else{
        console.log(`Rodada empatada! Nenhum ponto foi marcado.`)
      }
    }

    console.log('----------------------------------------')
  }
}

async function declareWinner(character1, character2) {
  console.log('Resultado Final:')
  console.log(`${character1.NOME}: ${character1.PONTOS} Ponto(s)`)
  console.log(`${character2.NOME}: ${character2.PONTOS} Ponto(s)`)

  if (character1.PONTOS > character2.PONTOS)
    console.log(` \n${character1.NOME} Venceu a Corrida! Parabens! 🏆`)
  else if (character2.PONTOS > character1.PONTOS)
    console.log(` \n${character2.NOME} Venceu a Corrida! Parabens! 🏆`)
  else console.log('A corrida terminou em Empate!')
}

;(async function main() {
  console.log(
    `🏁🚨 Corrida Entre ${player1.NOME} e ${player2.NOME} começando... \n `
  )
  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})()
