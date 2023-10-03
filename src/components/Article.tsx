// Article.tsx
import React from 'react';

type ArticleType = {
  id: string;
  title: string;
  author: string;
  journal_name: string;
  date: Date;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  article: ArticleType;
}

const Article: React.FC<Props> = ({ article }) => {
  return (
    <div>
      <h3>{article.title}</h3>
      <p>{article.author}</p>
      <p>{article.journal_name}</p>
      <p>{article.date.toLocaleDateString()}</p>
    </div>
  );
};

export default Article;
