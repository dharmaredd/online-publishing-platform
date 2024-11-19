export interface ArticleModel {
  id: number;
  title: string;
  description: string;
  author: string;
  views: number;
  commentDetails: commentDetails[];
  isBookmark: boolean;
  article: string;
  image: string;
}

export interface commentDetails {
  comment: string;
}
