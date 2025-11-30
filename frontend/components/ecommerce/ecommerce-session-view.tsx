'use client';

import { SessionView } from '@/components/app/session-view';
import type { AppConfig } from '@/app-config';

interface EcommerceSessionViewProps {
  appConfig: AppConfig;
}

export function EcommerceSessionView({ appConfig, ...props }: React.ComponentProps<'section'> & EcommerceSessionViewProps) {
  return (
    <section className="relative h-full w-full" {...props}>
      <SessionView appConfig={appConfig} />
    </section>
  );
}
