import { ProjectsView } from '@/src/components/ProjectsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Ram Guinto',
  description: 'A collection of my recent front-end development, AI engineering, and graphic design projects.',
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
