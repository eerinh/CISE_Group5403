// components/ArticleList.tsx
import React from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  yearOfPublication: number;
  author: string;
  journalName: string;
  SEPractice: string;
  claim: string;
  resultOfEvidence: string;
  typeOfResearch: string;
  typeOfParticipant: string;
}

interface ArticleListProps {
  articles: Article[];
  newArticleIds: number[];
  onApprove: (articleId: number) => void;
  onDeny: (articleId: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, newArticleIds, onApprove, onDeny }) => {
  const listItemStyle = {
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    padding: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '5px 10px',
    margin: '5px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
  };

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id} style={listItemStyle}>
            {newArticleIds.includes(article.id) && <p style={{ color: 'red' }}>New</p>}
            <h3>{article.title}</h3>
            <p>Author: {article.author}</p>
            <p>Year of Publication: {article.yearOfPublication}</p>
            <p>Journal Name: {article.journalName}</p>
            <p>SE Practice: {article.SEPractice}</p>
            <p>Claim: {article.claim}</p>
            <p>Result of Evidence: {article.resultOfEvidence}</p>
            <p>Type of Research: {article.typeOfResearch}</p>
            <p>Type of Participant: {article.typeOfParticipant}</p>
            <button
              onClick={() => onApprove(article.id)}
              style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
            >
              Approve
            </button>
            <button
              onClick={() => onDeny(article.id)}
              style={{ ...buttonStyle, backgroundColor: '#FF5733' }}
            >
              Deny
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
