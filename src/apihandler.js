const axios = require('axios');

function ServiceCall(sender, type, fulladdress, postdata, successcb, errorcb, alwayscb, callbackdata) {
  switch (type) {
    case "GET":
      //let data = "";
      //if (postdata) {
      //  data = JSON.stringify(postdata);
      //}
      axios.get(fulladdress, { params: postdata })
        .then(function (response) {
          // handle success
          if (successcb) {
            successcb(sender, response.data, callbackdata);
          }
        })
        .catch(function (error) {
          // handle error
          if (errorcb) {
            errorcb(sender, error, callbackdata);
          }
        })
        .finally(function () {
          if (alwayscb)
            alwayscb(sender, callbackdata);
        });
      break;
    case "POST":
      axios.post(fulladdress, postdata)
        .then(function (response) {
          if (successcb)
            successcb(sender, response, callbackdata);
        })
        .catch(function (error) {
          if (errorcb) {
            errorcb(sender, error, callbackdata);
          }
        });
      break;
    default:
  }
}

window.ServiceCall = ServiceCall;
