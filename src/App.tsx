import React, { useState, useEffect } from "react";
import type { FC, ReactElement } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  Epic,
} from "@vkontakte/vkui";
import type { UserInfo } from "@vkontakte/vk-bridge";
import { Provider } from "react-redux";
import { Tab, UserCustomData } from "./types/types";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";
import Posts from "./components/Posts";
import Events from "./components/Events";
import { defaultUserCustomData, defaultVolunteerData } from "./data/defaults";
import Stories from "./components/Stories";
import useStories from "./hooks/useStories";
import UserProvider from "./components/UserProvider";
import store from "./redux/store/store";

import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/components.css";
import "./styles/customStyle.css";
import { fetchEvents } from "./redux/features/events/eventsSlice";

const App: FC = () => {
  const [popout, setPopout] = useState<ReactElement | null>(
    <ScreenSpinner size="large" />
  );

  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const stories = useStories();
  const storiesLength = stories.length;
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const volunteer = defaultVolunteerData;
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userCustomData, setUserCustomData] = useState<UserCustomData>(
    defaultUserCustomData
  );

  const handleFormSave = (formData: UserCustomData) => {
    setUserCustomData(formData);
  };

  const onTabChange = (e: React.MouseEvent<HTMLElement>) => {
    setActiveTab(e.currentTarget.dataset.tab as Tab);
  };

  const handleStoryClick = (id: number) => {
    setActiveStoryIndex(stories.findIndex((story) => story.id === id));
  };

  const handleNextStory = () =>
    setActiveStoryIndex((activeStoryIndex) => {
      return activeStoryIndex !== null
        ? activeStoryIndex + 1 === storiesLength
          ? null
          : activeStoryIndex + 1
        : null;
    });

  const handlePreviousStory = () =>
    setActiveStoryIndex((activeStoryIndex) => {
      return activeStoryIndex !== null ? activeStoryIndex - 1 : null;
    });

  const handleStoriesClose = () => setActiveStoryIndex(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    store.dispatch(fetchEvents());
  }, []);

  return (
    <Provider store={store}>
      <UserProvider user={user}>
        <ConfigProvider>
          <AdaptivityProvider>
            <AppRoot>
              <SplitLayout
                popout={popout}
                modal={
                  <Stories
                    stories={stories}
                    activeStoryIndex={activeStoryIndex}
                    onNextStory={handleNextStory}
                    onPreviousStory={handlePreviousStory}
                    onStoriesClose={handleStoriesClose}
                  />
                }
              >
                <SplitCol>
                  <Epic
                    activeStory={activeTab}
                    tabbar={
                      <Navigation
                        onTabChange={onTabChange}
                        activeTab={activeTab}
                      />
                    }
                  >
                    <Posts id="feed" onStoryClick={handleStoryClick} />
                    <Events id="events" />
                    <Profile
                      id="profile"
                      userCustomData={userCustomData}
                      volunteer={volunteer}
                      onFormSave={handleFormSave}
                    />
                  </Epic>
                </SplitCol>
              </SplitLayout>
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;
