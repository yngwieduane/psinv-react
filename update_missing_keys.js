const fs = require('fs');
const path = require('path');

const newTranslations = {
    en: { Project: "Project", Community: "Community" },
    ar: { Project: "مشروع", Community: "مجمع" },
    de: { Project: "Projekt", Community: "Gemeinde" },
    ru: { Project: "Проект", Community: "Сообщество" },
    zh: { Project: "项目", Community: "社区" }
};

const messagesDir = path.join(process.cwd(), 'messages');

Object.keys(newTranslations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (content.HomeSearch) {
                Object.assign(content.HomeSearch, newTranslations[lang]);
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
                console.log(`Updated ${lang}.json with new keys`);
            } else {
                console.warn(`HomeSearch key not found in ${lang}.json`);
            }
        } catch (e) {
            console.error(`Error updating ${lang}.json:`, e);
        }
    }
});
