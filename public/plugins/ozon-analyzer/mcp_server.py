import sys
import json
import time

def analyze_ozon_product(data):
    """
    Простая имитация анализа данных со страницы Ozon.
    """
    url = data.get("page_url", "no url provided")
    # Просто возвращаем информацию о том, что получили
    return {
        "status": "success",
        "message": f"Python script successfully analyzed the URL: {url}",
        "engine": "Pyodide"
    }

def main():
    """
    Главный цикл MCP-сервера.
    Читает одну строку из stdin, обрабатывает ее и пишет результат в stdout.
    """
    try:
        # Читаем одну строку запроса
        line = sys.stdin.readline()
        if not line:
            return # Выходим, если нет данных

        request = json.loads(line)
        
        tool_name = request.get("tool")
        tool_input = request.get("input")

        result = None
        if tool_name == "analyze-ozon-product":
            result = analyze_ozon_product(tool_input)
        else:
            result = {"error": f"Unknown tool: {tool_name}"}

        # Формируем и отправляем ответ
        response = {"id": request.get("id"), "result": result}
        sys.stdout.write(json.dumps(response) + '\n')
        sys.stdout.flush()

    except Exception as e:
        error_response = {"error": str(e)}
        # Важно писать ошибки в stdout, чтобы JS мог их поймать
        sys.stdout.write(json.dumps(error_response) + '\n')
        sys.stdout.flush()

# Запускаем главный обработчик
main()