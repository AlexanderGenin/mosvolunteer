import React from "react";
import type { FC } from "react";
import {
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group,
  Input,
  IconButton,
  LocaleProviderContext,
  CalendarRange,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";
import { Icon16Clear } from "@vkontakte/icons";
import type { DateRange, TagOption } from "../types/types";
import { formatDate } from "../utils/utils";

type Props = {
  datesFilter: DateRange;
  onDatesFilterChange: (dates: DateRange) => void;
  defaultTags: TagOption[];
  selectedTags: TagOption[];
  onTagsFilterChange: (tags: TagOption[]) => void;
  eventsCount: number;
  onClearFilters: () => void;
  onSubmitFilters: () => void;
};

const Filters: FC<Props> = ({
  datesFilter,
  onDatesFilterChange,
  defaultTags,
  selectedTags,
  onTagsFilterChange,
  eventsCount,
  onClearFilters,
  onSubmitFilters,
}) => {
  const selectedTagsProps = {
    value: selectedTags,
    onChange: onTagsFilterChange,
    options: defaultTags,
    placeholder: "Не выбраны",
    creatable: true,
    creatableText: "",
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onTagsFilterChange([]);
  };

  return (
    <Group>
      <FormLayout>
        <FormLayoutGroup mode="vertical">
          <FormItem top="Метки">
            <ChipsSelect
              {...selectedTagsProps}
              after={
                <IconButton hoverMode="opacity" onClick={onClick}>
                  <Icon16Clear />
                </IconButton>
              }
            />
          </FormItem>
        </FormLayoutGroup>
        <FormLayoutGroup mode="horizontal">
          <FormItem top="Дата начала">
            <Input readOnly value={formatDate(datesFilter[0])} />
          </FormItem>
          <FormItem top="Дата окончания">
            <Input readOnly value={formatDate(datesFilter[1])} />
          </FormItem>
        </FormLayoutGroup>
        <FormLayoutGroup mode="horizontal">
          <FormItem>
            <LocaleProviderContext.Provider value="ru">
              <CalendarRange
                className="calendar-range"
                value={datesFilter}
                onChange={onDatesFilterChange}
                disablePast={true}
                disablePickers={false}
              />
            </LocaleProviderContext.Provider>
          </FormItem>
        </FormLayoutGroup>
        <ButtonGroup mode="horizontal" stretched>
          <Button
            size="l"
            appearance="neutral"
            stretched
            onClick={onClearFilters}
          >
            Очистить
          </Button>
          <Button
            size="l"
            appearance="accent"
            stretched
            onClick={onSubmitFilters}
          >
            Найдено: {eventsCount}
          </Button>
        </ButtonGroup>
      </FormLayout>
    </Group>
  );
};

export default Filters;
