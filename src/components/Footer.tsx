import tmdbLogo from "@/images/tmdb-logo.svg";
import Image from "next/image";
import Container from "../../components/container";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10 py-6">
      <Container className="lg:grid lg:grid-cols-12 lg:items-center">
        <p
          className="col-span-4 mb-4 text-zinc-500 lg:mb-0"
          data-testid="copyright"
        >
          <small>
            Copyright &copy; {new Date().getFullYear()} Film Snail. All Rights
            Reserved.
          </small>
        </p>
        <div className="flex items-center gap-2 lg:col-start-8 lg:col-end-13">
          <Image
            src={tmdbLogo}
            width="64"
            height="46"
            alt="The Movie Database"
          />
          <p
            className="leading-tight text-zinc-500"
            data-testid="tmdb-attribution"
          >
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
