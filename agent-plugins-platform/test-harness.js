import { createTestRunnerButton } from './ui/TestRunner.js';
import { getAvailablePlugins } from './core/plugin-manager.js';
import { createPluginCard } from './ui/PluginCard.js'; // <-- 1. Импортируем нашу новую фабрику

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
        
        // --- 2. Изменяем этот цикл ---
        plugins.forEach(plugin => {
            // Было: создание <pre> тега с JSON
            // const pluginCard = document.createElement('pre');
            // pluginCard.textContent = JSON.stringify(plugin, null, 2);

            // Стало: использование нашей красивой фабрики
            const pluginCard = createPluginCard(plugin);
            pluginsListContainer.appendChild(pluginCard);
        });
        // --- Конец изменений ---

    } catch (error) {
        pluginsListContainer.textContent = 'Ошибка при загрузке плагинов.';
        console.error(error);
    }
}


const rootElement = document.getElementById('root');
const testButton = createTestRunnerButton();

rootElement.appendChild(testButton);

displayPlugins();