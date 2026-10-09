import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import { GISCUS } from '../lib/giscus';

/** Post comments via giscus, following the site theme as it toggles. */
export default function Comments() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // A real element for client:visible to observe; giscus itself renders nothing on the server.
  return (
    <div style={{ minHeight: 240 }}>
      <Giscus
        {...GISCUS}
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
