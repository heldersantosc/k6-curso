import { check } from "k6";
import http from "k6/http";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";

export const options = {
  vus: 1,
  duration: "3s",
};

const chamadas = new Counter("quantidade_de_chamadas");
const gauge = new Gauge("tempo_bloqueado");
const rate = new Rate("taxa_req_200");
const trend = new Trend("taxa_de_espera");

export default function () {
  const res = http.get("http://test.k6.io/");

  //check para verificar o resultado da resposta
  check(res, { "status code é 200": (r) => r.status === 200 });

  //adiciona 3 ao número de chamadas
  chamadas.add(2);

  //tempo que a requisição foi bloqueada
  gauge.add(res.timings.blocked);

  //o Rate neste caso está monitorando a taxa de solicitações bem-sucedidas em relação ao total de solicitações feitas.
  rate.add(res.status === 200);

  //o Trend neste caso está monitorando como o tempo de espera das solicitações HTTP está mudando ao longo do tempo durante a execução do teste.
  trend.add(res.timings.waiting);
}
