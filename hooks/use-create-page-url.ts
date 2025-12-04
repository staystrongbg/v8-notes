"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const useCreatePageUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (
    queryKey: string,
    queryValue: string | number
  ): string => {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, queryValue.toString());
    return `${pathname}?${params.toString()}`;
  };

  return createPageUrl;
};
