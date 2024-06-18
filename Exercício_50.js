const prompt = require('prompt-sync')()
const colors = require('colors')

/* na descrição da questão a estrutura de dados é baseada em hotel e reservas vou considerar que cada hotel será um objeto que eu vou inserir num array de hoteis */

function objetoHotel (id,nome,cidade,quartosTotais,quartosDisponiveis){
    var objHotel = {}
    objHotel.id = id,
    objHotel.nome = nome,
    objHotel.cidade = cidade,
    objHotel.quartosTotais = quartosTotais,
    objHotel.quartosDisponiveis = quartosDisponiveis
    return objHotel
}

function objetoReserva (idReserva,idHotel,nomeCliente){
    var objReserva = {}
    objReserva.idReserva = idReserva,
    objReserva.idHotel = idHotel,
    objReserva.nomeCliente = nomeCliente
    return objReserva
}

/* essas funções vão servir pra criar os objetos respectivos, mas veja que elas dependem de entradas. Eu vou armazenar os objetos hotel e objetos reservas em arrays distintos */

let todosHoteis = []
let todasReservas = []

/* Funcionalidade 1: para adicionar um hotel vou criar uma funçao */

function adicionarHotel(id,nome,cidade,quartosTotais,quartosDisponiveis){
    var novoHotel = objetoHotel(id,nome,cidade,quartosTotais,quartosDisponiveis)
    todosHoteis.push(novoHotel)
    console.log('\nHotel '+nome+' adicionado com sucesso!\n'.green)
}
/* vou adicionar 8 hoteis alguns em cidades repetidas mas com nomes e propriedades diferentes */
adicionarHotel(1,'Jangada','Aracaju',20,5)
adicionarHotel(2,'Paju','Maceio',15,3)
adicionarHotel(3,'Farol','Salvador',30,10)
adicionarHotel(4,'Marco','Recife',100,90)
adicionarHotel(5,'Delmar','Aracaju',200,50)
adicionarHotel(6,'Carmo','Salvador',40,0)
adicionarHotel(7,'Da Barra','Salvador',50,2)
adicionarHotel(8,'Ponta Verde', 'Maceio',23,7)

console.log('Esses são todos os hoteis nas suas condições iniciais: \n'.yellow)
console.log(todosHoteis)

/* Funcionalidade 2: buscar hoteis por cidade. Vou criar uma função com o método filter que leia o array*/

function buscarHoteisNaCidade(cid){
    var hoteisNaCid = []
    todosHoteis.forEach(element => {
        if(element.cidade == cid)
            {(hoteisNaCid).push(element.nome)}
    });
console.log('Hoteis em '+cid+': '+hoteisNaCid.join(' , '))
}

console.log('\nBusca de hoteis em diferentes cidades: \n'.yellow)
/* Os hoteis de Salvador são */
buscarHoteisNaCidade('Salvador')
/* Os hoteis de Aracaju são */
buscarHoteisNaCidade('Aracaju')

/* Funcionalidade 3: fazer reserva eu já tenho uma função para um objeto reserva, irei chamá-la pra criar reservas */

function criarReserva(idReserva,idHotel,nomeCliente){
    /* a variavel hotelDaReserva vai trazer o objeto do hotel aonde vai acontecer a reserva a tona */

    var hotelDaReserva = todosHoteis.find(function (elementoDeHoteis){
        return elementoDeHoteis.id === idHotel
    })
    if(!hotelDaReserva){console.log('A reserva de '+nomeCliente+' não pode ser criada pois o hotel com id '+idHotel+' não consta no nosso sistema!'.magenta)   /* para o caso aonde o id do hotel não existe */
        return /* preciso colocar o returno caso contrário ele vai pra seguinte condição e como nesse caso hotelDaReserva não existe, não haverá hotelDareserva.quartosDisponíveis e teremos um erro */
    }
    if(hotelDaReserva.quartosDisponiveis == 0){console.log('\nO hotel da reserva de '+nomeCliente+' não tem quartos disponíveis\n'.red) /* para o caso aonde não tem quartos no hotel */
        return
    }
    
    var novaReserva = objetoReserva(idReserva,idHotel,nomeCliente)  /* todos os outros casos aonde o idHotel da reserva tem um id correspondete em todosHoteis */
    todasReservas.push(novaReserva)
    console.log('\nReserva de '+nomeCliente+' e id '+idReserva+' criada com sucesso!\n'.green)
    todosHoteis.forEach(element => {  /* atualiza o numero de quartos no array de todos os Hoteis */
        if(element.id == hotelDaReserva.id){
            element.quartosDisponiveis--
        }
    });

}


criarReserva(1,8,'Lucas') /* repare que o numero de quartos disponíveis no hotel 8 diminue */
criarReserva(2,3,'Tiago')
criarReserva(3,6,'Maria' ) /* esse hotel nao tem quartos disponiveis, exibira essa mensagem */
criarReserva(4,8,'Joana')
criarReserva(5,19,'Fausto') /* essa reserva não pode ser criada porque não há um hotel com id 19 */

console.log('\nO array com todas as reservas pode ser visto abaixo: \n'.yellow)

console.log(todasReservas)

console.log('\nDepois das reservas o número de quartos disponíveis nos hoteis com reserva diminuiram: \n'.yellow)

console.log(todosHoteis)

function cancelarReserva(idReservaCancelada){
    /* a variavel cancelada vai trazer o objeto a ser cancelado a tona */
    
    var cancelada = todasReservas.find(function (elemento){
        return elemento.idReserva == idReservaCancelada
    })
    if(!cancelada){console.log('Essa reserva com esse id '+idReservaCancelada+' não existe')
        return
    
}
console.log('Reserva de número '+cancelada.idReserva+' de '+cancelada.nomeCliente+' foi cancelada'.yellow)
todasReservas.forEach(element => {
    if(cancelada.idReserva == element.idReserva){
        element.s = ' CANCELADA'    /* adiciona o termo cancelada na matriz principal de todas as reservas */
    }
})
todosHoteis.forEach(element => {
    if(cancelada.idHotel == element.id)
    {element.quartosDisponiveis = element.quartosDisponiveis + 1} /* após o cancelamento adiciona um quarto a mais no array principal de todosHoteis no respectivo hotel */
});

}

console.log('\nVamos considerar que Tiago cancelou sua reserva: \n'.yellow)
cancelarReserva(2)


console.log('\nO array de reservas é atualizado com o status CANCELADA para Tiago \n'.magenta)
console.log(todasReservas)

console.log('\nO número de quartos volta ao inicial após o cancelamento da Tiago no hotel 3 \n'.yellow)
console.log(todosHoteis)
