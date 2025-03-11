import { Movie } from "../../types/movie";
import { TVShow } from "../../types/tv";
import Credit from "../../components/credit";

export default function Credits({ credits }: { credits: (Movie | TVShow)[] }) {
  return credits.map((credit) => <Credit key={credit.id} credit={credit} />);
}
