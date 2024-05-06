import http from "k6/http";
import {check} from "k6";

/*
* Critérios:
* Smoke Test
* - 1 usuário por 30 segundos
* Limites:
* - requisição com sucesso > 99%
* */


export const options = {
    vus: 1,
    duration: "3s",
    thresholds: {
        checks: ["rate > 0.99"]
    }
};

export default function () {
    const BASE_URL = "https://test-api.k6.io/public/crocodiles/";
    const response = http.get(BASE_URL);
    check(response, {"status code 200": (r) => r.status === 200});
}
