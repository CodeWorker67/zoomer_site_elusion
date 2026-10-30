import { useState } from 'react';
import clsx from 'clsx';

export default function FaqSection({ items, title = 'Частые вопросы' }) {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section" style={{ background: '#0F1116' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <p className="kicker" style={{ color: '#4A8CFF' }}>
          FAQ
        </p>
        <h2 className="h2" style={{ color: '#fff', marginBottom: 36 }}>
          {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={clsx('faq-item', isOpen && 'is-open')} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-sign">{isOpen ? '−' : '+'}</span>
                </button>
                <p className="faq-a">{item.a}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
