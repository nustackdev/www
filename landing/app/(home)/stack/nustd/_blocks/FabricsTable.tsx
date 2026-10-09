import { Table } from '@www/shared/components/media/Table';
import { Stack } from '@www/shared/components/layout/Stack';
import { Chapter, Section, SectionHead } from '@/components/page';
import { FABRICS } from '@www/shared/lib/stack/fabrics';

/** Representative interaction hint per fabric — a short line that reads as
 * "you are DOING something with a Ref," not just naming a type. Distilled
 * from nu/examples/*.py. Kept local while we settle on the wording; move
 * into the canonical Fabric spec once confirmed. */
const FABRIC_PRIMARY: Record<string, string> = {
  kv: 'State.movies.append(m)',
  ui: 'Dashboard.count.set_value(n)',
  cluster: 'Teleport(Add(1,2), "gpu")',
  llm: 'Bot.chat(prompt="…")',
  mem: 'Users.age.set(12)',
  proxy: 'Proxy(Nav, "10.0.0.1")',
  http: 'Solana.get_slot()',
  service: 'Calc.add(a=2, b=3)',
  cc: 'Agent.ask(prompt="…")',
  mp: 'Teleport(Add(1,2), "worker")',
};

/** FabricsTable — every fabric in one compact list, one interaction each.
 * Moved from the old landing. */
export function FabricsTable() {
  return (
    <Chapter>
      <SectionHead
        title="Fabrics."
        lede={<>Each fabric gives your Nu app a new capability. These are the ones Nu ships with today.</>}
      />
      <Section>
        <Stack gap="normal">
          <Table
            variant="list"
            ariaLabel="Fabrics that ship with Nu"
            rows={FABRICS}
            rowKey={(f) => f.slug}
            rowHref={(f) => f.href}
            rowHue={(f) => f.hue}
            columns={[
              {
                key: 'name',
                width: 'minmax(9rem, 12rem)',
                variant: 'mono',
                render: (f) => f.name,
              },
              {
                key: 'desc',
                width: 'minmax(0, 1fr)',
                render: (f) => f.navDesc,
              },
              {
                key: 'primary',
                width: 'minmax(14rem, auto)',
                variant: 'chip',
                align: 'end',
                render: (f) => FABRIC_PRIMARY[f.slug] ?? '—',
              },
            ]}
          />
        </Stack>
      </Section>
    </Chapter>
  );
}
