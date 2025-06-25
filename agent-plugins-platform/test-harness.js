import { createTestRunnerButton } from '/agent-plugins-platform/ui/TestRunner.js';

console.log('Тестовый стенд инициализирован.');

const rootElement = document.getElementById('root');
const testButton = createTestRunnerButton();

rootElement.appendChild(testButton);