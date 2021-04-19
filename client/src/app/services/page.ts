export interface TinyContent {
    md: string;
    liked: string;
    accessed: Date;
    authors: Array<string>;
}

export interface Content {
    title: string;
    type: string;
    content: Array<TinyContent>;
    difficulty: string;
    level: string;
    bloomslevel: string;
}

export interface Page {
    title: string;
    content: Array<Content>;
}