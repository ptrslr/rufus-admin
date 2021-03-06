// @flow

import status from '../constants/status';

export type Posts = { [string]: Post };
export type Post = {
  title: string,
  subtitle: ?string,
  content: Object,
  featured: boolean,
  status: $Values<typeof status>,
  category: ?string,
  author: string,
  publishTime?: ?number,
};

export type PostUpdates = {
  title?: string,
  subtitle?: ?string,
  content?: Object,
  status?: $Values<typeof status>,
  category?: ?string,
  author?: string,
  publishTime?: ?number,
};

export type PollOption = {
  id: string,
  value: string,
  voteCount: number,
};

export type Poll = {
  question: ?string,
  options: ?Array<PollOption>,
};

export type Category = string;

export type Categories = { [string]: Category };

export type Pages = { [string]: Page };
export type Page = {
  title: string,
  subtitle: ?string,
  content: Object,
};
