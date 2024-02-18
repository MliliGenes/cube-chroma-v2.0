import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import { generateMainColor } from "./lib/slices/mainColorSlice";
import Header from "./components/header/header";

function App() {
  let state = useSelector((state) => state.mainColor);

  let dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(generateMainColor());
  };

  return (
    <>
      <Header />
    </>
  );
}

export default App;
