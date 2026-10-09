import { Page as SharedPage, type PageProps } from '@www/shared/components/page';
import { Footer } from '@/components/nav/Footer';

/** Shared Page with the nustack.dev footer. */
export function Page(props: Omit<PageProps, 'footer'>) {
  return <SharedPage {...props} footer={<Footer />} />;
}
