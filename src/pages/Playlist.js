import { useState, useEffect } from "react";

function Playlist() {
  const [state, setState] = useState([]);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {}, [state]);

  return (
    <div>
      <ul>
        {musicList.map(() => (
          <li></li>
        ))}
      </ul>
    </div>
    // <div className="container">
    //   <div className="row cant d-flex justify-content-center align-items-center">
    //     <div className="col-md-6">
    //       <div className="p-3 card">
    //         <div className="d-flex justify-content-between align-items-center p-3 music">
    //           <div className="d-flex flex-row align-items-center">
    //             {" "}
    //             <i className="fa fa-music color"></i>{" "}
    //             <small className="ml-2">
    //               Shannon jin pride - The Usual [Beat, Jess Scott]
    //             </small>{" "}
    //           </div>{" "}
    //           <i className="fa fa-check color"></i>
    //         </div>
    //         <div className="d-flex justify-content-between align-items-center p-3 music">
    //           <div className="d-flex flex-row align-items-center">
    //             {" "}
    //             <i className="fa fa-music color"></i>{" "}
    //             <small className="ml-2">R Kelly - Thoia Toing</small>{" "}
    //           </div>{" "}
    //           <i className="fa fa-plus text-muted"></i>
    //         </div>
    //         <div className="d-flex justify-content-between align-items-center p-3 music">
    //           <div className="d-flex flex-row align-items-center">
    //             {" "}
    //             <i className="fa fa-music color"></i>{" "}
    //             <small className="ml-2">
    //               Under - Yeah [Feat Lil John & Lutaring]{" "}
    //             </small>{" "}
    //           </div>{" "}
    //           <i className="fa fa-check color"></i>
    //         </div>
    //         <div className="d-flex justify-content-between align-items-center p-3 music">
    //           <div className="d-flex flex-row align-items-center">
    //             {" "}
    //             <i className="fa fa-music color"></i>{" "}
    //             <small className="ml-2">
    //               Dua Lipa - Thingong Huango [Beat, Jess Scott]
    //             </small>{" "}
    //           </div>{" "}
    //           <i className="fa fa-plus text-muted"></i>
    //         </div>
    //         <div className="d-flex justify-content-between align-items-center p-3 music">
    //           <div className="d-flex flex-row align-items-center">
    //             {" "}
    //             <i className="fa fa-music color"></i>{" "}
    //             <small className="ml-2">
    //               Things are better - The Usual [Beat, Jess Scott]
    //             </small>{" "}
    //           </div>{" "}
    //           <i className="fa fa-check color"></i>
    //         </div>{" "}
    //         <button className="btn btn-danger btn-block playlist text-uppercase">
    //           <i className="fa fa-shopping-cart"></i> My Playlist
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Playlist;
