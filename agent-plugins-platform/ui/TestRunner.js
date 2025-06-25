import { runTool } from '/agent-plugins-platform/bridge/mcp-bridge.js';

/**
 * Эта функция создает и настраивает нашу тестовую кнопку.
 * @returns {HTMLButtonElement} - Готовая к использованию кнопка.
 */
export function createTestRunnerButton() {
  const button = document.createElement('button');
  button.textContent = 'Запустить тестовый инструмент';
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';

  // Самое главное - обработчик клика
  button.onclick = async () => {
    console.log('▶️ Кнопка нажата. Вызываю runTool...');
    button.disabled = true;
    button.textContent = 'Выполняется...';

    try {
      // Вызываем наш мост с тестовыми данными
      const result = await runTool(
        'ozon-analyzer-plugin', 
        'analyze-page-content', 
        { url: 'https://ozon.ru/product/123' }
      );
      
      console.log('✅ УСПЕХ! Получен результат из воркера:');
      console.log(result);
      alert('Успех! Результат в консоли (F12).');

    } catch (error) {
      console.error('❌ ОШИБКА! Что-то пошло не так:', error);
      alert('Ошибка! Подробности в консоли (F12).');
    } finally {
      button.disabled = false;
      button.textContent = 'Запустить тестовый инструмент';
    }
  };

  return button;
}