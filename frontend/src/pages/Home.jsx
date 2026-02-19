import Header from "../components/layout/Header";

const Home = ({ onLoginClick }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <Header onLoginClick={onLoginClick} />

            {/* Page Body — future content goes here */}
            <main className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-[#0d4f6e] to-yellow-500 bg-clip-text text-transparent">
                        GoBasket 🛒
                    </span>
                </h1>
                <p className="text-gray-500 text-base max-w-xs">
                    Groceries delivered in minutes. Products & categories coming soon!
                </p>
            </main>
        </div>
    );
};

export default Home;
