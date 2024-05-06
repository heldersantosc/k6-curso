import http from "k6/http";
import {check, sleep} from "k6";
import {SharedArray} from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";


/*
* Critérios:
* Objetivo:
* - realizar o login com um novo usuário
* Stress test
* - ramp up 5 vu em 5s
* - carga 5 vu por 5s
* - ramp uo 50 vu em 2s
* - carga de 50 vu em 2s
* - ramp down 0 vu em 5s
* Limites:
* - requisição com falha < 1%
* */


export const options = {
    stages: [
        {duration: "5s", target: 5},
        {duration: "5s", target: 5},
        {duration: "2s", target: 50},
        {duration: "2s", target: 50},
        {duration: "5s", target: 0}],
    thresholds: {
        http_req_failed: ["rate < 0.01"],
    }
};

const csvData = new SharedArray("Leitura do json", function () {
    return papaparse.parse(open("./usuarios.csv"), {header: true}).data;
});


export default function () {
    const BASE_URL = `https://test-api.k6.io`;
    const {username, password} = csvData[Math.floor(Math.random() * csvData.length)];

    const response = http.post(`${BASE_URL}/auth/token/login/`, {username, password});

    console.log(username, password);

    check(response, {
        "sucesso ao realizar login": (r) => r.status === 200,
        "token gerado": (r) => r.json("access") !== ""
    });
    sleep(1);
}
