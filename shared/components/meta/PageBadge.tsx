import { MonoKicker } from './MonoKicker';
import { SilverWovenName, type SilverWovenHue } from './SilverWovenName';
import s from './PageBadge.module.css';

export type PageBadgeKind = 'fabric' | 'tool' | 'use case' | 'app' | 'spec';

interface Props {
  kind: PageBadgeKind;
  name: string;
  hue: SilverWovenHue;
  className?: string;
}

/** PageBadge — the header meta slot for every detail page.
 *  Renders a uppercase mono kicker ("FABRIC ·", "TOOL ·", …) next to the
 *  entity name in a SilverWovenName. SilverWovenName is a sibling of the
 *  kicker, not a child, so it does not inherit `text-transform`.
 *
 *  Pass as the `meta` prop of <Header>:
 *    <Header meta={<PageBadge kind="fabric" name="nustd.ui" hue="teal" />} … />
 */
export function PageBadge({ kind, name, hue, className }: Props) {
  const cls = [s.badge, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <MonoKicker as="span" size="xs" tracking="wider">
        {kind} ·
      </MonoKicker>
      <SilverWovenName as="span" hue={hue}>
        {name}
      </SilverWovenName>
    </span>
  );
}
