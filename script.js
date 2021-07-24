document.querySelector('.busca').addEventListener('submit', async (event)=>{  // async essa função é assincrona
    event.preventDefault();  // evita comportamento padrao do evento, no caso, evita o envio do formulario
 
    let input = document.querySelector('#searchInput').value;

    if (input !== ''){
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=189198d296c445e2f7ee14c6a51dbfba&units=metric&lang=pt_br`;
        
        let results = await fetch(url); // await aguarda a informaçã chegar
        let json = await results.json(); // json é um objeto q contem todas as info

        if(json.cod === 200){  // 200 é o codigo quando acha a cidade
            showInfo({           // funçao q exibe as informações na tela
            name: json.name,
            country: json.sys.country,       // aqui so manda o necessario para exibir
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle:json.wind.deg
        });
        }else{
            clearInfo();
            showWarning('Não encontramos essa localização');

        }
    }


});

function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup> ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span> km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';  

}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
