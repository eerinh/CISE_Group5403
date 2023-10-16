import { Article } from "~/types";

type BibTeXEntry = {
    type: string;
    key: string;
    fields: {
        [key: string]: string | number;
    };
};

type BibTeXFile = BibTeXEntry[];

const parseRaw = (data: string) => {
    
    const entries: BibTeXFile = [];

    // Matches BibTeX entries
    const entryPattern = /@(\w+)\{([\w\-_]+),\s*((?:.|\n)*?)\}\s*(?=(?:@|$))/g;

    // Extract entries
    let match;
    while ((match = entryPattern.exec(data))) {
        const [_, type, key, fieldData] = match;

        const fields: { [key: string]: string | number } = {};

        // Match individual fields within an entry
        const fieldPattern = /(\w+)\s*=\s*[{"](.+?)[}"],?\s*/g;
        let fieldMatch;
        while ((fieldMatch = fieldPattern.exec(fieldData))) {
            const [_, fieldName, fieldValue] = fieldMatch;

            // Try to convert value to number, otherwise keep as string
            fields[fieldName] = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue);
        }

        entries.push({ type, key, fields });
    }

    return entries;
}

export const parse = (data: string) => {
    const rawBibTeX = parseRaw(data);

    const article: Article = {
        title: ,
        author: ,
        date: ,
        journal_name: ,
        se_practice: ,
        claim: ,
        result_of_evidence: ,
        type_of_research: ,
        type_of_participant: ,
        approved: ,
        checked: ,
    }

    return article;
}