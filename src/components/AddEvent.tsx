import React, { useState } from "react";
import {
  Group,
  FormLayout,
  FormItem,
  Input,
  Button,
  ButtonGroup,
  Textarea,
  DatePicker,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import type { FC } from "react";
import { EventData, Vacancy } from "../types/types";
import { defaultEventData } from "../data/defaults";
import { Icon28AddOutline } from "@vkontakte/icons";

type Props = {
  id: string;
  onReturn: () => void;
  onEventFormSave: (data: EventData) => void;
  onEventFormCancel: () => void;
};

const AddEvent: FC<Props> = ({
  id,
  onReturn,
  onEventFormSave,
  onEventFormCancel,
}) => {
  const [formData, setFormData] = useState<EventData>(defaultEventData);
  const { email, phone, title, description, vacancies } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleAddVacancy = () => {
    const lastIndex = vacancies[vacancies.length - 1]?.id ?? -1;
    const newIndex = lastIndex + 1;

    const newVacancy = {
      id: newIndex,
      name: "",
      capacity: 0,
    };

    setFormData((formData) => ({
      ...formData,
      vacancies: [...vacancies, newVacancy],
    }));
  };

  const handleVacancyNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    editVacancy: Vacancy
  ) => {
    const vacancyIndex = vacancies.findIndex(
      (vacancy) => vacancy.id === editVacancy.id
    );
    editVacancy.name = e.currentTarget.value;
    setFormData((formData) => ({
      ...formData,
      vacancies: Object.assign([], vacancies, { [vacancyIndex]: editVacancy }),
    }));
  };

  const handleVacancyCapacityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    editVacancy: Vacancy
  ) => {
    const vacancyIndex = vacancies.findIndex(
      (vacancy) => vacancy.id === editVacancy.id
    );
    editVacancy.capacity = +e.currentTarget.value;
    setFormData((formData) => ({
      ...formData,
      vacancies: Object.assign([], vacancies, { [vacancyIndex]: editVacancy }),
    }));
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onReturn} />}>
        Создание события
      </PanelHeader>
      <Group>
        <FormLayout>
          <FormItem top="Название">
            <Input type="text" name="title" value={title} onChange={onChange} />
          </FormItem>
          <FormItem top="Описание">
            <Textarea
              name="description"
              value={description}
              onChange={onChange}
            />
          </FormItem>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Дата начала">
              <DatePicker
                min={{
                  day: new Date().getDate(),
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                }}
                max={{ day: 1, month: 1, year: 2050 }}
                onDateChange={(value) => {
                  console.log(value);
                }}
                dayPlaceholder="День"
                monthPlaceholder="Месяц"
                yearPlaceholder="Год"
                onChange={(e) => console.log(e)}
              />
            </FormItem>
            <FormItem top="Дата окончания">
              <DatePicker
                min={{
                  day: new Date().getDate(),
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                }}
                max={{ day: 1, month: 1, year: 2050 }}
                onDateChange={(value) => {
                  console.log(value);
                }}
                dayPlaceholder="День"
                monthPlaceholder="Месяц"
                yearPlaceholder="Год"
                onChange={(e) => console.log(e)}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="E-mail для контакта">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </FormItem>
            <FormItem top="Телефон для контакта">
              <Input
                type="tel"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </FormItem>
          </FormLayoutGroup>
          {vacancies.map((vacancy) => (
            <FormLayoutGroup mode="horizontal" key={vacancy.id}>
              <FormItem top="Название вакансии">
                <Input
                  type="text"
                  name={`name_${vacancy.id}`}
                  value={vacancy.name}
                  onChange={(e) => handleVacancyNameChange(e, vacancy)}
                />
              </FormItem>
              <FormItem top="Количество волонтеров">
                <Input
                  type="number"
                  name={`capacity_${vacancy.id}`}
                  value={vacancy.capacity}
                  onChange={(e) => handleVacancyCapacityChange(e, vacancy)}
                />
              </FormItem>
            </FormLayoutGroup>
          ))}
          <FormItem top="Вакансии">
            <Button
              size="l"
              appearance="accent"
              mode="tertiary"
              stretched
              before={<Icon28AddOutline />}
              onClick={handleAddVacancy}
            >
              Добавить вакансию
            </Button>
          </FormItem>
          <FormItem>
            <ButtonGroup mode="horizontal" stretched>
              <Button
                size="l"
                appearance="neutral"
                stretched
                onClick={onEventFormCancel}
              >
                Отмена
              </Button>
              <Button
                size="l"
                appearance="accent"
                stretched
                onClick={() => onEventFormSave({ ...formData })}
              >
                Сохранить
              </Button>
            </ButtonGroup>
          </FormItem>
        </FormLayout>
      </Group>
    </Panel>
  );
};

export default AddEvent;
