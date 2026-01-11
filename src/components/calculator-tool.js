import { LitElement, html, css } from 'lit';

export class CalculatorTool extends LitElement {
  static properties = {
    display: { type: String },
    equation: { type: String }
  };

  constructor() {
    super();
    this.display = '0';
    this.equation = '';
    this._newNumber = true;
  }

  static styles = css`
    :host {
      display: block;
      color: white;
    }

    .calculator {
      max-width: 320px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .screen {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      text-align: right;
    }

    .equation {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      height: 1.4rem;
      overflow: hidden;
    }

    .current {
      font-size: 2.8rem;
      font-weight: 500;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 600px) {
      .current {
        font-size: 2.2rem;
      }
      
      .equation {
        font-size: 0.9rem;
      }
      
      .calculator {
        max-width: 280px;
        padding: 16px;
      }
      
      .keypad {
        gap: 10px;
      }
      
      button {
        padding: 12px 0;
        font-size: 1.1rem;
      }
    }

    .keypad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    button {
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.2rem;
      padding: 15px 0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    button:active {
      transform: translateY(0);
    }

    .btn-op {
      color: #a0a0ff;
      background: rgba(160, 160, 255, 0.1);
    }
    
    .btn-op:hover {
      background: rgba(160, 160, 255, 0.2);
    }

    .btn-eq {
      background: #a0a0ff;
      color: white;
      grid-column: span 2;
    }

    .btn-eq:hover {
      background: #b0b0ff;
    }

    .btn-clr {
      color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }

    .btn-clr:hover {
      background: rgba(255, 107, 107, 0.2);
    }
  `;

  render() {
    return html`
      <div class="calculator">
        <div class="screen">
          <div class="equation">${this.equation}</div>
          <div class="current">${this.display}</div>
        </div>
        <div class="keypad">
          <button class="btn-clr" @click=${this._clear}>AC</button>
          <button class="btn-op" @click=${this._del}>DEL</button>
          <button class="btn-op" @click=${() => this._op('%')}>%</button>
          <button class="btn-op" @click=${() => this._op('/')}>÷</button>
          
          <button @click=${() => this._num('7')}>7</button>
          <button @click=${() => this._num('8')}>8</button>
          <button @click=${() => this._num('9')}>9</button>
          <button class="btn-op" @click=${() => this._op('*')}>×</button>
          
          <button @click=${() => this._num('4')}>4</button>
          <button @click=${() => this._num('5')}>5</button>
          <button @click=${() => this._num('6')}>6</button>
          <button class="btn-op" @click=${() => this._op('-')}>-</button>
          
          <button @click=${() => this._num('1')}>1</button>
          <button @click=${() => this._num('2')}>2</button>
          <button @click=${() => this._num('3')}>3</button>
          <button class="btn-op" @click=${() => this._op('+')}>+</button>
          
          <button @click=${() => this._num('0')}>0</button>
          <button @click=${() => this._num('.')}>.</button>
          <button class="btn-eq" @click=${this._calc}>=</button>
        </div>
      </div>
    `;
  }

  _num(n) {
    if (this._newNumber) {
      this.display = n;
      this._newNumber = false;
    } else {
      if (n === '.' && this.display.includes('.')) return;
      if (this.display === '0' && n !== '.') this.display = n;
      else this.display += n;
    }
  }

  _op(op) {
    this.equation = `${this.display} ${op}`;
    this._newNumber = true;
    this._prevVal = parseFloat(this.display);
    this._currentOp = op;
  }

  _del() {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
      this._newNumber = true;
    }
  }

  _clear() {
    this.display = '0';
    this.equation = '';
    this._newNumber = true;
    this._prevVal = null;
    this._currentOp = null;
  }

  _calc() {
    if (!this._currentOp || this._prevVal === null) return;
    
    const current = parseFloat(this.display);
    let result = 0;

    switch(this._currentOp) {
      case '+': result = this._prevVal + current; break;
      case '-': result = this._prevVal - current; break;
      case '*': result = this._prevVal * current; break;
      case '/': result = this._prevVal / current; break;
      case '%': result = this._prevVal % current; break;
    }

    // Format result to avoid floating point errors
    result = parseFloat(result.toFixed(10));
    
    this.equation = `${this._prevVal} ${this._currentOp} ${current} =`;
    this.display = String(result);
    this._newNumber = true;
    this._prevVal = null;
    this._currentOp = null;
  }
}

customElements.define('calculator-tool', CalculatorTool);
