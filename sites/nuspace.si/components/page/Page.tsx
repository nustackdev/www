import { Page as SharedPage, type PageProps } from '@www/shared/components/page';
import { Footer } from '@/components/Footer';

/** Shared Page with the nuspace.si footer. */
export function Page(props: Omit<PageProps, 'footer'>) {
  return <SharedPage {...props} footer={<Footer />} />;
}
