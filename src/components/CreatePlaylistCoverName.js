// import { useState } from "react";
// import FormMyPlayslit from "./FormMyPlaylist";

// function CreatePlaylistCoverName() {

//   const [userData, setuserData] = useState({
//     coverUser: "",
//     namePlaylistUser: ""
//   });

//   function handleChange(event) {
//     setuserData({ ...userData, [event.target.name]: event.target.value });
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     api
//       // O método .post do Axios recebe 2 argumentos: o primeiro é a URL da rota da API e o segundo é o que será colocado no corpo (body) da requisição HTTP (e inserido no banco de dados)
//       .post("/books", state)
//       .then((response) => {
//         console.log(response.data);
//         // Se a criação foi bem-sucedida, redirecionar o usuário de volta pra Home
//         navigate("/");
//       })
//       .catch((err) => console.error(err));
//   }

//   return (
//     <div>
//       <FormMyPlayslit
//         label="My Playlist's Cover"
//         id="userCreateCover"
//         name="coverUser"
//         onChange={handleChange}
//         value={userData.coverUser}
//       />

//       <FormMyPlayslit
//         label="My Playlist's Name"
//         id="userCreateName"
//         name="namePlaylistUser"
//         onChange={handleChange}
//         value={userData.namePlaylistUser}
//       />
//     </div>
//   );
// }
