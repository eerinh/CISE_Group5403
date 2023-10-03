// components/ArticleList.tsx
import { on } from 'events';
import React, {useState} from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

interface ArticleListProps {
  articles: Article[];
  newArticleIds: number[];
  onApprove: (articleId: number) => void;
  onDeny: (articleId: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, newArticleIds, onApprove, onDeny }) => {

    const handleApprove = (articleId: number) =>{
        onApprove(articleId);
    }

    const handleDeny = (articleId: number) =>{
        onDeny(articleId);
    }


  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title}
            {newArticleIds.includes(article.id) && <span style={{ color: 'red' }}> New</span>}
            <button onClick={() => handleApprove(article.id)}>Approve</button>
            <button onClick={() => handleDeny(article.id)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
