import "./App.css";
import Header from "./components/Header";
import View from "./components/View";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div
        style={{ backgroundColor: "#16181c", minHeight: "calc(100vh - 60px)" }}
        className=" text-light"
      >
        <Header />
        <View />
      </div>
      <Footer />
    </>
  );
}

export default App;
