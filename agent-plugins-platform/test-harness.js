import { getAvailablePlugins } from './core/plugin-manager.js';
import { createPluginCard } from './ui/PluginCard.js';

console.log('Тестовый стенд инициализирован.');

const pluginsListContainer = document.getElementById('plugins-list');

async function displayPlugins() {
    try {
        const plugins = await getAvailablePlugins();
        if (plugins.length === 0) {
            pluginsListContainer.textContent = 'Плагины не найдены.';
            return;
        }
        pluginsListContainer.innerHTML = '';
        plugins.forEach(plugin => {
            const pluginCard = createPluginCard(plugin);
            pluginsListContainer.appendChild(pluginCard);
        });
    } catch (error) {
        pluginsListContainer.textContent = 'Ошибка при загрузке плагинов.';
        console.error(error);
    }
}

displayPlugins();