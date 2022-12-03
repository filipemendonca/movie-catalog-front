import Axios from "axios";

const ApiCore = (type, url, data, methodCallback) => {
  Axios({
    method: type,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    url: url,
    data: data,
  })
    .then(function (response) {
      methodCallback(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default ApiCore;
