import { mockEvents } from "../data/data";

const useTags = () => {
  return Array.from(
    mockEvents.reduce((acc, event) => {
      event.tags.forEach((tag) => {
        acc.add(tag);
      });
      return acc;
    }, new Set<string>())
  );
};

export default useTags;
