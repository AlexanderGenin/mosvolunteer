import { useSelector } from "react-redux";
import { EventsFilters } from "../../types/types";
import { fetchEvents, selectAllEvents } from "../features/events/eventsSlice";
import { useAppDispatch } from "../store/store";

const useEvents = () => {
  const events = useSelector(selectAllEvents);
  const dispatch = useAppDispatch();

  return {
    events,
    loadEvents: (filters: EventsFilters) => dispatch(fetchEvents(filters)),
  };
};
export default useEvents;
