import { createTestRunnerButton } from './ui/TestRunner.js';
import { getAvailablePlugins } from './core/plugin-manager.js';

console.log('Тестовый стенд инициализирован.');

// --- Новая часть: загрузка и отображение плагинов ---
const pluginsListContainer = document.getElementById('plugins-list');

async function displayPlugins() {
    try {
        const plugins = await getAvailablePlugins();
        
        if (plugins.length === 0) {
            pluginsListContainer.textContent = 'Плагины не найдены.';
            return;
        }

        pluginsListContainer.innerHTML = ''; // Очищаем "Загрузка..."
        
        plugins.forEach(plugin => {
            const pluginCard = document.createElement('pre');
            pluginCard.style.whiteSpace = 'pre-wrap';
            pluginCard.textContent = JSON.stringify(plugin, null, 2);
            pluginsListContainer.appendChild(pluginCard);
        });

    } catch (error) {
        pluginsListContainer.textContent = 'Ошибка при загрузке плагинов.';
        console.error(error);
    }
}
// --- Конец новой части ---


const rootElement = document.getElementById('root');
const testButton = createTestRunnerButton();

rootElement.appendChild(testButton);

// Запускаем отображение плагинов
displayPlugins();