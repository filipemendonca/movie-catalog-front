import Axios from "axios";

const ApiCore = (type, url, methodCallback) => {
  Axios({
    method: type,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    url: url,
  }).then(function (response) {
    methodCallback(response);
  });
};

export default ApiCore;
