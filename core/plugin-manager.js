/**
 * Этот модуль отвечает за обнаружение и загрузку плагинов.
 */

// В расширении мы не можем сканировать папки, поэтому мы будем
// жестко задавать список известных нам плагинов.
const PLUGIN_DIRS = ['ozon-analyzer'];

/**
 * Находит и загружает метаданные всех доступных плагинов.
 * @returns {Promise<Array<object>>} - Массив объектов с данными каждого плагина.
 */
export async function getAvailablePlugins() {
    const plugins = [];
    
    for (const dirName of PLUGIN_DIRS) {
        try {
            const manifestUrl = `/plugins/${dirName}/manifest.json`;
            const response = await fetch(manifestUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch manifest: ${response.statusText}`);
            }

            const manifest = await response.json();
            
            // Добавляем к манифесту полезные данные, которые понадобятся UI
            plugins.push({
                id: dirName,
                ...manifest,
                iconUrl: `/ыplugins/${dirName}/${manifest.icon}`
            });

        } catch (error) {
            console.error(`Failed to load plugin from '${dirName}':`, error);
        }
    }
    
    return plugins;
}