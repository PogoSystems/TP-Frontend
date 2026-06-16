
import '../shared/styles/index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router";

function App() {
    return <RouterProvider router={router}/>

  // return (
  //   <>
  //     <section className="bg-bg-app flex flex-col items-center justify-center grow">
  //       <div className="hero min-h-screen flex flex-col items-center justify-center">
  //         <img src={fichaje} className="base" width="170" height="179" alt="" />
  //           <div>
  //               <h1>Fichaje</h1>
  //           </div>
  //           <button
  //               type="button"
  //               className="counter"
  //           >
  //               Fichaje
  //           </button>
  //       </div>
  //
  //     </section>
  //   </>
  // )
}

export default App
