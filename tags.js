import { check, group } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "3s",
  tags: {
    name: "meu-test",
  },
  //verificando limite somente para a tag busca-todos
  thresholds: {
    "http_req_duration{tipo:busca-todos}": ["p(95) < 500"],
  },
};

export default function () {
  group("requisição todos crocodilos", function () {
    const response = http.get("https://test-api.k6.io/public/crocodiles/", {
      tags: { tipo: "busca-todos" },
    });
    check(response, { "status code é 200 get all": (r) => r.status === 200 });
  });

  group("requisicao por id", function () {
    const crocodile = http.get("https://test-api.k6.io/public/crocodiles/1", {
      tags: { tipo: "busca-id" },
    });
    check(crocodile, { "status code é 200 get id": (r) => r.status === 200 });
  });
}
