import React from "react";
import type { FC } from "react";
import {
  PanelHeader,
  Group,
  ContentCard,
  CardGrid,
  CardScroll,
  Spacing,
  Card,
  MiniInfoCell,
  Text,
  Link,
  Div,
  View,
  Panel,
} from "@vkontakte/vkui";
import useNews from "../hooks/useNews";
import { Icon20CalendarOutline } from "@vkontakte/icons";
import { mockStories } from "../data/data";
import { useAdaptivityIsDesktop } from "@vkontakte/vkui/dist/hooks/useAdaptivity";

type Props = {
  id: string;
  onStoryClick: (id: number) => void;
};

const Posts: FC<Props> = ({ id, onStoryClick }) => {
  const isDesktop = useAdaptivityIsDesktop();

  const news = useNews();

  return (
    <View id={id} activePanel="feed">
      <Panel id="feed">
        <PanelHeader>Новости</PanelHeader>
        <Group>
          <CardScroll>
            {mockStories.map((story) => (
              <Card
                key={story.id}
                mode="outline"
                className="story_card"
                onClick={() => onStoryClick(story.id)}
              >
                <div className="story_cont">
                  <img
                    className="story_img"
                    src={story.cover}
                    alt=""
                    height={120}
                  />
                </div>
              </Card>
            ))}
          </CardScroll>
          <Spacing size={24} />
          <CardGrid size="l">
            {news.map((news) => (
              <ContentCard
                key={news.id}
                subtitle={
                  <MiniInfoCell
                    className="news-date"
                    before={<Icon20CalendarOutline />}
                  >
                    {news.date}
                  </MiniInfoCell>
                }
                className={isDesktop ? "feed-element" : ""}
                onClick={() => {}}
                src={news.img}
                maxHeight={240}
                header={
                  news.title.length > 50
                    ? news.title.slice(0, 48) + "..."
                    : news.title
                }
                text={
                  <>
                    <Text>
                      {news.description.length > 150
                        ? news.description.slice(0, 148) + "..."
                        : news.description}
                    </Text>
                    <Div className="news-link">
                      <Link href="/profile">Подробнее</Link>
                    </Div>
                  </>
                }
              />
            ))}
          </CardGrid>
        </Group>
      </Panel>
    </View>
  );
};

export default Posts;
