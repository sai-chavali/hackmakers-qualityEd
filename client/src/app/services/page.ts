export interface TinyContent {
    md: string;
    liked: string;
    accessed: Date;
    authors: Array<string>;
}

export interface Content {
    title: string;
    type: string;
    content: Array<TinyContent>
}

export interface Page {
    title: string;
    content: Array<Content>;
}