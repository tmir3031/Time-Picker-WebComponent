class TimePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._hour = '00';
        this._minute = '00';

        this.shadowRoot.innerHTML = `
            <style>
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-family: Arial, sans-serif;
                    margin: 10px;
                }
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    padding: 5px 0;
                }
                .time-picker {
                    display: flex;
                    align-items: center;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                input {
                    padding: 10px;
                    font-size: 24px;
                    width: 60px;
                    text-align: center;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    margin: 0 5px;
                }
                .colon {
                    font-size: 24px;
                    margin: 0 4px 26px 4px;
                    align-self: center;
                }
                .label {
                    text-align: center;
                    margin-top: 5px;
                }
                .time-picker-footer {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 10px;
                }
                button {
                    margin: 5px;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #007BFF;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
                button:active {
                    transform: scale(0.95);
                }
                button:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
                }
                button#cancel {
                    background-color: #dc3545;
                }
                button#cancel:hover {
                    background-color: #c82333;
                }
            </style>
            <div class="wrapper">
                <div class="title">Select time: </div>
                <div class="time-picker">
                    <div class="input-group">
                        <input type="text" id="hour" maxlength="2" value="${this._hour}">
                        <div class="label">Hour</div>
                    </div>
                    <span class="colon">:</span>
                    <div class="input-group">
                        <input type="text" id="minute" maxlength="2" value="${this._minute}">
                        <div class="label">Minute</div>
                    </div>
                </div>
                <div class="time-picker-footer">
                    <button id="cancel">Cancel</button>
                    <button id="ok">OK</button>
                </div>
            </div>
        `;

        this.hourInput = this.shadowRoot.querySelector('#hour');
        this.minuteInput = this.shadowRoot.querySelector('#minute');
        this.cancelButton = this.shadowRoot.querySelector('#cancel');
        this.okButton = this.shadowRoot.querySelector('#ok');

        this.hourInput.addEventListener('input', (event) => this.validateInput(event, 'hour'));
        this.minuteInput.addEventListener('input', (event) => this.validateInput(event, 'minute'));
        this.hourInput.addEventListener('blur', () => this.formatInput('hour'));
        this.minuteInput.addEventListener('blur', () => this.formatInput('minute'));
        this.cancelButton.addEventListener('click', () => this.onClose());
        this.okButton.addEventListener('click', () => this.onConfirm());
    }

    static get observedAttributes() {
        return ['hour', 'minute'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'hour') {
                this._hour = newValue;
            } else if (name === 'minute') {
                this._minute = newValue;
            }
        }
    }

    connectedCallback() {
        if (this.hasAttribute('hour')) {
            const value = this.getAttribute('hour');
            if (!(isNaN(value)) && value > 0 && value <= 23) {
                this.hour = value;
            }
        }
        if (this.hasAttribute('minute')) {
            const value = this.getAttribute('minute');
            if (!(isNaN(value)) && value > 0 && value <= 59) {
                this.minute = value;
            }
        }
    }

    get hour() {
        return this._hour;
    }

    set hour(value) {
        this._hour = value.padStart(2, '0');
        this.hourInput.value = this._hour;
    }

    get minute() {
        return this._minute;
    }

    set minute(value) {
        this._minute = value.padStart(2, '0');
        this.minuteInput.value = this._minute;
    }

    validateInput(event, type) {
        const value = event.target.value;
        if (type === 'hour') {
            if (isNaN(value) || value < 0 || value > 23) {
                event.target.value = this._hour;
            } else {
                this._hour = value;
            }
        } else if (type === 'minute') {
            if (isNaN(value) || value < 0 || value > 59) {
                event.target.value = this._minute;
            } else {
                this._minute = value;
            }
        }
    }

    formatInput(type) {
        if (type === 'hour') {
            if (this._hour === '' || isNaN(this._hour) || this._hour < 0 || this._hour > 23) {
                this._hour = '00';
            } else if (this._hour.length < 2) {
                this._hour = this._hour.padStart(2, '0');
            }
            this.hourInput.value = this._hour;
        } else if (type === 'minute') {
            if (this._minute === '' || isNaN(this._minute) || this._minute < 0 || this._minute > 59) {
                this._minute = '00';
            } else if (this._minute.length < 2) {
                this._minute = this._minute.padStart(2, '0');
            }
            this.minuteInput.value = this._minute;
        }
    }

    onClose() {
        this.hourInput.value = '00';
        this.minuteInput.value = '00';
        this._hour = '00';
        this._minute = '00';
    }

    onConfirm() {
        const selectedTime = {
            hour: this._hour,
            minute: this._minute,
            all: parseInt(this.hour, 10) * 60 + parseInt(this.minute, 10)
        };
        const event = new CustomEvent('time-selected', {
            detail: selectedTime,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('time-picker', TimePicker);


