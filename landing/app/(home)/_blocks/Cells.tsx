import { Braces, Database, Infinity, Layers, Network, PanelsTopLeft, Zap } from 'lucide-react';
import { Button } from '@www/shared/components/controls/Button';
import { Section } from '@www/shared/components/page';
import { FeatureGrid, type Feature } from '@www/shared/components/layout/FeatureGrid';
import { AgentsDemo } from './agents/AgentsDemo';

/** What a cell gives you, one line each. Copy from compass/nuspace/structure.md in Go. */
const HIGHLIGHTS: Feature[] = [
  { icon: <Database />, title: 'Any data', line: 'A note, a table, a song, a billion-entry log, a genome.' },
  { icon: <Braces />, title: 'Any logic', line: 'Summarize your inbox, dim the lights at sunset, render a video.' },
  { icon: <PanelsTopLeft />, title: 'Any UI', line: 'A cell draws itself. Text, tables, charts, forms.' },
  { icon: <Zap />, title: "It's live", line: 'Change one cell and everything that depends on it follows. UI too.' },
  { icon: <Network />, title: 'Work scales', line: 'The same cell runs in a worker, across processes or on a cluster.' },
  { icon: <Layers />, title: 'Data scales', line: 'A counter or a billion rows, same cell. Storage shards underneath.' },
  {
    icon: <Infinity />,
    title: "It's made of itself",
    line: 'The space has the same shape as its cells, so you and your agents can program it too.',
    wide: true,
  },
];

/**
 * Cells: how it works, one heading over a group: an agent's program playing
 * into a window, then what every cell gives you, as an open grid that names
 * what the program just showed.
 */
export function Cells() {
  return (
    <Section
      id="cells"
      eyebrow="How it works"
      tagline="Program anything."
      description="The data, the logic, the look, even the space itself."
      actions={
        <Button variant="primary" href="#start" arrow>
          Start your space
        </Button>
      }
    >
      <AgentsDemo />
      <FeatureGrid items={HIGHLIGHTS} accordion />
    </Section>
  );
}
