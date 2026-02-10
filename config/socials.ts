import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "GitHub",
    username: "@muhabura32-crypto",
    icon: Icons.gitHub,
    link: "https://github.com/muhabura32-crypto"
  },
  {
    name: "Email",
    username: "muhabura32@gmail.com",
    icon: Icons.gmail,
    link: "mailto:muhabura32@gmail.com",
  },
  {
    name: "WhatsApp",
    username: "0791220096",
    icon: Icons.whatsapp,
    link: "https://wa.me/254791220096",
  },
  {
    name: "Facebook",
    username: "@umwami.wabami",
    icon: Icons.facebook,
    link: "https://facebook.com/@umwami.wabami",
  },
  {
    name: "Instagram",
    username: "@jezeb29",
    icon: Icons.instagram,
    link: "https://instagram.com/jezeb29",
  },
];
