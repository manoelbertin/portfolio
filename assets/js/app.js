// app.js - Ponto de entrada (limpo e simples)
import { TodoController } from './modules/TodoController.js';

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new TodoController();
});