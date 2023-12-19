const axios = require('axios');

console.log(axios.isCancel('something'));


axios.get('http://127.0.0.1:8082/x')
.then(function (response2) {
  // handle success
  console.log("response");
  console.log("response2.data", response2.data);
 
})
.catch(function (error) {
    console.log("catch", error);
    //no error
})