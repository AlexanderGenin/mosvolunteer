import React from "react";
import type { FC } from "react";
import type { TEvent } from "../types/types";
import {
  Button,
  Card,
  Div,
  FormItem,
  Gallery,
  Group,
  Header,
  MiniInfoCell,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Progress,
  SimpleCell,
  Text,
  Title,
} from "@vkontakte/vkui";
import {
  Icon20CalendarOutline,
  Icon20Check,
  Icon28MailOutline,
  Icon28PhoneOutline,
  Icon56UserCircleOutline,
} from "@vkontakte/icons";

type Props = {
  id: string;
  event: TEvent | null;
  onReturn: () => void;
};

const Event: FC<Props> = ({ id, event, onReturn }) => {
  if (!event)
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={onReturn} />}>
          Событие
        </PanelHeader>
        <Group className="placeholder">
          <Placeholder
            icon={<Icon56UserCircleOutline />}
            action={
              <Button size="m" mode="tertiary" onClick={onReturn}>
                Назад
              </Button>
            }
            stretched
          >
            Событие
            <br />
            не найдено
          </Placeholder>
        </Group>
      </Panel>
    );

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onReturn} />}>
        Событие
      </PanelHeader>
      <Card>
        <Group>
          <Gallery bullets="dark" showArrows>
            {event.imgs.map((img, index) => (
              <img src={img} alt="" key={index} />
            ))}
          </Gallery>
          <Div>
            <MiniInfoCell
              className="event_dates"
              before={<Icon20CalendarOutline />}
            >
              {event.dateStart} - {event.dateEnd}
            </MiniInfoCell>
            <Title className="event_title" level="1">
              {event.title}
            </Title>
            <Text className="event_text">{event.description}</Text>
          </Div>
        </Group>
        <Group header={<Header mode="primary">Требования</Header>}>
          {event.requirements.map((req) => (
            <MiniInfoCell before={<Icon20Check />}>{req}</MiniInfoCell>
          ))}
        </Group>
        <Group header={<Header mode="primary">Контакты</Header>}>
          <SimpleCell before={<Icon28MailOutline />}>{event.email}</SimpleCell>
          <SimpleCell before={<Icon28PhoneOutline />}>{event.phone}</SimpleCell>
        </Group>
        <Group header={<Header mode="primary">Вакансии</Header>}>
          <Group header={<Header mode="primary">Волонтер пресс службы</Header>}>
            <FormItem id="progresslabel" top="5/15">
              <Progress aria-labelledby="progresslabel" value={33.3} />
            </FormItem>
            <FormItem style={{ display: "flex", justifyContent: "center" }}>
              <Button size="l" appearance="accent">
                Записаться
              </Button>
            </FormItem>
          </Group>
          <Group header={<Header mode="primary">Волонтер проводник</Header>}>
            <FormItem id="progresslabel" top="20/40">
              <Progress aria-labelledby="progresslabel" value={50} />
            </FormItem>
            <FormItem style={{ display: "flex", justifyContent: "center" }}>
              <Button size="l" appearance="accent">
                Записаться
              </Button>
            </FormItem>
          </Group>
          <Group header={<Header mode="primary">Менеджер команд</Header>}>
            <FormItem id="progresslabel" top="4/4">
              <Progress aria-labelledby="progresslabel" value={100} />
            </FormItem>
            <FormItem style={{ display: "flex", justifyContent: "center" }}>
              <Button size="l" appearance="accent" disabled>
                Запись завершена
              </Button>
            </FormItem>
          </Group>
        </Group>
      </Card>
    </Panel>
  );
};

export default Event;
