// components/Footer.js

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} YourAppName. All rights reserved.</p>
                {/* Footer links */}
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
                    <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
                    {/* Add more links or social media icons as needed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
