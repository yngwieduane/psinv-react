'use client';

function TextShortner({ text, charLimit, classes }: {text:string, charLimit: number, classes: string}){ 
    if (!text) return null;

    const words = text.split(" ");
    let shortened = "";

    for(let word of words) {
        if((shortened + (shortened ? " " : "") + word).length > charLimit) {
            break;
        }
        shortened += (shortened ? " " : "") + word;
    }

    const slicedWords = text.slice(0, charLimit);

    return (
        <p className={classes || ""}>
            {shortened}
            {shortened.length < text.length ? "..." : ""}
        </p>
    );

}

export default TextShortner