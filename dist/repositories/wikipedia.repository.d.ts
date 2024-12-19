export declare class WikipediaRepository {
    private url;
    private min_length_bytes;
    private max_tries;
    private min_backlinks;
    constructor();
    getRandomWikipediaArticle(): Promise<string>;
    getWikipediaArticleContent(title: string): Promise<string>;
}
