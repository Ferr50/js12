var speedPedro = 0;
var speedJuca = 0;
var speedMaria = 0;

var quantVoltas = 0;

var lap_winner_pedro = [0,'pedro'];
var lap_winner_juca = [0,'juca'];
var lap_winner_maria = [0,'edna'];

var winnerRace = [,,];

var vetCar = [,,];

var carPedro = new Object();
var carJuca = new Object();
var carEdna = new Object();

var carPop = {
    type: 'popular',
    maxSpeed: [180, 200],
    minSpeed: [110,130],
    skid: [3,4]
};

var carSport = {
    type: 'sport',
    maxSpeed: [195, 215],
    minSpeed: [125,145],
    skid: [2,3]
};

var carSupSport = {
    type: 'super sport',
    maxSpeed: [210, 230],
    minSpeed: [140,160],
    skid: [1,1.75]
};



function race() {
    document.getElementById("lap_winner").style.display = 'flex';
    document.getElementById("race_winner_box").style.display = 'flex';
    quantVoltas = document.querySelector('input[name="track"]:checked').value;
    lap_winner_pedro[0] = 0;
    lap_winner_juca[0] = 0;
    lap_winner_maria[0] = 0;
    laps(quantVoltas);

    winnerRace = [lap_winner_pedro,lap_winner_juca,lap_winner_maria];
    winnerRace.sort();
    
    
    while(winnerRace[2][0] == winnerRace[1][0]){
        laps(1);
        winnerRace = [lap_winner_pedro,lap_winner_juca,lap_winner_maria];
        winnerRace.sort();
    }
    
    switch (winnerRace[2][1]) {
        case 'pedro':
            carPedro.pontos += 200;
            carPedro.pontosFake += 200;
            break;
        case 'juca':
            carJuca.pontos += 200;
            carJuca.pontosFake += 200;
            break;
        case 'edna':
            carEdna.pontos += 200;
            carEdna.pontosFake += 200;
            break;
    
        default:
            break;
    }

    switch (winnerRace[1][1]) {
        case 'pedro':
            carPedro.pontos += 120;
            carPedro.pontosFake += 120;
            break;
        case 'juca':
            carJuca.pontos += 120;
            carJuca.pontosFake += 120;
            break;
        case 'edna':
            carEdna.pontos += 120;
            carEdna.pontosFake += 120;
            break;
    
        default:
            break;
    }

    switch (winnerRace[0][1]) {
        case 'pedro':
            carPedro.pontos += 50;
            carPedro.pontosFake += 50;
            break;
        case 'juca':
            carJuca.pontos += 50;
            carJuca.pontosFake += 50;
            break;
        case 'edna':
            carEdna.pontos += 50;
            carEdna.pontosFake += 50;
            break;
    
        default:
            break;
    }

    document.getElementById("lap_pedro").innerHTML = 'Voltas Vencidadas: ' + lap_winner_pedro[0];
    document.getElementById("lap_juca").innerHTML = 'Voltas Vencidadas: ' + lap_winner_juca[0];
    document.getElementById("lap_maria").innerHTML = 'Voltas Vencidadas: ' + lap_winner_maria[0];
    document.getElementById("ponto_pedro").innerHTML = 'Total de Pontos: ' + carPedro.pontos;
    document.getElementById("ponto_juca").innerHTML = 'Total de Pontos: ' + carJuca.pontos;
    document.getElementById("ponto_edna").innerHTML = 'Total de Pontos: ' + carEdna.pontos;
    document.getElementById("lvl_pedro").innerHTML = 'Level do Carro: ' + carPedro.level;
    document.getElementById("lvl_juca").innerHTML = 'Level do Carro: ' + carJuca.level;
    document.getElementById("lvl_edna").innerHTML = 'Level do Carro: ' + carEdna.level;
    document.getElementById("race_winner").innerHTML = winnerRace[2][1];

  }


 function speedLap(min, max, der) {

    let speed = (Math.random() * (max - min) + min) * ((100 - der)/100);


    return speed;


  }

  function speedPerLap(){
    speedPedro = speedLap(carPedro.velMin, carPedro.velMax, carPedro.derrapagem);
    speedJuca = speedLap(carJuca.velMin, carJuca.velMax, carJuca.derrapagem);
    speedMaria = speedLap(carEdna.velMin, carEdna.velMax, carEdna.derrapagem);

  }

function laps(numberLaps) {

    if(speedPedro == 0){
        geraCarro(carPedro);
        geraCarro(carJuca);
        geraCarro(carEdna);
        vetCar = [carPedro, carJuca, carEdna];
    }

    vetCar.forEach((element) => {

        if(element.pontosFake >=450){
            if(element.level < 1.1){
                element.level = 1 + 0.01 * Math.trunc(element.pontos/450);
                element.velMax = element.velMax * element.level;
                element.velMin = element.velMin * element.level;
                element.pontosFake = element.pontosFake - 450;
            }    
        }
        
        console.log(element)
        });
    

    for (var i = 0; i < numberLaps; i++) {
        speedPerLap();
        if(speedPedro > speedMaria) {
            if(speedPedro > speedJuca){
                lap_winner_pedro[0] = lap_winner_pedro[0] + 1;
            }else{
                lap_winner_juca[0] = lap_winner_juca[0] + 1;
            }
        }else {
            if(speedMaria > speedJuca) {
                lap_winner_maria[0] = lap_winner_maria[0] + 1;
            }else{
                lap_winner_juca[0] = lap_winner_juca[0] + 1;
            }
        }

     }
}

function geraCarro(obj) {

    obj.pontosFake = 0;
    obj.pontos = 0;
    obj.level = 1;
    obj.rar = rarityCar();
    obj.velMax = velMax(obj.rar) * obj.level;
    obj.velMin = velMin(obj.rar) * obj.level;
    obj.derrapagem = derrap(obj.rar);
    



}


function rarityCar() {
    var rarity = Math.random() * 100;

    if(rarity <=60) {
        return carPop.type;
    }else{
        if(rarity <= 95) {
            return carSport.type;
        }else{
            return carSupSport.type;
        }
    }

}

function velMax(type) {

    switch (type) {
        case carPop.type:
            return (Math.random() * (carPop.maxSpeed[1]-carPop.maxSpeed[0]) + carPop.maxSpeed[0]);
        case carSport.type:
            return (Math.random() * (carSport.maxSpeed[1]-carSport.maxSpeed[0]) + carSport.maxSpeed[0]);
        case carSupSport.type:
            return (Math.random() * (carSupSport.maxSpeed[1]-carSupSport.maxSpeed[0]) + carSupSport.maxSpeed[0]);            
    
        default:
            break;
    }

}

function velMin(type) {

    switch (type) {
        case carPop.type:
            return (Math.random() * (carPop.minSpeed[1]-carPop.minSpeed[0]) + carPop.minSpeed[0]);
        case carSport.type:
            return (Math.random() * (carSport.minSpeed[1]-carSport.minSpeed[0]) + carSport.minSpeed[0]);
        case carSupSport.type:
            return (Math.random() * (carSupSport.minSpeed[1]-carSupSport.minSpeed[0]) + carSupSport.minSpeed[0]);            
    
        default:
            break;
    }

}

function derrap(type) {

    switch (type) {
        case carPop.type:
            return (Math.random() * (carPop.skid[1]-carPop.skid[0]) + carPop.skid[0]);
        case carSport.type:
            return (Math.random() * (carSport.skid[1]-carSport.skid[0]) + carSport.skid[0]);
        case carSupSport.type:
            return (Math.random() * (carSupSport.skid[1]-carSupSport.skid[0]) + carSupSport.skid[0]);            
    
        default:
            break;
    }

}
