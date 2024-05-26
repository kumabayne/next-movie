import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { ExternalIds } from "../types/shared";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

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
      icon: FaFacebook,
      href: `https://facebook.com/${externalIds.facebook_id}`,
      name: "facebook",
    },
    {
      id: externalIds.instagram_id,
      icon: FaInstagram,
      href: `https://instagram.com/${externalIds.instagram_id}`,
      name: "instagram",
    },
    {
      id: externalIds.twitter_id,
      icon: FaXTwitter,
      href: `https://twitter.com/${externalIds.twitter_id}`,
      name: "twitter",
    },
  ];

  return (
    <div className="flex gap-2 mb-4 text-indigo-600 md:justify-end md:mb-2">
      {socialLinks.map((link, idx) => {
        if (link.id) {
          return (
            <Link
              className="bg-zinc-800 duration-300 ease-in-out p-1.5 rounded transition-colors hover:bg-zinc-700"
              data-testid={link.name}
              key={idx}
              href={link.href}
              target="_blank"
            >
              <link.icon className="h-5 w-5" />
            </Link>
          );
        }
      })}
      {homepage && (
        <Link
          className="bg-zinc-800 duration-300 ease-in-out p-1.5 rounded transition-colors hover:bg-zinc-700"
          data-testid="homepage"
          href={homepage}
          target="_blank"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
