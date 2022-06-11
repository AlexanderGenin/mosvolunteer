import React, { useState } from "react";
import type { FC } from "react";
import {
  FormLayout,
  FormItem,
  Input,
  IconButton,
  Group,
  View,
  PanelHeader,
  PanelHeaderButton,
  Panel,
  PanelHeaderBack,
  CardGrid,
  Header,
  ContentCard,
  MiniInfoCell,
} from "@vkontakte/vkui";
import {
  Icon16Search,
  Icon20CalendarCircleFillRed,
  Icon20PlaceOutline,
  Icon28SlidersOutline,
} from "@vkontakte/icons";
import { useAdaptivityIsDesktop } from "@vkontakte/vkui/dist/hooks/useAdaptivity";
import type { TEvent, DateRange, TagOption } from "../types/types";
import Filters from "./Filters";
import useTags from "../hooks/useTags";
import { getOneYearDateRange } from "../utils/utils";
import Event from "./Event";
import { selectAllEvents } from "../redux/features/events/eventsSlice";
import { useSelector } from "react-redux";

type Props = {
  id: string;
};

type Panels = "filters" | "events" | "event";

const Events: FC<Props> = ({ id }) => {
  const [panel, setPanel] = useState<Panels>("events");

  const isDesktop = useAdaptivityIsDesktop();

  const [datesFilter, setDatesFilter] = useState<DateRange>(
    getOneYearDateRange()
  );

  const tags = useTags();
  const defaultTags = tags.map((tag) => ({ label: tag, value: tag }));

  const [selectedTags, setSelectedTags] = useState<TagOption[]>(defaultTags);

  const events = useSelector(selectAllEvents);

  const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null);

  const handleDatesFilterChange = (dates: DateRange) => {
    setDatesFilter(dates);
  };

  const handleTagsFilterChange = (tags: TagOption[]) => {
    setSelectedTags(tags);
  };

  const handleCardClick = (event: TEvent) => {
    setCurrentEvent(event);
    setPanel("event");
  };

  const handleClearFilters = () => {
    setDatesFilter(getOneYearDateRange());
    setSelectedTags(defaultTags);
  };

  const handleSubmitFilters = () => {
    setPanel("events");
  };

  const handleReturn = () => setPanel("events");

  const filteredEvents = events.filter((event) => {
    // Check dates intersection
    const includesDates =
      new Date(event.dateStart) <= datesFilter[1] &&
      new Date(event.dateEnd) >= datesFilter[0];

    const hasTags = event.tags.some((tag) =>
      selectedTags
        .reduce((acc, tag) => {
          acc.push(tag.value);
          return acc;
        }, [] as string[])
        .includes(tag)
    );

    return hasTags && includesDates;
  });

  return (
    <View id={id} activePanel={panel}>
      <Panel id="events">
        <PanelHeader
          before={
            <PanelHeaderButton
              aria-label="Filters"
              onClick={() => setPanel("filters")}
            >
              <Icon28SlidersOutline />
            </PanelHeaderButton>
          }
        >
          События
        </PanelHeader>
        <Group>
          <FormLayout>
            <FormItem>
              <Input
                type="text"
                placeholder="Поиск"
                after={
                  <IconButton hoverMode="opacity" aria-label="Очистить поле">
                    <Icon16Search />
                  </IconButton>
                }
              />
            </FormItem>
          </FormLayout>
        </Group>
        <Group>
          <Header>Варианты</Header>
          <CardGrid size={isDesktop ? "m" : "l"}>
            {filteredEvents.map((event) => (
              <ContentCard
                onClick={() => handleCardClick(event)}
                key={event.id}
                src={event.imgs[0]}
                header={
                  event.title.length > 50
                    ? event.title.slice(0, 48) + "..."
                    : event.title
                }
                text={
                  event.description.length > 100
                    ? event.description.slice(0, 98) + "..."
                    : event.description
                }
                maxHeight={300}
                caption={
                  <>
                    <MiniInfoCell
                      className="event-card_info"
                      before={<Icon20CalendarCircleFillRed />}
                    >
                      {event.dateStart} - {event.dateEnd}
                    </MiniInfoCell>
                    <MiniInfoCell
                      className="event-card_info"
                      before={<Icon20PlaceOutline />}
                    >
                      {event.address}
                    </MiniInfoCell>
                  </>
                }
              />
            ))}
          </CardGrid>
        </Group>
      </Panel>
      <Panel id="filters">
        <PanelHeader
          before={<PanelHeaderBack onClick={() => setPanel("events")} />}
        >
          Фильтры
        </PanelHeader>
        <Filters
          datesFilter={datesFilter}
          onDatesFilterChange={handleDatesFilterChange}
          eventsCount={filteredEvents.length}
          defaultTags={defaultTags}
          selectedTags={selectedTags}
          onTagsFilterChange={handleTagsFilterChange}
          onClearFilters={handleClearFilters}
          onSubmitFilters={handleSubmitFilters}
        />
      </Panel>
      <Event id="event" onReturn={handleReturn} event={currentEvent} />
    </View>
  );
};

export default Events;
