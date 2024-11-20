import React, { useEffect } from 'react';

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: 'true' | 'false';
  pageLevelAds?: boolean;
  adTest?: 'on' | 'off';
  children?: React.ReactNode;
  [key: string]: unknown; // Allow additional props for flexibility
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSense({
  className = '',
  style = { display: 'block' },
  client,
  slot,
  layout = '',
  layoutKey = '',
  format = 'auto',
  responsive = 'false',
  pageLevelAds = false,
  adTest = 'on',
  children,
  ...rest
}: AdSenseProps) {
  useEffect(() => {
    const adConfig: Record<string, unknown> = {};
    if (pageLevelAds) {
      adConfig.google_ad_client = client;
      adConfig.enable_page_level_ads = true;
    }

    try {
      if (typeof window === 'object' && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push(adConfig);
      }
    } catch {
      // Suppress errors silently
    }
  }, [client, pageLevelAds]);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={adTest}
      {...rest}
    >
      {children}
    </ins>
  );
}
