// modules/TodoView.js - Só DOM, sem lógica de dados!
import { escapeHtml, formatDate } from '../utils/helpers.js';

export class TodoView {
    constructor() {
        // Cache de elementos DOM
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.list = document.getElementById('todo-list');
        this.emptyState = document.getElementById('empty-state');
        this.statsTotal = document.getElementById('stats-total');
        this.statsActive = document.getElementById('stats-active');
        this.statsCompleted = document.getElementById('stats-completed');
        this.filterButtons = document.querySelectorAll('[data-filter]');
        this.clearBtn = document.getElementById('clear-completed');
    }

    renderTodos(todos) {
        if (todos.length === 0) {
            this.list.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';
        this.list.innerHTML = todos.map(todo => this.#createTodoHTML(todo)).join('');
    }

    #createTodoHTML(todo) {
        return `
            <li class="todo__item ${todo.completed ? 'todo__item--completed' : ''}" 
                data-id="${todo.id}">
                <label class="todo__checkbox">
                    <input type="checkbox" 
                           ${todo.completed ? 'checked' : ''}
                           data-action="toggle">
                    <span class="todo__checkmark"></span>
                </label>
                <span class="todo__text">${escapeHtml(todo.text)}</span>
                <time class="todo__date">${formatDate(todo.createdAt)}</time>
                <div class="todo__actions">
                    <button class="todo__btn todo__btn--edit" 
                            data-action="edit" 
                            aria-label="Editar">✏️</button>
                    <button class="todo__btn todo__btn--delete" 
                            data-action="delete" 
                            aria-label="Excluir">🗑️</button>
                </div>
            </li>
        `;
    }

    renderStats(stats) {
        this.statsTotal.textContent = stats.total;
        this.statsActive.textContent = stats.active;
        this.statsCompleted.textContent = stats.completed;
    }

    setActiveFilter(filter) {
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    getInputValue() {
        return this.input.value;
    }

    clearInput() {
        this.input.value = '';
        this.input.focus();
    }

    // Vinculação de eventos (inversão de controle)
    onSubmit(handler) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            handler(this.getInputValue());
        });
    }

    onListClick(handler) {
        this.list.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const item = btn.closest('[data-id]');
            const id = item.dataset.id;
            const action = btn.dataset.action;

            handler(action, id, item);
        });
    }

    onFilter(handler) {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                handler(btn.dataset.filter);
            });
        });
    }

    onClearCompleted(handler) {
        this.clearBtn.addEventListener('click', handler);
    }
}