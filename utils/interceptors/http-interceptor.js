// import axios from "axios";
// import swal from "sweetalert";

// axios.interceptors.request.use((req) => {
//   req.headers = {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers":
//       "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
//     "Access-Control-Allow-Credentials": "true",
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   };
//   return req;
// });

// axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     if (err.response.status === 0) {
//       swal({
//         text: "Please check your internet connection!",
//         icon: "error",
//       });
//     } else {
//       const error = err.response.data.error;
//       swal({
//         text: error.message,
//         icon: "error",
//       });
//     }
//   }
// );
