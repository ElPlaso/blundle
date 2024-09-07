import { GuessResults } from "../../lib/types";

export function formatEmojiString(
    allGuesses: string[][],
    guessResults: GuessResults[]
) {
    let emojiString = "";
    for (let i = 0; i < allGuesses.length; i++) {
        let guessEmojiString = "";
        for (let j = 0; j < allGuesses[i].length; j++) {
            if (guessResults[i].correctMoves.includes(j)) {
                guessEmojiString += "🟩";
            } else if (guessResults[i].incorrectButIncludedMoves.includes(j)) {
                guessEmojiString += "🟨";
            } else {
                guessEmojiString += "⬛";
            }
        }
        emojiString += `${guessEmojiString}\n`;
        if (guessEmojiString === "🟩".repeat(allGuesses[i].length)) {
            break;
        }
    }
    return emojiString;
}