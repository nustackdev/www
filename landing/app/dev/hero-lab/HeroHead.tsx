import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Button } from '@www/shared/components/controls/Button';
import { cn } from '@www/shared/lib/cn';
import s from './lab.module.css';

/** The real hero copy, kept in step with (home)/_blocks/hero/Hero.tsx by hand. */
export function HeroHead({ center, className }: { center?: boolean; className?: string }) {
  return (
    <div className={cn(s.head, center && s.headCenter, className)}>
      <div className={s.titleBlock}>
        <p className={s.eyebrow}>Open-source · Self-hosted · Data stays local</p>
        <p className={s.title} role="heading" aria-level={2}>
          Build your computational space
          <br />
          <span className={s.dim}>for everything you work with: notes, data, tools, agents.</span>
        </p>
      </div>
      <div className={s.row}>
        <p className={s.sub}>
          Elsewhere, a note is a dead document, data is scattered, tools are siloed and an agent&apos;s work is lost in
          chat. In nuspace, they&apos;re all connected cells: living programs that hold data, logic and look in one form.
        </p>
        <div className={s.actions}>
          <Button variant="primary" href="/#start" arrow>
            Get started
          </Button>
          <Button variant="secondary" href="https://github.com/nustackdev/nuspace">
            <GithubMark size={16} />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
