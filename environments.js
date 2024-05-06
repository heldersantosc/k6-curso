import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "3s",
};

export default function () {
  const BASE_URL = __ENV.BASE_URL;
  const res = http.get(BASE_URL);

  //check para verificar o resultado da resposta
  check(res, { "status code é 200": (r) => r.status === 200 });
}
