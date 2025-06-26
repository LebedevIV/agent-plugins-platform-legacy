// Используем importScripts для загрузки классического скрипта с CDN
importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js');

let pyodide;

// Асинхронно инициализируем Pyodide
async function initializePyodide() {
    console.log("Pyodide worker: Initializing Pyodide from CDN...");
    // loadPyodide теперь является глобальной функцией внутри воркера
    pyodide = await loadPyodide();
    console.log("Pyodide worker: Pyodide loaded successfully!");
}
const pyodideReadyPromise = initializePyodide();

// Обработчик сообщений (остается без изменений)
self.onmessage = async (event) => {
    await pyodideReadyPromise;
    const { pluginId, toolName, toolInput } = event.data;

    try {
        const pyScriptUrl = `/plugins/${pluginId}/mcp_server.py?raw`;
        const response = await fetch(pyScriptUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch Python script: ${response.status} ${response.statusText}`);
        }
        const pythonCode = await response.text();

        const mcpRequest = {
            id: `req_${Date.now()}`,
            tool: toolName,
            input: toolInput
        };

        let capturedResult = '';
        pyodide.setStdout({ batched: (str) => { capturedResult += str + '\n'; } });
        pyodide.setStdin({ stdin: () => JSON.stringify(mcpRequest) + '\n' });

        await pyodide.runPythonAsync(pythonCode);
        
        const resultJson = JSON.parse(capturedResult.trim());
        self.postMessage({ status: 'complete', result: resultJson.result });
    } catch (error) {
        console.error("Pyodide worker: Error during Python execution:", error);
        self.postMessage({ status: 'error', error: error.message });
    }
};