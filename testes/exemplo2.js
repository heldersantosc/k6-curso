import http from "k6/http";
import {check, sleep} from "k6";
import {SharedArray} from "k6/data";

/*
* Critérios:
* Teste de Desempenho
* - ramp up 10 vu em 10 segundos
* - carga de 10 vu por 10 segundos
* - ramp down 0 vu em 10 segundos
* Limites:
* - requisição com sucesso > 95%
* - tempo de requisição p(90) > 2000
* */


export const options = {
    stages: [
        {duration: "10s", target: 10},
        {duration: "10s", target: 10},
        {duration: "10s", target: 0},
    ],
    thresholds: {
        checks: ["rate > 0.95"],
        http_req_duration: ["p(95) < 2000"],
    }
};

const data = new SharedArray("Leitura do json", function () {
    return JSON.parse(open("./dados.json")).crocodilos;
});

export default function () {
    const crocodile = data[Math.floor(Math.random() * data.length)].id;
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodile}`;
    console.info(crocodile);
    const response = http.get(BASE_URL);
    check(response, {"status code 200": (r) => r.status === 200});
    sleep(0.5);
}
