import { ExternalIds } from "../../types/shared";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconHome,
} from "@tabler/icons-react";

export default function ExternalLinks({
  externalIds,
  homepage,
}: {
  externalIds: ExternalIds;
  homepage: string;
}) {
  const socialLinks = [
    {
      id: externalIds.facebook_id,
      icon: IconBrandFacebook,
      href: `https://facebook.com/${externalIds.facebook_id}`,
      name: "facebook",
    },
    {
      id: externalIds.instagram_id,
      icon: IconBrandInstagram,
      href: `https://instagram.com/${externalIds.instagram_id}`,
      name: "instagram",
    },
    {
      id: externalIds.twitter_id,
      icon: IconBrandTwitter,
      href: `https://twitter.com/${externalIds.twitter_id}`,
      name: "twitter",
    },
  ];

  return (
    <div className="flex gap-2 rounded-s-sm text-white backdrop-blur">
      {homepage && (
        <Link
          className="transition-colors duration-300 ease-in-out hover:text-neutral-400"
          data-testid="homepage"
          href={homepage}
          target="_blank"
        >
          <IconHome className="h-6 w-6" stroke="1.5" />
        </Link>
      )}
      {socialLinks.map((link, idx) => {
        if (link.id) {
          return (
            <Link
              className="transition-colors duration-300 ease-in-out hover:text-neutral-400"
              data-testid={link.name}
              key={idx}
              href={link.href}
              target="_blank"
            >
              <link.icon className="h-6 w-6" stroke="1" />
            </Link>
          );
        }
      })}
    </div>
  );
}
