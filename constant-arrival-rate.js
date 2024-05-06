import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      //taxa de 30 iterações a cada 1 segundo
      executor: "constant-arrival-rate",
      duration: "30s",
      rate: 30, //taxa de iteração por segundo
      timeUnit: "1s",
      preAllocatedVUs: 50, //reserva 50 vus caso ainda existam vus não disponíveis
    },
  },
};

export default function () {
  http.get("https://test.k6.io/contacts.php");
}
