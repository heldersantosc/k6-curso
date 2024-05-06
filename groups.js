import { check, group } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "3s",
  //aplicando limites apenas em um grupo
  thresholds: {
    "http_req_duration{group:::requisicao por id}": ["p(95) < 500"],
  },
};

export default function () {
  group("requisição todos crocodilos", function () {
    const response = http.get("https://test-api.k6.io/public/crocodiles/");
    check(response, { "status code é 200 get all": (r) => r.status === 200 });
  });

  group("requisicao por id", function () {
    const crocodile = http.get("https://test-api.k6.io/public/crocodiles/1");
    check(crocodile, { "status code é 200 get id": (r) => r.status === 200 });
  });
}
