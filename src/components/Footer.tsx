import tmdbLogo from "@/images/tmdb-logo.svg";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10">
      <Container>
        <p className="text-zinc-500 mb-4" data-testid="copyright">
          <small>
            Copyright &copy; {new Date().getFullYear()} Film Snail. All Rights
            Reserved.
          </small>
        </p>
        <div className="flex gap-2 items-center">
          <Image
            src={tmdbLogo}
            width="64"
            height="46"
            alt="The Movie Database"
          />
          <p className="text-zinc-500" data-testid="tmdb-attribution">
            <small>
              This website uses TMDB and the TMDB APIs but is not endorsed,
              certified, or otherwise approved by TMDB.
            </small>
          </p>
        </div>
      </Container>
    </footer>
  );
}
