import { Button, ButtonGroup, Div } from "@vkontakte/vkui";
import React from "react";
import type { FC } from "react";

type Props = {
  onLogin: () => void;
};

const Welcome: FC<Props> = ({ onLogin }) => {
  return (
    <Div className="welcome">
      <ButtonGroup mode="vertical">
        <Button
          size="l"
          mode="primary"
          className="welcome_button"
          onClick={onLogin}
        >
          Войти через ВКонтакте
        </Button>
        <Button
          size="l"
          mode="secondary"
          className="welcome_button"
          href="https://mosvolonter.ru/"
          target="_blank"
          onClick={onLogin}
        >
          Войти через Мосволонтер
        </Button>
        <Button size="l" mode="secondary" className="welcome_button">
          Я организатор
        </Button>
      </ButtonGroup>
    </Div>
  );
};

export default Welcome;
