import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
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
      icon: FaFacebookF,
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
    <div className="flex gap-2 text-white backdrop-blur rounded-s-sm">
      {homepage && (
        <Link
          className="duration-300 ease-in-out transition-colors hover:text-gray-400"
          data-testid="homepage"
          href={homepage}
          target="_blank"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      )}
      {socialLinks.map((link, idx) => {
        if (link.id) {
          return (
            <Link
              className="duration-300 ease-in-out transition-colors hover:text-gray-400"
              data-testid={link.name}
              key={idx}
              href={link.href}
              target="_blank"
            >
              <link.icon className="h-6 w-6" />
            </Link>
          );
        }
      })}
    </div>
  );
}
