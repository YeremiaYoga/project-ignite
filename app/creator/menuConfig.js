import { Hourglass } from "lucide-react";

export const MENU_CONFIG = [
  {
    id: "timeline",
    icon: Hourglass,
    label: "Time Line",
    href: "/creator/timeline/era",
    character_limit: false,
    items: [
      { label: "Era", href: "/creator/timeline/era" },
      { label: "Calender", href: "/creator/timeline/calender" },
      { label: "Event", href: "/creator/timeline/event" },
    ],
  },
  {
    id: "article",
    label: "Article",
    href: "/creator/article",
    icon: Hourglass,
    character_limit: true,
    items: [
      { label: "Journals", href: "/creator/article/journals" },
      { label: "Testing 1", href: "/creator/article/testing-1" },
    ],
  },
];
