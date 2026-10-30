const STEPS = [
  {
    n: '1',
    title: 'Зарегистрируйтесь',
    text: 'Email, Телефон, Telegram, Google Auth. Простейшая регистрация и вам будет выдан доступ на 1 день бесплатно.',
  },
  {
    n: '2',
    title: 'Скачайте Happ',
    text: 'App Store, Google Play или установщик для Windows. Приложение бесплатное, подписка добавляется одной кнопкой.',
  },
  {
    n: '3',
    title: 'Нажмите Connect',
    text: 'Выберите ближайший сервер — интернет работает на полной скорости.',
  },
];

export default function StepsSection() {
  return (
    <section id="steps" className="section" style={{ background: '#fff' }}>
      <div className="section-inner">
        <p className="kicker">Подключение</p>
        <h2 className="h2" style={{ marginBottom: 48 }}>
          Три шага. Одна минута.
        </h2>
        <div className="three">
          {STEPS.map((step) => (
            <div className="step-card" key={step.n}>
              <div className="step-num">{step.n}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
