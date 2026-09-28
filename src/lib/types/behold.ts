export interface BeholdMediaSize {
  width: number;
  height: number;
  mediaUrl: string;
}

export interface BeholdSizes {
  small: BeholdMediaSize;
  medium: BeholdMediaSize;
  large: BeholdMediaSize;
  full: BeholdMediaSize;
}

export interface BeholdChildMedia {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  thumbnailUrl?: string;
  sizes?: BeholdSizes;
}

export interface BeholdPost extends BeholdChildMedia {
  caption?: string;
  prunedCaption?: string;
  permalink: string;
  timestamp: string;
  likeCount?: number;
  commentsCount?: number;
  children?: BeholdChildMedia[];
}

export interface BeholdFeedResponse {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: BeholdPost[];
}