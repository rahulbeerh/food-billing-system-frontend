import React from "react";
import Foods from "./Components/Foods";
import Header from "./Components/Header";
import BillModal from "./Components/BillModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Filter from "./Components/Filter";

const App = () => {
  return (
    <>
      <Header />
      <BillModal />
      <Filter />
      <Foods />
      <ToastContainer />
    </>
  );
};

export default App;
