import React from 'react';

export interface Article {
  id?: string | undefined;
  title: string;
  author: string;
  date: Date;
  journal_name: string;
  se_practice: string;
  claim: string;
  result_of_evidence: string;
  type_of_research: string;
  type_of_participant: string;
  approved: boolean;
  checked?: boolean;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

interface ArticleListProps {
  articles: Article[];
  onApprove: (articleId: string) => void;
  onDeny: (articleId: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onApprove, onDeny }) => {
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
        {articles?.map((article) => (
          <li key={article.id} style={listItemStyle}>
            {article.checked == false && <p style={{ color: 'red' }}>New</p>}
            <h3>{article.title}</h3>
            <p>Status: {article.approved ? 'Approved' : 'Unapproved'}</p>
            <p>Author: {article.author}</p>
            <p>Year of Publication: {article.date.toDateString()}</p>
            <p>Journal Name: {article.journal_name}</p>
            <p>SE Practice: {article.se_practice}</p>
            <p>Claim: {article.claim}</p>
            <p>Result of Evidence: {article.result_of_evidence}</p>
            <p>Type of Research: {article.type_of_research}</p>
            <p>Type of Participant: {article.type_of_participant}</p>
            <button
              onClick={() => onApprove(article.id!)}
              style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
            >
              Approve
            </button>
            <button
              onClick={() => onDeny(article.id!)}
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
