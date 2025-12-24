import { Hourglass } from "lucide-react";

export const MENU_CONFIG = [
  {
    id: "timeline",
    icon: Hourglass,
    label: "Time Line",
    href: "/creator/timeline/era", // default saat klik icon kiri
    items: [
      { label: "Era", href: "/creator/timeline/era" },
      { label: "Calender", href: "/creator/timeline/calender" },
      { label: "Event", href: "/creator/timeline/event" },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/creator/dashboard",
    icon: Hourglass,
    items: [
      { label: "Testing", href: "/creator/dashboard/testing" },
      { label: "Testing 1", href: "/creator/dashboard/testing-1" },
    ],
  },
];
