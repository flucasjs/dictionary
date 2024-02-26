export interface DictionaryAPIData {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export interface Phonetic {
  [key: string]: string
};

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export interface Definition {
  definition: string;
  example?: string;
};

export interface License {
  name: string;
  url: string;
};

export interface DictionaryContextType {
  definition: DictionaryAPIData;
  setDefinition: React.Dispatch<React.SetStateAction<DictionaryAPIData>>;
};

export interface FontContextType {
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
};

export interface Fonts {
  [key: string]: string;
}
