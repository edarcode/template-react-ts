import { EdarErr } from "../errors/EdarErr";
import { Fetch, useFetch } from "../hooks/useFetch";

export default function App() {
  const { data, loading, err } = useFetch<object, null>(service);
  console.log(data);
  if (loading) return <>Cargando...</>;
  if (err) return <>{err.msg}</>;
  return <>App</>;
}

const service: Fetch<object, null> = async ({ signal }) => {
  const res = await fetch("https://kitsu.io/api/edge/anime", { signal });

  if (!res.ok) throw new EdarErr({ status: 400, msg: "Algo salió mal" });
  return await res.json();
};
