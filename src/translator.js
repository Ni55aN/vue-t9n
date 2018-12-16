import { eachTextNode, toObj, trim } from './utils';

export default class Translator {
    constructor() {
        this.translations = null;
        this.locale = null;
    }

    replace(text, section) {
        const data = section ? this.translations.sections[section] || this.translations.defaults : this.translations.defaults;
        const exactReplacement = data.exact[text];
        
        if (exactReplacement && exactReplacement[this.locale])
            return exactReplacement[this.locale];

        for(let [regex, str] of data.match) {
            let s = str[this.locale];

            if(s && text.match(regex))
                return text.replace(regex, s);
        }

        if(window._vueLocalizerDebug)
            console.warn(`"${text}" not translated ${section?'in section '+section:''}`) 

        return text;
    }

    replaceSentences(text, section) {
        return text
            .split(/\. +/g)
            .map(sentence => {
                let { start, content, end } = trim(sentence);

                return start+this.replace(content, section)+end;
            })
            .join('. ');
    }

    translateNode(vnode, section, deep = false) {
        if(!this.translations) return;

        eachTextNode(vnode, deep, node => {
            let text = node.text;
            
            node.elm.nodeValue = this.replaceSentences(text, section)
        });
    }

    extractTranslations(list) {
        return {
            exact: toObj(list.filter(([source]) => typeof source === 'string')),
            match: list.filter(([source]) => typeof source !== 'string')
        }
    }

    setTranslations(list) {
        const sectionSet = new Set(list.map(item => item[2]).filter(s => s));
        const defaults = this.extractTranslations(list.filter(item => !item[2]));
        const sections = Array.from(sectionSet).map(section => {
            const key = section;
            const val = this.extractTranslations(list.filter(item => item[2] === section));

            return [key, {
                exact: { ...defaults.exact, ...val.exact },
                match: [ ...val.match, ...defaults.match ]
            }]
        })


        this.translations = {
            defaults,
            sections: toObj(sections)
        }
    }

    setLocale(locale) {
        this.locale = locale;
    }
}