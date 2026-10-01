// modules/TodoController.js - Conecta Model e View
import { TodoModel } from './TodoModel.js';
import { TodoView } from './TodoView.js';

export class TodoController {
    #model;
    #view;
    #currentFilter = 'all';

    constructor() {
        this.#model = new TodoModel();
        this.#view = new TodoView();

        // Quando dados mudam, atualizar tela
        this.#model.subscribe(() => this.#updateView());

        // Vincular eventos da View
        this.#view.onSubmit((text) => this.#handleAdd(text));
        this.#view.onListClick((action, id, item) => {
            this.#handleAction(action, id, item);
        });
        this.#view.onFilter((filter) => this.#handleFilter(filter));
        this.#view.onClearCompleted(() => this.#model.clearCompleted());

        // Renderizar estado inicial
        this.#updateView();
    }

    #handleAdd(text) {
        if (this.#model.add(text)) {
            this.#view.clearInput();
        }
    }

    #handleAction(action, id, itemElement) {
        switch (action) {
            case 'toggle':
                this.#model.toggle(id);
                break;
            case 'delete':
                itemElement.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => this.#model.remove(id), 300);
                break;
            case 'edit':
                const todo = this.#model.getAll().find(t => t.id === id);
                if (todo) {
                    const newText = prompt('Editar tarefa:', todo.text);
                    if (newText !== null) {
                        this.#model.update(id, newText);
                    }
                }
                break;
        }
    }

    #handleFilter(filter) {
        this.#currentFilter = filter;
        this.#updateView();
    }

    #updateView() {
        const todos = this.#model.getAll(this.#currentFilter);
        this.#view.renderTodos(todos);
        this.#view.renderStats(this.#model.stats);
        this.#view.setActiveFilter(this.#currentFilter);
    }
}