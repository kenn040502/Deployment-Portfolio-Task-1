import { useState } from 'react';

function defaultSchedule() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

const emptyForm = () => ({
  title: '',
  subject: '',
  minutes: 45,
  scheduledFor: defaultSchedule(),
});

export default function SessionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'minutes' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.scheduledFor) return;

    const id = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}`;
    const payload = {
      id,
      title: form.title.trim(),
      subject: form.subject.trim(),
      minutes: Math.max(10, Number(form.minutes)),
      scheduledFor: new Date(form.scheduledFor).toISOString(),
      status: 'planned',
      createdAt: new Date().toISOString(),
    };

    onAdd(payload);
    setForm(emptyForm());
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Session goal
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Draft update plan"
            required
          />
        </label>
        <label>
          Subject
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="SWE40006"
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Minutes
          <input
            type="number"
            name="minutes"
            min="10"
            max="180"
            step="5"
            value={form.minutes}
            onChange={handleChange}
          />
        </label>
        <label>
          Scheduled
          <input
            type="datetime-local"
            name="scheduledFor"
            value={form.scheduledFor}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" className="primary">
        Add session
      </button>
    </form>
  );
}
