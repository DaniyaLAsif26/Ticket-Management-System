import Navbar from "./components/Navbar/Navbar"
import AppRoutes from "./Routes/AppRoutes"

function App() {
    return (
        <div className="flex flex-row w-full h-screen">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                <AppRoutes />
            </div>
        </div>
    );
}

export default App
