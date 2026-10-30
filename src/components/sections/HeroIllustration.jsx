import { useLayoutEffect, useMemo, useRef } from 'react';

const SERVERS = [
  { flag: 'de', title: 'Германия \u00a0| Безлимит', sub: 'VLESS | TCP | Reality | JSON' },
  { flag: 'nl', title: 'Нидерланды \u00a0| Безлимит', sub: 'VLESS | TCP | Reality | JSON' },
  { flag: 'pl', title: 'Польша \u00a0| Безлимит', sub: 'VLESS | xhttp | Reality | JSON' },
  { flag: 'fi', title: 'Финляндия \u00a0| Безлимит', sub: 'VLESS | TCP | Reality | JSON' },
  { flag: 'ru', title: 'LTE \u00a0| Безлимит', sub: 'VLESS | WebSocket | TLS | JSON' },
  { flag: 'at', title: 'Австрия \u00a0| Безлимит', sub: 'VLESS | TCP | Reality | JSON' },
];

function makeStars() {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const stars = [];
  for (let i = 0; i < 60; i += 1) {
    stars.push({
      x: Math.round(rnd() * 890),
      y: Math.round(rnd() * 650),
      r: 1 + Math.round(rnd() * 2),
      dur: (2 + rnd() * 4).toFixed(1),
      delay: (rnd() * 4).toFixed(1),
    });
  }
  return stars;
}

function Chevron() {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 1.5 7 7l-5.5 5.5" />
    </svg>
  );
}

export default function HeroIllustration() {
  const illoRef = useRef(null);
  const innerRef = useRef(null);
  const stars = useMemo(makeStars, []);

  useLayoutEffect(() => {
    const illo = illoRef.current;
    const inner = innerRef.current;
    if (!illo || !inner) return undefined;

    const fit = () => {
      const s = Math.min(1, (illo.clientWidth || 900) / 900);
      inner.style.transform = `scale(${s.toFixed(4)})`;
      illo.style.height = `${Math.round(660 * s)}px`;
    };

    fit();
    window.addEventListener('resize', fit);
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(illo);
    return () => {
      window.removeEventListener('resize', fit);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="illo" id="illo" ref={illoRef}>
      <div className="illo__in" id="illo-in" ref={innerRef}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 40,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,92,255,.13), transparent 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 60,
            bottom: 60,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(10,108,255,.12), transparent 68%)',
          }}
        />
        <div id="stars">
          {stars.map((star, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: star.x,
                top: star.y,
                width: star.r,
                height: star.r,
                borderRadius: '50%',
                background: '#B9BCE8',
                animation: `twinkle ${star.dur}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', left: 60, top: 70, width: 210, height: 210, animation: 'floaty 9s ease-in-out infinite' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 32% 28%, #ffb46b, #ff7a4d 55%, #b93d5c 100%)',
              boxShadow: '0 0 50px rgba(255,140,90,.35)',
            }}
          />
          <div style={{ position: 'absolute', left: '50%', top: '52%', width: '150%', height: '150%', transform: 'translate(-50%,-50%) rotate(-18deg)' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                width: '100%',
                height: 70,
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                border: '11px solid rgba(255,224,178,.85)',
                borderTopColor: 'transparent',
              }}
            />
          </div>
          <div style={{ position: 'absolute', left: 44, top: 50, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.18)' }} />
          <div style={{ position: 'absolute', left: 120, top: 106, width: 22, height: 22, borderRadius: '50%', background: 'rgba(120,30,60,.35)' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            right: 110,
            top: 70,
            width: 104,
            height: 104,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #7df3e0, #23b8c9 60%, #0e5f8f)',
            boxShadow: '0 0 34px rgba(60,220,220,.35)',
            animation: 'floaty 7s ease-in-out .8s infinite',
          }}
        >
          <div style={{ position: 'absolute', left: 20, top: 24, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,.22)' }} />
          <div style={{ position: 'absolute', left: 60, top: 58, width: 14, height: 14, borderRadius: '50%', background: 'rgba(10,60,90,.4)' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 660,
            top: 330,
            width: 118,
            height: 118,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 34% 28%, #F5F3EE, #D9D6CE 58%, #A9A6A0 100%)',
            boxShadow: '0 14px 40px rgba(60,60,90,.18), inset -8px -10px 22px rgba(120,118,130,.35)',
            animation: 'floaty 7.5s ease-in-out 1.1s infinite',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 30,
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(150,148,150,.35)',
              boxShadow: 'inset 0 3px 5px rgba(90,88,95,.35)',
            }}
          />
          <div style={{ position: 'absolute', left: 64, top: 22, width: 14, height: 14, borderRadius: '50%', background: 'rgba(150,148,150,.3)' }} />
          <div
            style={{
              position: 'absolute',
              left: 52,
              top: 66,
              width: 34,
              height: 22,
              borderRadius: '50%',
              background: 'rgba(150,148,150,.28)',
              boxShadow: 'inset 0 3px 5px rgba(90,88,95,.3)',
            }}
          />
          <div style={{ position: 'absolute', left: 22, top: 74, width: 12, height: 12, borderRadius: '50%', background: 'rgba(150,148,150,.25)' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 140,
            bottom: 150,
            width: 62,
            height: 62,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #c9b3ff, #8b5cf6 60%, #4c2a9e)',
            boxShadow: '0 0 24px rgba(150,110,255,.4)',
            animation: 'floaty 8s ease-in-out 1.6s infinite',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '62%',
            width: 860,
            height: 360,
            transform: 'translate(-50%,-50%)',
            border: '2px dashed rgba(139,123,255,.3)',
            borderRadius: '50%',
            animation: 'orbitspin 60s linear infinite',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 4,
            transform: 'translateX(-50%)',
            width: 380,
            height: 28,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(20,24,54,.22), transparent 70%)',
          }}
        />

        <div className="ph" aria-hidden="true">
          <div className="ph__body" />
          <div className="ph__btn" style={{ left: -2, top: 118, height: 26 }} />
          <div className="ph__btn" style={{ left: -2, top: 162, height: 48 }} />
          <div className="ph__btn" style={{ left: -2, top: 222, height: 48 }} />
          <div className="ph__btn" style={{ right: -2, top: 184, height: 74 }} />
          <div className="ph__scr">
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 160,
                width: 280,
                height: 280,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(92,84,255,.34), transparent 64%)',
              }}
            />

            <div style={{ position: 'absolute', left: 24, top: 17, fontSize: 12, fontWeight: 700, letterSpacing: -0.2 }}>15:56</div>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 10,
                width: 86,
                height: 26,
                transform: 'translateX(-50%)',
                borderRadius: 14,
                background: '#000',
              }}
            />
            <div style={{ position: 'absolute', right: 22, top: 18, display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="#fff">
                <rect x="0" y="7" width="3" height="4" rx="1" />
                <rect x="4.3" y="5" width="3" height="6" rx="1" />
                <rect x="8.6" y="2.5" width="3" height="8.5" rx="1" />
                <rect x="12.9" y="0" width="3" height="11" rx="1" fill="rgba(255,255,255,.35)" />
              </svg>
              <div
                style={{
                  width: 25,
                  height: 12,
                  borderRadius: 4,
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  fontWeight: 800,
                  color: '#0c0930',
                  letterSpacing: -0.2,
                }}
              >
                43
              </div>
            </div>

            <svg style={{ position: 'absolute', left: 22, top: 54 }} width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1L15 3.5H9l-.3 2.5a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.7 7.7 0 0 0 1.7 1l.3 2.5h6l.3-2.5a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
            </svg>
            <svg style={{ position: 'absolute', right: 22, top: 53 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 4v16M4 12h16" />
            </svg>

            <div style={{ position: 'absolute', left: '50%', top: 160, width: 0, height: 0 }}>
              <div
                className="ph__ring"
                style={{
                  width: 158,
                  height: 158,
                  background: 'conic-gradient(from 200deg, rgba(96,128,255,.6), rgba(150,90,230,.5), rgba(255,92,124,.6), rgba(96,128,255,.6))',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
                }}
              />
              <div
                className="ph__ring"
                style={{
                  width: 132,
                  height: 132,
                  background: 'radial-gradient(circle at 50% 30%, rgba(120,110,255,.26), rgba(60,52,170,.16) 72%)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)',
                }}
              />
              <div
                className="ph__ring"
                style={{
                  width: 102,
                  height: 102,
                  background: 'radial-gradient(circle at 50% 28%, #4b46b8, #332e93 60%, #272374 100%)',
                  boxShadow: '0 12px 30px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#17143f" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 3v9" />
                  <path d="M6.6 6.6a7.5 7.5 0 1 0 10.8 0" />
                </svg>
              </div>
            </div>

            <div className="ph__hide">Скрыть все</div>

            <div className="ph__list">
              {SERVERS.map((server) => (
                <div className="ph-item" key={server.title}>
                  <div className={`ph-flag ph-flag--${server.flag}`} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ph-item__t">{server.title}</div>
                    <div className="ph-item__s">{server.sub}</div>
                  </div>
                  <Chevron />
                </div>
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 46,
                background: 'linear-gradient(180deg, rgba(12,9,48,0), #0c0930 78%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 6,
                width: 100,
                height: 4,
                transform: 'translateX(-50%)',
                borderRadius: 2,
                background: 'rgba(255,255,255,.75)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
