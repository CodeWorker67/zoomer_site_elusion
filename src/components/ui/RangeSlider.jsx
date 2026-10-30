import { useId } from 'react';

/**
 * Дискретный бегунок в стиле сайта (синий акцент, светлый трек).
 * options: [{ value, label }], value — значение выбранной опции.
 */
export default function RangeSlider({
  title,
  valueLabel,
  options,
  value,
  onChange,
  disabled = false,
}) {
  const id = useId();
  const lastIndex = Math.max(options.length - 1, 1);
  const rawIndex = options.findIndex((o) => o.value === value);
  const index = rawIndex < 0 ? 0 : rawIndex;

  const progress = (i) => (options.length > 1 ? i / lastIndex : 0);

  return (
    <div className={disabled ? 'opacity-60 pointer-events-none' : ''}>
      <div className="mb-3">
        <label htmlFor={id} className="block text-base font-bold text-happ-ink">
          {title}
        </label>
        {valueLabel && <p className="text-sm text-happ-faint mt-0.5">{valueLabel}</p>}
      </div>

      <input
        id={id}
        type="range"
        className="range-slider"
        min={0}
        max={options.length - 1}
        step={1}
        value={index}
        disabled={disabled}
        style={{ '--p': progress(index) }}
        onChange={(e) => onChange(options[Number(e.target.value)].value)}
        aria-valuetext={options[index]?.label}
      />

      <div className="range-ticks" aria-hidden="false">
        {options.map((opt, i) => (
          <button
            key={String(opt.value)}
            type="button"
            className={`range-tick ${i === index ? 'range-tick--active' : ''}`}
            style={{ '--p': progress(i) }}
            onClick={() => onChange(opt.value)}
            tabIndex={-1}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
