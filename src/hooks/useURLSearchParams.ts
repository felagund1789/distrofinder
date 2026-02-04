import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useURLSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setParams = (
    newParams: URLSearchParams | Record<string, string>,
    options?: { replace?: boolean },
  ) => {
    const query = new URLSearchParams(newParams.toString());
    if (options?.replace) {
      router.replace(`${pathname}?${query.toString()}`);
      return;
    }
    router.push(`${pathname}?${query.toString()}`);
  };

  return [searchParams, setParams] as const;
}
