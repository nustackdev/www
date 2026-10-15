import { PlainNav } from '@www/shared/components/nav/PlainNav';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <PlainNav />
      <main className="flex flex-1 flex-col" data-pagefind-body>
        {children}
      </main>
    </>
  );
}
