let pyodideWorker;

export function runTool(pluginId, toolName, toolInput) {
  return new Promise((resolve, reject) => {
    if (!pyodideWorker) {
      console.log("Creating Pyodide worker for the first time...");
      // Создаем ПРОСТОЙ, НЕ-МОДУЛЬНЫЙ воркер
      pyodideWorker = new Worker(new URL('./pyodide-worker.js', import.meta.url));
    }

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

    // Просто отправляем задачу
    pyodideWorker.postMessage({ pluginId, toolName, toolInput });
  });
}