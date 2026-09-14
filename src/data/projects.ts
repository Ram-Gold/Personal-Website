import { ASSETS } from "./assets";

export interface Project {
  id: string;
  title: string;
  year: string;
  tags: string[];
  href: string;
  image: string;
  video?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "ave-muji-cards",
    title: "Ave Muji Cards",
    year: "2026",
    tags: ["Interactive", "Sandbox"],
    href: "/project-ave-muji-cards",
    image: "/assets/images/ave_muji_cards_preview.jpg",
    video: "https://2jb116hoscccm9hn.public.blob.vercel-storage.com/projects/previews/avemujipreview.webm",
  },
  {
    id: "idol-chant",
    title: "Idol Chant & Mixes",
    year: "2026",
    tags: ["Website"],
    href: "/project-idol-chant",
    image: ASSETS.projects.idolChant,
  },
  {
    id: "pubmats",
    title: "Pubmats",
    year: "2026",
    tags: ["Graphic Design"],
    href: "/pubmats",
    image: ASSETS.pubmats.quizBee,
  },
  {
    id: "koncentrate",
    title: "Koncentrate",
    year: "2026",
    tags: ["Linux", "Widget"],
    href: "/project-koncentrate",
    image: ASSETS.projects.koncentrate,
  },
  {
    id: "domodomo",
    title: "DomoDomo",
    year: "2026",
    tags: ["Co-Founded", "AI"],
    href: "/project-domodomo",
    image: ASSETS.projects.domodomo,
  },
];
