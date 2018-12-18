export function getLangs(translations) {
    const langCollections = translations.map(t => Object.keys(t[1]));
    const entries = {}

    langCollections.reduce((map, langs) => langs.map(lang => {
        if(entries[lang])
            entries[lang] = entries[lang] + 1;
        else
            entries[lang] = 1;
    }));

    return {
        list: Object.keys(entries),
        entries
    }
}