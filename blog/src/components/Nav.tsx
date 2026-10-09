import { ThemeProvider } from '@www/shared/components/nav/ThemeProvider';
import { FloatingNav } from '@www/shared/components/nav/FloatingNav';

/** The site nav as a blog island, with the theme context its toggle needs. */
export default function Nav() {
  return (
    <ThemeProvider>
      <FloatingNav />
    </ThemeProvider>
  );
}
