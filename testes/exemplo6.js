import http from "k6/http";

// k6 run exemplo6.js -e URL=https://test-api.k6.io/public

export const options = {
    scenarios: {
        listar: {
            executor: "constant-arrival-rate",
            exec: "listar",
            duration: "30s", //duração do teste
            rate: 200, //n° de solicitações por segundo
            timeUnit: "1s", //a cada 1 segundo
            preAllocatedVUs: 150,
            gracefulStop: "10s", //tempo após os testes para vu finalizar sem interrupções
            tags: {test_type: "listagem_de_crocodilos"}
        },
        buscar: {
            executor: "per-vu-iterations",
            exec: "buscar",
            vus: 50,
            iterations: 20,
            maxDuration: "1m",
            gracefulStop: "10s",
            tags: {test_type: "busca_de_crocodilos_id"}
        }
    },
    thresholds: {
        http_req_failed: ["rate < 0.01"],
        http_req_duration: ["p(95) < 5000"],
    }
};

export function listar() {
    http.get(__ENV.URL + "/crocodiles/");
}

export function buscar() {
    const crocodileId = __VU % 2 === 0 ? 2 : 1;
    http.get(__ENV.URL + "/crocodiles/" + crocodileId);
}
