export type Tab = "feed" | "events" | "profile" | "filters";

export type Volunteer = {
  workedHours: number;
  events: number;
  rating: number;
  title: string;
  status: string;
};

export type UserCustomData = {
  phone: string;
  email: string;
  school: string;
};

export type TEvent = {
  id: number;
  dateStart: string;
  dateEnd: string;
  address: string;
  imgs: string[];
  title: string;
  description: string;
  requirements: string[];
  important?: string;
  organization: string;
  email: string;
  phone: string;
  orgName?: string;
  services?: string[];
  tags: string[];
};

export type TPost = {
  id: number;
  date: string;
  title: string;
  description: string;
  img: string;
};

export type DateRange = Array<Date>;

export type TagOption = {
  label?: string;
  value?: any;
};

export type TStory = {
  id: number;
  imgs: string[];
  cover: string;
  watched: boolean;
};

export type EventsFilters = {
  query: string;
  dateStart: string;
  dateEnd: string;
  tags: string;
};
