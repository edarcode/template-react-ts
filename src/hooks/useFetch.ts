import { useEffect, useState } from "react";
import { EdarErr } from "../errors/EdarErr";

export const useFetch = <Data, Payload>(fetch: Fetch<Data, Payload>) => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<EdarErr>();

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch({ signal: controller.signal })
      .then((data) => setData(data))
      .catch((err: EdarErr) => setErr(err))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [fetch]);

  return { data, loading, err };
};

export type Fetch<Data, Payload> = (
  params: FetchParams<Payload>
) => Promise<Data>;

type FetchParams<Payload> = {
  signal: AbortSignal;
  payload?: Payload;
};
