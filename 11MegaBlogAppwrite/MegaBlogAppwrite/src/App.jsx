import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authService, dbConfig, storageConfig } from "./appwrite/index.js";
import { login, logout } from "./slices/authSlice.js";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((user) => {
                if (user) {
                    dispatch(login(user));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return !isLoading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default App;
