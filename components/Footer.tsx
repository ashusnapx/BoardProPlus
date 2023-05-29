import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 py-4 mt-3">
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-500">
                    &copy; {currentYear} Made with <span role="img" aria-label="heart">❤️</span> by Ashutosh Kumar
                </p>
            </div>
        </footer>
    );
}

export default Footer;
