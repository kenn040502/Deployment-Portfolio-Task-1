import { useState } from 'react';

const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Housing', 'Health', 'Entertainment', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Gift', 'Other'];

function todayDate() {
  const d = new Date();
  const pad = (v) => String(v).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const emptyForm = () => ({
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: todayDate(),
});

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm());

  const categories = form.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'type') {
        updated.category = value === 'expense' ? 'Food' : 'Salary';
      }
      return updated;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description.trim() || !form.date || isNaN(amount) || amount <= 0) return;

    const payload = {
      id: crypto.randomUUID ? crypto.randomUUID() : `t-${Date.now()}`,
      description: form.description.trim(),
      amount,
      type: form.type,
      category: form.category,
      date: form.date,
      createdAt: new Date().toISOString(),
    };

    onAdd(payload);
    setForm(emptyForm());
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Grocery run"
            required
          />
        </label>
        <label>
          Amount ($)
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </label>
      </div>
      <div className="form-row form-row-3">
        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" className="primary">
        Add transaction
      </button>
    </form>
  );
}
