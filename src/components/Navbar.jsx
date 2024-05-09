import React from "react";

const Navbar = () => {
    return (
        <header>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* 로고 */}
                    <div className="text-white text-xl font-bold">My Music App</div>
                    {/* 네비게이션 링크 */}
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#home" className="text-white hover:text-gray-300">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
