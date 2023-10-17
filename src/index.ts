
const btnBuscar = document.getElementById('btn-buscar') as HTMLButtonElement;

window.addEventListener("load", function (event) {
    loadInfo();
});

if (btnBuscar) {
    const ciudadInput = document.getElementById('ciudad-input') as HTMLInputElement;
    btnBuscar.addEventListener('click', e => {
        let ciudad = ciudadInput.value;
        console.log(ciudad);
        loadInfo(ciudad);
    })
}



async function loadInfo(ciudad: string = 'Tegucigalpa') {
    try {
        const request = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=62afc9a123d04123b53234449231401&q=${ciudad}&aqi=no`);
        const json = await request.json();
        console.log(json);
        showInfo(json)

    } catch (error) {
        console.log(error);
    }
}

type json = {
    current: {
        cloud: number
        condition: {
            code: number
            icon: string
            text: string
        }
        feelslike_c: number
        feelslike_f: number
        gust_kph: number
        gust_mph: number
        humidity: number
        is_day: number
        last_updated: string
        last_updated_epoch: number
        precip_in: number
        precip_mm: number
        pressure_in: number
        pressure_mb: number
        temp_c: number
        temp_f: number
        uv: number
        vis_km: number
        vis_miles: number
        wind_degree: number
        wind_dir: string
        wind_kph: number
        wind_mph: number
    }
    location: {
        country: string
        lat: number
        localtime: string
        localtime_epoch: number
        lon: number
        name: string
        region: string
        tz_id: string
    }

}

function showInfo(json: json) {
    const ciudad = document.getElementById('ciudad');
    const pais = document.getElementById('pais');
    const fecha = document.getElementById('fecha');
    const estadoClima = document.getElementById('estado-clima');
    const estadoGrados = document.getElementById('estado-grados');
    const imgClima = document.getElementById('img-clima');
    const min = document.getElementById('min');
    const max = document.getElementById('max');


    const numeroSensacion = document.getElementById('numero-sensacion');
    const numeroHumedad = document.getElementById('numero-humedad');
    const numeroViento = document.getElementById('numero-viento');
    const faren = document.getElementById('faren'); 




    if (ciudad && pais && fecha && estadoClima && imgClima && estadoGrados && min && max) {
        ciudad.textContent = json.location.name;
        pais.textContent = json.location.country;
        fecha.textContent = json.location.localtime;
        estadoClima.textContent = json.current.condition.text;
        estadoGrados.textContent = String(json.current.temp_c) + "°C"; 
        imgClima.setAttribute("src", json.current.condition.icon);
        min.textContent = "Prep " + String(json.current.precip_in);
        max.textContent = "Prep mm " + String(json.current.precip_mm);
    }

    if( numeroSensacion  && numeroHumedad  && numeroViento && faren){
        numeroSensacion.textContent = String(json.current.feelslike_c);
        numeroHumedad.textContent = String(json.current.humidity);
        numeroViento.textContent = String(json.current.wind_mph); 
        faren.textContent = String(json.current.temp_f);
    }



}


