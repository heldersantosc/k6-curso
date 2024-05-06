import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "3s",
  thresholds: {
    // definição da taxa de falha
    http_req_failed: ["rate < 0.01"],
    // 90% das requisições devem estar abaixo de 200 milisegundos
    // 95% das requisições devem estar abaixo de 300 milisegundos com abort do test
    http_req_duration: [
      "p(90) < 300",
      { threshold: "p(95) < 300", abortOnFail: true },
    ],
    //taxa de verificação bem sucedida dever ser maior que 90%
    checks: ["rate > 0.9"],
  },
};

export default function () {
  const res = http.get("http://test.k6.io/");

  //check para verificar o resultado da resposta
  check(res, { "status code é 200": (r) => r.status === 200 });
}
