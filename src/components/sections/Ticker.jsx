const ITEMS = [
  { value: '95 000+', label: 'Пользователей' },
  { value: '10', label: 'Локаций' },
  { value: '99.9%', label: 'Аптайм' },
  { value: '10 Гбит', label: 'Канал' },
  { value: '<50 мс', label: 'Пинг (EU)' },
  { value: '5', label: 'Устройств' },
];

function TickerItem({ value, label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 52px',
        whiteSpace: 'nowrap',
        borderRight: '1px solid rgba(255,255,255,.07)',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>{value}</span>
      <span
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,.4)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div style={{ overflow: 'hidden', background: 'linear-gradient(100deg,#06122a 0%,#0d2048 40%,#0a1a3e 70%,#07112a 100%)' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'tick 22s linear infinite' }}>
        {loop.map((item, i) => (
          <TickerItem key={`${item.label}-${i}`} value={item.value} label={item.label} />
        ))}
      </div>
    </div>
  );
}
