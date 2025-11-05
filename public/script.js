class EventManager {
    constructor() {
        this.apiBase = '/events';
        this.events = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadEvents();
    }

    bindEvents() {
        // Form submissions
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEvent();
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateEvent();
        });

        // Button clicks
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadEvents();
        });

        // Modal controls
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.cancel-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    async loadEvents() {
        try {
            this.showLoading();
            const response = await fetch(this.apiBase);
            if (!response.ok) throw new Error('Failed to load events');
            
            this.events = await response.json();
            this.renderEvents();
        } catch (error) {
            this.showError('Failed to load events: ' + error.message);
        }
    }

    async addEvent() {
        const form = document.getElementById('eventForm');
        const formData = new FormData(form);
        
        const event = {
            title: formData.get('title'),
            start: formData.get('start'),
            end: formData.get('end') || null,
            description: formData.get('description') || null,
            location: formData.get('location') || null
        };

        try {
            const response = await fetch(this.apiBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) throw new Error('Failed to create event');

            const newEvent = await response.json();
            this.events.push(newEvent);
            this.renderEvents();
            form.reset();
            this.showSuccess('Event created successfully!');
        } catch (error) {
            this.showError('Failed to create event: ' + error.message);
        }
    }

    async updateEvent() {
        const id = document.getElementById('editId').value;
        
        const event = {
            title: document.getElementById('editTitle').value,
            start: document.getElementById('editStart').value,
            end: document.getElementById('editEnd').value || null,
            description: document.getElementById('editDescription').value || null,
            location: document.getElementById('editLocation').value || null
        };

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) throw new Error('Failed to update event');

            const updatedEvent = await response.json();
            const index = this.events.findIndex(e => e.id === id);
            if (index !== -1) {
                this.events[index] = updatedEvent;
            }
            
            this.renderEvents();
            this.closeModal();
            this.showSuccess('Event updated successfully!');
        } catch (error) {
            this.showError('Failed to update event: ' + error.message);
        }
    }

    async deleteEvent(id) {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete event');

            this.events = this.events.filter(e => e.id !== id);
            this.renderEvents();
            this.showSuccess('Event deleted successfully!');
        } catch (error) {
            this.showError('Failed to delete event: ' + error.message);
        }
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        document.getElementById('editId').value = event.id;
        document.getElementById('editTitle').value = event.title;
        document.getElementById('editStart').value = this.formatDateTimeForInput(event.start);
        document.getElementById('editEnd').value = event.end ? this.formatDateTimeForInput(event.end) : '';
        document.getElementById('editDescription').value = event.description || '';
        document.getElementById('editLocation').value = event.location || '';

        this.openModal();
    }

    renderEvents() {
        const container = document.getElementById('eventsList');
        
        if (this.events.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No events yet</h3>
                    <p>Create your first event using the form above!</p>
                </div>
            `;
            return;
        }

        const sortedEvents = [...this.events].sort((a, b) => 
            new Date(a.start) - new Date(b.start)
        );

        container.innerHTML = sortedEvents.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <div>
                        <div class="event-title">${this.escapeHtml(event.title)}</div>
                    </div>
                </div>
                <div class="event-meta">
                    <span><i class="fas fa-clock"></i> ${this.formatDateTime(event.start)}</span>
                    ${event.end ? `<span><i class="fas fa-clock"></i> ${this.formatDateTime(event.end)}</span>` : ''}
                    ${event.location ? `<span><i class="fas fa-map-marker-alt"></i> ${this.escapeHtml(event.location)}</span>` : ''}
                </div>
                ${event.description ? `<div class="event-description">${this.escapeHtml(event.description)}</div>` : ''}
                <div class="event-actions">
                    <button class="btn btn-success" onclick="eventManager.editEvent('${event.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="eventManager.deleteEvent('${event.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatDateTimeForInput(dateString) {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoading() {
        document.getElementById('eventsList').innerHTML = '<div class="loading">Loading events...</div>';
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    openModal() {
        document.getElementById('editModal').classList.add('show');
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('show');
    }
}

// Initialize the event manager when the page loads
const eventManager = new EventManager();
