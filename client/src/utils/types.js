// @flow

import status from '../constants/status';

export type Post = {
  title: string,
  subtitle: ?string,
  content: Object,
  status: $Keys<typeof status>,
  category: ?string,
  author: string,
  publishTime?: ?number,
};

export type PostUpdates = {
  title?: string,
  subtitle?: ?string,
  content?: Object,
  status?: $Keys<typeof status>,
  category?: ?string,
  author?: string,
  publishTime?: ?number,
};