import { useMemo } from "react";
import { FULL_REGIONS } from "../constants/regions";

export const useRegions = (searchQuery) => {
  const filteredRegions = useMemo(() => {
    if (!searchQuery) return FULL_REGIONS;

    return FULL_REGIONS.filter((region) =>
      region.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return { filteredRegions };
};
