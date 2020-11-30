import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      // after log in go to path were you was before
      // redirect to log in
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);
};
