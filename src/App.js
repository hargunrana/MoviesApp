import "./App.css";
import NavBar from "./Components/NavBar";
import Banner from "./Components/Banner";
import List from "./Components/List";
import Favorites from "./Components/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Banner />
                            <List />
                        </>
                    }
                />
                <Route path="favorites" element={<Favorites />} />
            </Routes>
            {/* <Favorites /> */}
        </BrowserRouter>
    );
}

export default App;
