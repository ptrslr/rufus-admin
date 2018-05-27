import statusEnum from '../constants/status';

export const isScheduled = (status, publishTime, time = Date.now()) =>
  status === statusEnum.PUBLISHED && publishTime > time;

export const isPublished = (status, publishTime, time = Date.now()) =>
  status === statusEnum.PUBLISHED && publishTime <= time;

export const isHidden = status => status === statusEnum.HIDDEN;

export const isDraft = status => status === statusEnum.DRAFT;
