import { Braces, Database, Infinity, Layers, Network, PanelsTopLeft, Zap } from 'lucide-react';
import { Group } from '@www/shared/components/page';
import { FeatureGrid, type Feature } from '@www/shared/components/layout/FeatureGrid';

/** What a cell gives you, one line each. Copy from identity.md in Go. */
const HIGHLIGHTS: Feature[] = [
  { icon: <Database />, title: 'Any data', line: 'A note, a table, a song, a billion-entry log, a genome.' },
  { icon: <Braces />, title: 'Any logic', line: 'Summarize your inbox, dim the lights at sunset, render a video.' },
  { icon: <PanelsTopLeft />, title: 'Any UI', line: 'A cell draws itself. Text, tables, charts, forms.' },
  { icon: <Zap />, title: "It's live", line: 'Change one cell and everything that depends on it follows live. UI too.' },
  { icon: <Network />, title: 'Work scales', line: 'The same cell runs in a worker, across processes or on a cluster.' },
  { icon: <Layers />, title: 'Data scales', line: 'A counter or a billion rows, same cell. Storage shards underneath.' },
  {
    icon: <Infinity />,
    title: "It's made of itself",
    line: 'The space has the same shape as its cells, so you and your agents can program it too.',
    wide: true,
  },
];

/** Highlights — what every cell can do, as an open grid. */
export function Highlights() {
  return (
    <Group kicker="Highlights" title="Program anything." dim="The data, the logic, the look, even the space itself." tight>
      <FeatureGrid items={HIGHLIGHTS} />
    </Group>
  );
}
