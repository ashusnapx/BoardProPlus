"use client"

import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import fetchSuggestion from "@/lib/fetchSuggestion";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString,
    ]);

    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const [name, setName] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (board.columns.size === 0) return;
        setLoading(true);

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        };

        fetchSuggestionFunc();
    }, [board]);

    const handleAvatarClick = () => {
        setIsPopupOpen(true);
    };

    const handlePopupSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsPopupOpen(false);
    };

    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
                <div
                    className="
                absolute
                top-0
                left-0
                w-full
                h-96
                bg-gradient-to-br
                from-pink-400
                to-[#0055D1]
                rounded-md
                filter
                blur-3xl
                opacity-70
                -z-50
                "
                />

                <Image
                    src="https://gcdnb.pbrd.co/images/4QmjJCDLakpZ.png?o=1"
                    alt="Board-Pro Logo"
                    width={300}
                    height={100}
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain md:rounded-lg"
                />

                <div className="flex items-center space-x-5 flex-1 justify-end">
                    {/* Search Bar */}
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Here..."
                            className="flex-1 outline-none p-2"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button type="submit" hidden>
                            Dabao
                        </button>
                    </form>

                    {/* Avatar */}
                    <div className="relative">
                        <Avatar
                            name={name || "Guest"}
                            round
                            size="55"
                            color="black"
                            onClick={handleAvatarClick}
                        />
                        {isPopupOpen && (
                            <div className="absolute top-8 right-0 bg-[#F5F6F8] rounded-md p-4 shadow-md">
                                <form onSubmit={handlePopupSubmit}>
                                    <label htmlFor="nameInput">Enter your name:</label>
                                    <input
                                        id="nameInput"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="px-4 scroll-py-24"
                                        placeholder="Enter your name here..."
                                    />
                                    <button type="submit" className="bg-blue-600 mt-2 rounded-md px-4 py-2">Save</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="flex items-center justify-center px-5 md:py-5">
                <p className="flex items-center text-sm font-light pr-5 pl-3 shadow-xl rounded-lg w-fit bg-white italic max-w-3xl text-black mr-1 p-3">
                    <UserCircleIcon
                        className={`h-10 w-10 text-black inline-block mr-1
                    ${loading && "animate-spin"}
                    `}
                    />
                    {suggestion && !loading
                        ? suggestion
                        : " 📅 Today's tasks in action! 🎯 GPT's got your back, summarizing like a boss! 💼"}
                </p>
            </div>
        </header>
    );
}

export default Header;
