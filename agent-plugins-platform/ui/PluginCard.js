/**
 * Создает HTML-элемент карточки для одного плагина.
 * @param {object} plugin - Объект с данными плагина из манифеста.
 * @returns {HTMLElement} - Готовый div-элемент карточки.
 */
export function createPluginCard(plugin) {
    const card = document.createElement('div');
    card.className = 'plugin-card';

    // Иконка
    const icon = document.createElement('img');
    icon.className = 'plugin-icon';
    icon.src = plugin.iconUrl;
    icon.alt = `${plugin.name} icon`;
    // Хорошая практика: если иконка не загрузится, покажем заглушку
    icon.onerror = () => {
        icon.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.81l-1.46 1.46c-.19.19-.3.44-.3.71V17c0 .55.45 1 1 1h3v3c0 1.1.9 2 2 2h3.81l1.46 1.46c.19.19.44.3.71.3H17c.55 0 1-.45 1-1v-3h3c1.1 0 2-.9 2-2v-3.81l1.46-1.46c.19-.19.3-.44.3-.71V12c0-.55-.45-1-1-1z"/></svg>`;
    };
    
    // Контент
    const content = document.createElement('div');
    content.className = 'plugin-content';

    const header = document.createElement('div');
    header.className = 'plugin-header';

    const name = document.createElement('span');
    name.className = 'plugin-name';
    name.textContent = plugin.name;

    const version = document.createElement('span');
    version.className = 'plugin-version';
    version.textContent = `v${plugin.version}`;
    
    header.append(name, version);

    const description = document.createElement('p');
    description.className = 'plugin-description';
    description.textContent = plugin.description;
    
    content.append(header, description);
    card.append(icon, content);

    return card;
}