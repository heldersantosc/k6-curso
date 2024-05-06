import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      //10 vus precisam executar 20 iterações por vu
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 20,
      maxDuration: "30s",
    },
  },
};

export default function () {
  http.get("https://test.k6.io/contacts.php");
  sleep(0.5);
}
