/**
 * Мост к нашему Pyodide Worker'у.
 * Он управляет созданием воркера и общением с ним.
 */

let pyodideWorker;

/**
 * Запускает инструмент плагина в безопасном воркере.
 * @param {string} pluginId - ID плагина, например 'ozon-analyzer'.
 * @param {string} toolName - Имя инструмента, например 'analyze_product_page'.
 * @param {object} toolInput - Входные данные для инструмента.
 * @returns {Promise<object>} - Результат выполнения инструмента.
 */
export function runTool(pluginId, toolName, toolInput) {
  // Возвращаем Promise, чтобы остальной код мог дождаться результата
  return new Promise((resolve, reject) => {
    // Ленивая инициализация воркера - создаем его только при первом вызове
    if (!pyodideWorker) {
      console.log("Creating Pyodide worker for the first time...");
      // В манифесте v3 путь к воркеру нужно получать через getURL
      // Пока что для простоты разработки можно использовать относительный путь
      pyodideWorker = new Worker(new URL('./pyodide-worker.js', import.meta.url), { type: 'module' });
    }

    // Устанавливаем обработчики сообщений и ошибок ДЛЯ ЭТОГО ВЫЗОВА
    pyodideWorker.onmessage = (event) => {
      if (event.data.status === 'complete') {
        resolve(event.data.result);
      } else {
        reject(new Error(event.data.error || 'Unknown worker error'));
      }
    };

    pyodideWorker.onerror = (error) => {
      console.error("McpBridge received an error from worker:", error);
      reject(error);
    };

    // Отправляем задачу в воркер
    pyodideWorker.postMessage({ pluginId, toolName, toolInput });
  });
}