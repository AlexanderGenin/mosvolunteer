import React, { useEffect, useState } from "react";
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
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Progress,
  SimpleCell,
  Text,
  Title,
  UsersStack,
} from "@vkontakte/vkui";
import {
  Icon28MailOutline,
  Icon28PhoneOutline,
  Icon56UserCircleOutline,
} from "@vkontakte/icons";
import useUser from "./useUser";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";

type Props = {
  id: string;
  event: TEvent | null;
  onReturn: () => void;
};

const Event: FC<Props> = ({ id, event, onReturn }) => {
  const [friends, setFriends] = useState<UserInfo[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchFriends() {
      if (!user) return;

      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
        app_id: 8180488,
        scope: "friends",
      });

      const { response } = await bridge.send("VKWebAppCallAPIMethod", {
        method: "friends.getLists",
        params: {
          user_id: user.id,
          fields: "photo_100",
          v: "5.131",
          access_token,
        },
      });

      setFriends(response.items);
    }

    fetchFriends();
  }, []);

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
            {event.imgs.map((img) => (
              <img src={img} alt="" />
            ))}
          </Gallery>
          <Div>
            <Title className="event_title" level="1">
              {event.title}
            </Title>
            <Text className="event_text">{event.description}</Text>
          </Div>
        </Group>
        <Group header={<Header mode="primary">Контакты</Header>}>
          <SimpleCell before={<Icon28MailOutline />}>{event.email}</SimpleCell>
          <SimpleCell before={<Icon28PhoneOutline />}>{event.phone}</SimpleCell>
        </Group>
        <Group header={<Header mode="primary">Вакансии</Header>}>
          <Group header={<Header mode="primary">Набор</Header>}>
            <FormItem id="progresslabel" top="200/500">
              <UsersStack
                photos={friends.map((friend) => friend.photo_100)}
                size="m"
                visibleCount={3}
                layout="vertical"
              >
                Алексей, Илья, Михаил
                <br />и ещё 3 человека
              </UsersStack>
              <Progress aria-labelledby="progresslabel" value={40} />
            </FormItem>
          </Group>
        </Group>
      </Card>
    </Panel>
  );
};

export default Event;
