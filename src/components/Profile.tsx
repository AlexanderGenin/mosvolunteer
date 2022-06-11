import { useState } from "react";
import type { FC } from "react";
import {
  CellButton,
  PanelHeader,
  Group,
  Header,
  Avatar,
  SimpleCell,
  Placeholder,
  Button,
  View,
  Panel,
} from "@vkontakte/vkui";
import type { UserCustomData, Volunteer } from "../types/types";
import {
  Icon28PhoneOutline,
  Icon28MailOutline,
  Icon28EducationOutline,
  Icon28CrownOutline,
  Icon28RecentOutline,
  Icon28HeartCircleOutline,
  Icon28LogoVkOutline,
  Icon28FavoriteOutline,
  Icon28ChainOutline,
  Icon56UserCircleOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import Form from "./Form";
import useUser from "./useUser";

type Props = {
  id: string;
  userCustomData: UserCustomData;
  onFormSave: (data: UserCustomData) => void;
  volunteer: Volunteer;
};

const Profile: FC<Props> = ({ onFormSave, userCustomData, volunteer, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleFormCancel = () => {
    setIsEditMode(false);
  };

  const { user } = useUser();

  if (!user)
    return (
      <View id={id} activePanel="profile">
        <Panel id="profile">
          <PanelHeader>Профиль</PanelHeader>
          <Group className="placeholder">
            <Placeholder
              icon={<Icon56UserCircleOutline />}
              action={
                <Button size="m" mode="tertiary">
                  Попробовать снова
                </Button>
              }
              stretched
            >
              Пользователь
              <br />
              не найден
            </Placeholder>
          </Group>
        </Panel>
      </View>
    );

  return (
    <View id={id} activePanel="profile">
      <Panel id="profile">
        <PanelHeader>Профиль</PanelHeader>
        <Group header={<Header mode="primary">Личные данные</Header>}>
          <SimpleCell
            before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
          >
            {`${user.first_name} ${user.last_name}`}
          </SimpleCell>
          {isEditMode ? (
            <Form
              onFormCancel={handleFormCancel}
              onFormSave={(data) => {
                onFormSave(data);
                setIsEditMode(false);
              }}
              userCustomData={userCustomData}
            />
          ) : (
            <>
              <SimpleCell
                indicator={userCustomData.phone}
                before={<Icon28PhoneOutline />}
              >
                Номер телефона
              </SimpleCell>
              <SimpleCell
                indicator={userCustomData.email}
                before={<Icon28MailOutline />}
              >
                Email
              </SimpleCell>
              <SimpleCell
                indicator={userCustomData.school}
                before={<Icon28EducationOutline />}
              >
                ВУЗ
              </SimpleCell>
              <CellButton onClick={() => setIsEditMode(!isEditMode)}>
                Редактировать
              </CellButton>
            </>
          )}
        </Group>
        <Group header={<Header mode="primary">Книжка волонтера</Header>}>
          <SimpleCell
            indicator={volunteer.title}
            before={<Icon28CrownOutline />}
          >
            Ранг
          </SimpleCell>
          <SimpleCell
            indicator={volunteer.workedHours}
            before={<Icon28RecentOutline />}
          >
            Часов помощи
          </SimpleCell>
          <SimpleCell
            indicator={volunteer.events}
            before={<Icon28HeartCircleOutline />}
          >
            Посещено мероприятий
          </SimpleCell>
        </Group>
        <Group header={<Header mode="primary">Действия</Header>}>
          <SimpleCell
            before={<Icon28LogoVkOutline />}
            href="https://vk.com/mosvolonter"
            target="_blank"
          >
            Сообщество ВКонтакте
          </SimpleCell>
          <SimpleCell
            before={<Icon28FavoriteOutline />}
            onClick={() => {
              bridge.send("VKWebAppAddToFavorites");
            }}
          >
            Добавить приложение в избранное
          </SimpleCell>
          <SimpleCell
            before={<Icon28ChainOutline />}
            href="https://mosvolonter.ru"
            target="_blank"
          >
            Перейти на сайт Мосволонтера
          </SimpleCell>
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
