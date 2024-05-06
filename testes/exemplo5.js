import http from "k6/http";
import {check, sleep} from "k6";
import {SharedArray} from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

/*
* Critérios:
* Objetivo:
* - buscando todos os crocodilos
* performance test
* - 100 vu por 10 segundos
* Limites:
* - requisição com falha < 1%
* - duração da requisição p(95) < 250
* */

const BASE_URL = `https://test-api.k6.io`;

const csvData = new SharedArray("Leitura do json", function () {
    return papaparse.parse(open("./usuarios.csv"), {header: true}).data;
});

export const options = {
    stages: [{duration: "10s", target: 100}],
    thresholds: {
        http_req_failed: ["rate < 0.01"],
        http_req_duration: ["p(95) < 5000"],
    }
};

export function setup() {
    const {username, password} = csvData[Math.floor(Math.random() * csvData.length)];
    const loginResponse = http.post(`${BASE_URL}/auth/token/login/`, {username, password});
    return loginResponse.json("access");
}

export default function (token) {
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const response = http.get(`${BASE_URL}/my/crocodiles/`, params);

    check(response, {"status code 200": (r) => r.status === 200});
    sleep(1);
}
