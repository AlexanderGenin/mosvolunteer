import { useState } from "react";
import { DateRange, TagOption } from "../types/types";
import { getOneYearDateRange } from "../utils/utils";
import useTags from "./useTags";

export const useFilters = () => {
  const tags = useTags();
  const defaultTags = tags.map((tag) => ({ label: tag, value: tag }));

  const [datesFilter, setDatesFilter] = useState<DateRange>(
    getOneYearDateRange()
  );
  const [tagsFilter, setTagsFilter] = useState<TagOption[]>(defaultTags);

  const handleDatesFilterChange = (dates: DateRange) => {
    setDatesFilter(dates);
  };

  const handleTagsFilterChange = (tags: TagOption[]) => {
    setTagsFilter(tags);
  };

  const handleClearFilters = () => {
    setDatesFilter(getOneYearDateRange());
    setTagsFilter(defaultTags);
  };

  return {
    defaultTags,
    datesFilter,
    tagsFilter,
    onDatesFilterChange: handleDatesFilterChange,
    onTagsFilterChange: handleTagsFilterChange,
    onClearFilters: handleClearFilters,
  };
};
