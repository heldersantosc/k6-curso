import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      //10 vus vão fazer o máximo de iterações dependendo das config do pc
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
    },
  },
};

export default function () {
  http.get("https://test.k6.io/contacts.php");
  sleep(0.5);
}
