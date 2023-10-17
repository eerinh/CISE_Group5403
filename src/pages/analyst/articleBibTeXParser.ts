import { Article } from "~/types";

type BibTeXEntryData = {
    type: string;
    key: string;
    fields: {
        [key: string]: string | number;
    };
};

function parseBibTeX(data: string): BibTeXEntryData | null {
  // Matches BibTeX entry
  const entryPattern = /@(\w+)\{([\w\-_]+),\s*((?:.|\n)*?)\}/;

  const match = entryPattern.exec(data);
  
  if (!match) {
    return null; // Return null if no entry is found
  }

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

  return { type, key, fields };
}

export function isValidBibtexEntry(bibtex: string): boolean {
  const pattern = /^\s*@([a-zA-Z]+){([^,]+),([\s\S]*?)}\s*$/;

  return pattern.test(bibtex);
}


export const parseBibTeXToArticle = (data: string) => {
    const rawBibTeX = parseBibTeX(data);

    if (!rawBibTeX) {
        return null;
    }

    const article: Article = {
        title: rawBibTeX.fields.title as string ?? '',
        author: rawBibTeX.fields.author as string ?? '',
        date: new Date(rawBibTeX.fields.year as number ?? 0, 0, 0),
        journal_name: rawBibTeX.fields.journal as string ?? '',
        se_practice: '',
        claim: '',
        result_of_evidence: '',
        type_of_research: '',
        type_of_participant: '',
        approved: false,
        checked: false,
    }

    return article;
}