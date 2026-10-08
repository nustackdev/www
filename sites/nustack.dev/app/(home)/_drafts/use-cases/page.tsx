import { Page, Header, Body } from '@/components/page';
import { UseCasesCatalogue } from './UseCasesCatalogue';

export default function UseCasesPage() {
  return (
    <Page>
      <Header
        title="Real programs built on Nu."
        lede={
          <>
            Pick the job that matches yours. Each one ships as one folder of
            Python, spans at least two fabrics, and runs from a single process.
          </>
        }
      />
      <Body>
        <UseCasesCatalogue />
      </Body>
    </Page>
  );
}
