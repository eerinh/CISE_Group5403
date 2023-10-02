// components/ArticleList.tsx
import React from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

interface ArticleListProps {
  articles: Article[];
  newArticleIds: number[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, newArticleIds }) => {
  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title}
            {newArticleIds.includes(article.id) && <span style={{ color: 'red' }}> New</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
