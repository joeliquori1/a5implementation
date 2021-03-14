const { Translate } = require('@google-cloud/translate').v2;
const CREDENTIALS = require('./Translation App-ab79b483eee6.json');

// Your credentials
//const CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS
//const CREDENTIALS = JSON.parse(process.env.CREDNTIALS)

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});
// Configuration for the client

export default async function translateText(text, targetLanguage){

    try {
        let [translations] = await translate.translate(text, targetLanguage);
        translations = Array.isArray(translations) ? translations : [translations];
        return translations[0];
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};