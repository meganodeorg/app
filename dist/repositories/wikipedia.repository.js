"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikipediaRepository = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let WikipediaRepository = class WikipediaRepository {
    constructor() {
        this.url = 'https://en.wikipedia.org/w/api.php';
        this.min_length_bytes = 1000;
        this.max_tries = 10;
        this.min_backlinks = 1;
    }
    async getRandomWikipediaArticle() {
        const params = {
            action: 'query',
            format: 'json',
            prop: 'info|linkshere|categories|categoryinfo|extracts',
            generator: 'random',
            grnnamespace: '0',
            grnlimit: '10',
            inprop: 'url|displaytitle|length',
            lhprop: 'pageid',
            lhlimit: 'max',
            exlimit: 'max',
            cllimit: 'max',
        };
        let tries = 0;
        while (tries < this.max_tries) {
            try {
                const response = await axios_1.default.get(this.url, {
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch Wikipedia article');
                }
                const data = response.data;
                if (!data.query)
                    continue;
                for (const [page_id, page_info] of Object.entries(data.query.pages)) {
                    const length = page_info.length || 0;
                    const backlinks = (page_info.linkshere || []).length;
                    const categories = (page_info.categories || [])
                        .map((cat) => cat.title.replace(/^Category:/, ''))
                        .filter((cat) => !cat.toLowerCase().includes('article'));
                    const extract = page_info.extract;
                    if (length >= this.min_length_bytes &&
                        backlinks >= this.min_backlinks &&
                        extract) {
                        return page_info.title;
                    }
                }
            }
            catch (error) {
                console.error('Error fetching Wikipedia article:', error);
            }
            tries++;
        }
        throw new Error(`Could not find an article with length >= ${this.min_length_bytes} and backlinks >= ${this.min_backlinks} after ${this.max_tries} tries.`);
    }
    async getWikipediaArticleContent(title) {
        const params = {
            action: 'query',
            format: 'json',
            titles: title,
            prop: 'extracts',
            explaintext: 'true',
        };
        try {
            const responseRaw = await axios_1.default.get(this.url, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (responseRaw.status !== 200) {
                throw new Error('Failed to fetch Wikipedia article content');
            }
            const data = responseRaw.data;
            const page = Object.values(data.query.pages)[0];
            const content = page.extract || 'Content not found.';
            const text = { '': '' };
            let section = '';
            for (const line of content.split('\n')) {
                if (line.startsWith('==') && line.endsWith('==')) {
                    section = line.replace(/=/g, '').trim();
                    text[section] = '';
                    continue;
                }
                text[section] += line + '\n';
            }
            return text[''];
        }
        catch (error) {
            console.error('Error fetching Wikipedia article content:', error);
            throw error;
        }
    }
};
exports.WikipediaRepository = WikipediaRepository;
exports.WikipediaRepository = WikipediaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WikipediaRepository);
//# sourceMappingURL=wikipedia.repository.js.map