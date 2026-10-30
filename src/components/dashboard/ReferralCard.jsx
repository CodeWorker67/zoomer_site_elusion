import { useEffect, useState } from 'react';
import { Copy, Check, TrendingUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { partnerApi } from '@services/api';
import { resolvePartnerSiteLink } from '@utils/site';

export default function ReferralCard() {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    partnerApi.stats()
      .then(({ data }) => {
        setLink(resolvePartnerSiteLink(data.site_link, data.partner_code));
      })
      .catch(() => setLink(''))
      .finally(() => setLoading(false));
  }, []);

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Ссылка скопирована');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="card-dark flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-zoomer-neon animate-spin" />
      </div>
    );
  }

  if (!link) return null;

  return (
    <div className="card-dark">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-zoomer-neon/10 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-zoomer-neon" />
        </div>
        <div>
          <h3 className="text-happ-ink font-semibold">Приглашайте друзей</h3>
          <p className="text-happ-faint text-sm mt-0.5">Получайте 50% с каждой оплаты</p>
        </div>
      </div>
      <div className="p-3 bg-happ-gray rounded-xl border border-zoomer-border">
        <span className="text-sm text-happ-blue font-mono break-all block">{link}</span>
      </div>
      <button
        type="button"
        onClick={copy}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-happ-blue/45 bg-happ-blue/[0.07] text-happ-blue text-sm font-semibold hover:bg-happ-blue/10 hover:border-happ-blue/70 transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Скопировано' : 'Копировать'}
      </button>
    </div>
  );
}
