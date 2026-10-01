// modules/TodoModel.js - Só dados, sem DOM!
import { Storage } from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

const STORAGE_KEY = 'todos_app_data';

export class TodoModel {
    #todos = [];
    #listeners = [];

    constructor() {
        this.#todos = Storage.get(STORAGE_KEY) || [];
    }

    // Observer pattern - avisar quando dados mudarem
    subscribe(listener) {
        this.#listeners.push(listener);
    }

    #notify() {
        Storage.set(STORAGE_KEY, this.#todos);
        this.#listeners.forEach(listener => listener(this.#todos));
    }

    getAll(filter = 'all') {
        switch (filter) {
            case 'active':
                return this.#todos.filter(t => !t.completed);
            case 'completed':
                return this.#todos.filter(t => t.completed);
            default:
                return [...this.#todos];
        }
    }

    add(text) {
        if (!text.trim()) return null;

        const todo = {
            id: generateId(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.#todos.unshift(todo);
        this.#notify();
        return todo;
    }

    toggle(id) {
        const todo = this.#todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.#notify();
        }
    }

    update(id, newText) {
        const todo = this.#todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.#notify();
        }
    }

    remove(id) {
        this.#todos = this.#todos.filter(t => t.id !== id);
        this.#notify();
    }

    clearCompleted() {
        this.#todos = this.#todos.filter(t => !t.completed);
        this.#notify();
    }

    get stats() {
        const total = this.#todos.length;
        const completed = this.#todos.filter(t => t.completed).length;
        const active = total - completed;
        return { total, completed, active };
    }
}