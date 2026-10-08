import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NustackMark } from '@www/shared/components/marks/NustackMark';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NustackMark mono />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
