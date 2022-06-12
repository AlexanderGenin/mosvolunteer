import React, { useEffect, useState } from "react";
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
import type { TEvent } from "../types/types";
import Filters from "./Filters";
import { formatDate } from "../utils/utils";
import Event from "./Event";
import useEvents from "../redux/hooks/useEvents";
import { useFilters } from "../hooks/useFilters";

type Props = {
  id: string;
};

type Panels = "filters" | "events" | "event";

const Events: FC<Props> = ({ id }) => {
  const isDesktop = useAdaptivityIsDesktop();
  const [panel, setPanel] = useState<Panels>("events");

  const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null);

  const handleCardClick = (event: TEvent) => {
    setCurrentEvent(event);
    setPanel("event");
  };

  const handleReturn = () => setPanel("events");

  const handleSubmitFilters = () => {
    setPanel("events");
  };

  const {
    defaultTags,
    datesFilter,
    tagsFilter,
    onDatesFilterChange,
    onTagsFilterChange,
    onClearFilters,
  } = useFilters();

  const { events, loadEvents } = useEvents();

  useEffect(() => {
    loadEvents({
      dateStart: formatDate(datesFilter[0]) || "",
      dateEnd: formatDate(datesFilter[1]) || "",
      tags: tagsFilter.map((tag) => tag.value).join(",") || "",
      query: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datesFilter[0], datesFilter[1], tagsFilter.length]);

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
            {events.map((event) => (
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
                      className="event_info"
                      before={<Icon20CalendarCircleFillRed />}
                    >
                      {event.dateStart} - {event.dateEnd}
                    </MiniInfoCell>
                    <MiniInfoCell
                      className="event_info"
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
          onDatesFilterChange={onDatesFilterChange}
          eventsCount={events.length}
          defaultTags={defaultTags}
          selectedTags={tagsFilter}
          onTagsFilterChange={onTagsFilterChange}
          onClearFilters={onClearFilters}
          onSubmitFilters={handleSubmitFilters}
        />
      </Panel>
      <Event id="event" onReturn={handleReturn} event={currentEvent} />
    </View>
  );
};

export default Events;
