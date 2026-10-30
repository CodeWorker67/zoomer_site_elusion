import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gift, Volume2, VolumeX } from 'lucide-react';
import Button from '@components/ui/Button';
import { ROUTES } from '@utils/constants';

const INITIAL_VOLUME = 0.5;

const PRIZES = [
  { places: '1–2 места', prize: 'iPhone 18 Pro', icon: '🏆' },
  { places: '3–4 места', prize: 'iPhone Duo', icon: '📱' },
  { places: '5–9 места', prize: 'iPhone 17 Pro Max', icon: '📱' },
  { places: '10–13 места', prize: 'iPhone Air', icon: '📱' },
  { places: '14–15 места', prize: 'PlayStation 5', icon: '🎮' },
  { places: '16–18 места', prize: 'iPad', icon: '📲' },
  { places: '19–20 места', prize: 'AirPods Max', icon: '🎧' },
  { places: '21–22 места', prize: 'MacBook', icon: '💻' },
  { places: '23–25 места', prize: 'Apple Watch', icon: '⌚️' },
  { places: '26–30 места', prize: 'GTA 6', icon: '🎮' },
  { places: '31–35 места', prize: 'AirPods', icon: '🎧' },
  { places: '36–50 места', prize: 'по 5 000 ₽', icon: '💸' },
  { places: '51–75 места', prize: 'по 2 000 ₽', icon: '💸' },
  { places: '76–90 места', prize: 'по 1 000 ₽', icon: '💸' },
  { places: '91–100 места', prize: 'по году подписки на Зумерский VPN', icon: '💜' },
];

function Quote({ children, className = '' }) {
  return (
    <div
      className={`border-l-[3px] border-happ-blue/40 bg-happ-gray rounded-r-xl px-4 py-3 text-happ-muted text-sm md:text-[15px] leading-relaxed ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomeRaffleSection() {
  const videoRef = useRef(null);
  const userAdjustedSoundRef = useRef(false);
  const [prizesOpen, setPrizesOpen] = useState(false);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [muted, setMuted] = useState(true);

  const applySoundToVideo = (video, nextVolume, nextMuted) => {
    video.volume = nextVolume;
    video.muted = nextMuted;
  };

  const startPlayback = async (video) => {
    applySoundToVideo(video, INITIAL_VOLUME, false);
    try {
      await video.play();
      setVolume(INITIAL_VOLUME);
      setMuted(false);
      return;
    } catch {
      /* Без жеста пользователя браузер не даёт autoplay со звуком */
    }
    applySoundToVideo(video, INITIAL_VOLUME, true);
    setVolume(INITIAL_VOLUME);
    setMuted(true);
    await video.play().catch(() => {});
  };

  const unmuteWithPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    userAdjustedSoundRef.current = true;
    const nextVolume = volume > 0 ? volume : INITIAL_VOLUME;
    applySoundToVideo(video, nextVolume, false);
    try {
      await video.play();
      setVolume(nextVolume);
      setMuted(false);
    } catch {
      applySoundToVideo(video, nextVolume, true);
      setMuted(true);
    }
  };

  const toggleMute = () => {
    if (muted) {
      unmuteWithPlay();
      return;
    }
    userAdjustedSoundRef.current = true;
    setMuted(true);
    const video = videoRef.current;
    if (video) video.muted = true;
  };

  const onVolumeChange = (event) => {
    const nextVolume = Number(event.target.value) / 100;
    userAdjustedSoundRef.current = true;
    setVolume(nextVolume);
    const video = videoRef.current;
    if (!video) return;
    video.volume = nextVolume;
    if (nextVolume === 0) {
      setMuted(true);
      video.muted = true;
      return;
    }
    video.muted = false;
    setMuted(false);
    video.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = INITIAL_VOLUME;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => {
      if (userAdjustedSoundRef.current) return;
      startPlayback(video);
    };
    onReady();
    video.addEventListener('loadeddata', onReady);
    return () => video.removeEventListener('loadeddata', onReady);
  }, []);

  return (
    <section className="relative pt-10 pb-14 md:pt-14 md:pb-20" style={{ background: '#fff' }}>
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-purple-500/15 text-purple-200 border border-purple-400/25">
            <Gift className="w-3.5 h-3.5" aria-hidden />
            День рождения — 2 года
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-zoomer-border shadow-[0_0_40px_rgba(168,85,247,0.12)] mb-8 w-full leading-[0]">
          <video
            ref={videoRef}
            className="w-full h-auto block"
            src="/raffle-happ-v7.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Розыгрыш призов Зумерский VPN для Happ"
          />
          <div
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 inline-flex items-center gap-1 rounded-full bg-[#222]/95 px-1.5 py-1 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={toggleMute}
              className="shrink-0 text-white hover:opacity-80 transition-opacity"
              aria-label={muted ? 'Включить звук' : 'Выключить звук'}
            >
              {muted ? (
                <VolumeX className="w-[18px] h-[18px]" aria-hidden />
              ) : (
                <Volume2 className="w-[18px] h-[18px]" aria-hidden />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(volume * 100)}
              onChange={onVolumeChange}
              className="video-volume-pill-slider w-[34px] shrink-0 cursor-pointer"
              aria-label="Громкость"
            />
          </div>
        </div>

        <div className="card-dark text-left space-y-4 border-purple-500/20">
          <p className="text-happ-ink text-base md:text-lg leading-relaxed">
            <span className="mr-1" aria-hidden>
              🎁
            </span>
            <strong className="font-bold text-happ-ink">ЗУМЕРСКИЙ ДАРИТ — 100 ПРИЗОВЫХ МЕСТ! iPhone 18 pro</strong>
            , iPhone duo и еще 98 ценных призов!
            <span className="ml-0.5" aria-hidden>
              ⚡️
            </span>
          </p>

          <p className="text-happ-muted text-sm md:text-base leading-relaxed">
            Нам 2 года! В честь дня рождения разыгрываем технику, игры, денежные призы и годовые подписки{' '}
            <span aria-hidden>🔥</span>
          </p>

          <div className="rounded-xl border border-zoomer-border/80 overflow-hidden bg-happ-gray/80">
            <button
              type="button"
              onClick={() => setPrizesOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/[0.03] transition-colors"
              aria-expanded={prizesOpen}
            >
              <span className="text-happ-ink font-semibold text-sm md:text-base">Что можно выиграть:</span>
              <ChevronDown
                className={`w-5 h-5 text-zoomer-neon shrink-0 transition-transform duration-200 ${prizesOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {prizesOpen && (
              <ul className="px-4 pb-4 space-y-2.5 border-t border-zoomer-border/60 pt-3">
                {PRIZES.map(({ places, prize, icon }) => (
                  <li key={places} className="text-sm md:text-[15px] text-happ-muted leading-snug">
                    <span className="mr-1.5" aria-hidden>
                      {icon}
                    </span>
                    <strong className="text-happ-ink font-semibold">{places}:</strong> {prize}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-happ-ink font-semibold text-sm md:text-base">
              <span className="mr-1" aria-hidden>
                🎟
              </span>
              Как получить билетики?
            </p>
            <Quote>Покупай или продлевай подписку, а также дари VPN близким на сайте или через бота.</Quote>
            <Quote>
              <strong className="text-happ-ink">За каждый оплаченный месяц — 1 билетик:</strong>
            </Quote>
            <Quote>3 месяца = 3 билета, год = 12 билетов.</Quote>
            <p className="text-happ-muted text-sm md:text-[15px] leading-relaxed pt-1">
              Все билетики складываются. Количество покупок и подарков не ограничено!
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4 max-w-md mx-auto w-full">
            <Link to={ROUTES.LOGIN} className="block w-full">
              <Button className="w-full text-center">Принять участие</Button>
            </Link>
            <Link to={ROUTES.LOGIN} className="block w-full">
              <Button variant="secondary" className="w-full text-center">
                Попробовать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
