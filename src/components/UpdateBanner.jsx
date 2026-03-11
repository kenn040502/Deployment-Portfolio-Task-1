const toneMap = {
  checking: 'info',
  available: 'info',
  downloading: 'info',
  downloaded: 'success',
  none: 'muted',
  error: 'danger',
  idle: 'muted',
};

export default function UpdateBanner({ status, onInstall }) {
  if (!status?.message) return null;
  const tone = toneMap[status.state] || 'muted';
  const showInstall = status.state === 'downloaded';

  return (
    <section className={`update-banner ${tone}`}>
      <div>
        <p className="eyebrow">Updater</p>
        <p>{status.message}</p>
      </div>
      {showInstall && (
        <button type="button" className="primary" onClick={onInstall}>
          Install update
        </button>
      )}
    </section>
  );
}
