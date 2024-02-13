// components/MainLayout.js

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
