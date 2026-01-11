import { LitElement, html, css } from 'lit';

const UNITS = {
  length: {
    base: 'm',
    units: {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254
    }
  },
  weight: {
    base: 'kg',
    units: {
      t: 1000,
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495
    }
  },
  temperature: {
    special: true,
    units: ['C', 'F', 'K']
  }
};

export class UnitConverter extends LitElement {
  static properties = {
    category: { type: String },
    fromUnit: { type: String },
    toUnit: { type: String },
    value: { type: Number },
    result: { type: Number }
  };

  constructor() {
    super();
    this.category = 'length';
    this.fromUnit = 'm';
    this.toUnit = 'km';
    this.value = 1;
    this._calculate();
  }

  static styles = css`
    :host {
      display: block;
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .category-select {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .cat-btn {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
      color: white;
      cursor: pointer;
    }

    .cat-btn.active {
      background: #a0a0ff;
      border-color: #a0a0ff;
    }

    .converter-row {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(255,255,255,0.05);
      padding: 20px;
      border-radius: 12px;
    }

    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    input, select {
      padding: 10px;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: white;
      font-size: 1.2rem;
    }

    .equals {
      font-size: 2rem;
      color: rgba(255,255,255,0.5);
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="category-select">
          <button class="cat-btn ${this.category === 'length' ? 'active' : ''}" @click=${() => this._setCategory('length')}>长度</button>
          <button class="cat-btn ${this.category === 'weight' ? 'active' : ''}" @click=${() => this._setCategory('weight')}>重量</button>
          <button class="cat-btn ${this.category === 'temperature' ? 'active' : ''}" @click=${() => this._setCategory('temperature')}>温度</button>
        </div>

        <div class="converter-row">
          <div class="input-group">
            <input type="number" .value=${this.value} @input=${this._onInput}>
            <select .value=${this.fromUnit} @change=${e => { this.fromUnit = e.target.value; this._calculate(); }}>
              ${this._renderOptions()}
            </select>
          </div>

          <div class="equals">=</div>

          <div class="input-group">
            <input type="number" .value=${this.result} readonly>
            <select .value=${this.toUnit} @change=${e => { this.toUnit = e.target.value; this._calculate(); }}>
              ${this._renderOptions()}
            </select>
          </div>
        </div>
      </div>
    `;
  }

  _renderOptions() {
    if (this.category === 'temperature') {
      return UNITS.temperature.units.map(u => html`
        <option value=${u}>${u}</option>
      `);
    }
    if (!UNITS[this.category]) return '';
    return Object.keys(UNITS[this.category].units).map(u => html`
      <option value=${u}>${u}</option>
    `);
  }

  _setCategory(cat) {
    this.category = cat;
    let units;
    if (cat === 'temperature') {
      units = UNITS.temperature.units;
    } else {
      units = Object.keys(UNITS[cat].units);
    }
    this.fromUnit = units[0];
    this.toUnit = units[1] || units[0];
    this._calculate();
  }

  _onInput(e) {
    this.value = parseFloat(e.target.value);
    this._calculate();
  }

  _calculate() {
    if (this.category === 'temperature') {
      let celsius;
      // Convert to Celsius first
      if (this.fromUnit === 'C') celsius = this.value;
      else if (this.fromUnit === 'F') celsius = (this.value - 32) * 5 / 9;
      else if (this.fromUnit === 'K') celsius = this.value - 273.15;

      // Convert Celsius to target
      if (this.toUnit === 'C') this.result = celsius;
      else if (this.toUnit === 'F') this.result = (celsius * 9 / 5) + 32;
      else if (this.toUnit === 'K') this.result = celsius + 273.15;
      
      this.result = Number(this.result.toFixed(2));
      return;
    }

    const data = UNITS[this.category];
    const fromFactor = data.units[this.fromUnit];
    const toFactor = data.units[this.toUnit];
    
    // Convert to base then to target
    const baseValue = this.value * fromFactor;
    this.result = Number((baseValue / toFactor).toFixed(6));
  }
}

customElements.define('unit-converter', UnitConverter);
