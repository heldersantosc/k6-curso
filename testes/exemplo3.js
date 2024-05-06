import http from "k6/http";
import {check, sleep} from "k6";

/*
* Critérios:
* Objetivo:
* - realizar o registro de um novo usuário
* Teste de Desempenho
* - carga de 5 vu por 5 segundos
* Limites:
* - requisição de falha < 1%
* - duração da requisição p(95) < 500
* - requisição com sucesso superior a 95%
* */

export const options = {
    stages: [{duration: "5s", target: 5}],
    thresholds: {
        checks: ["rate > 0.95"],
        http_req_failed: ["rate < 0.01"],
        http_req_duration: ["p(95) < 2000"],
    }
};

export default function () {
    const BASE_URL = `https://test-api.k6.io`;
    const USER = `helder${Math.random()}@mail.com`;
    const PASS = "user123";

    const response = http.post(`${BASE_URL}/user/register/`, {
        email: USER,
        username: USER,
        password: PASS,
        first_name: "crocodilo",
        last_name: "dino",
    });

    console.log(USER, PASS);

    check(response, {"sucesso ao registrar": (r) => r.status === 201});
    sleep(1);
}
