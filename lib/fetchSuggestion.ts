import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board);
    // console.log("Formatted todos for AI --> ", todos);

    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos }),
    });

    if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
    }

    try {
        const GPTdata = await res.json();
        const { content } = GPTdata;
        return content;
    } catch (error) {
        console.error('Error parsing JSON response:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
    }

};

export default fetchSuggestion;
