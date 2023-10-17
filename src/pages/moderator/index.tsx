import React, { useState, useEffect } from "react";
import ArticleList, { Article } from "./ArticleList";
import { api } from "~/utils/api";

const ModeratorPage: React.FC = () => {
  const articlesQuery = api.articles.getAll.useQuery({ userId: undefined });
  const articleMutation = api.articles.update.useMutation({ onSuccess: () => articlesQuery.refetch() });
  const createArticleMutation = api.articles.create.useMutation({ onSuccess: () => articlesQuery.refetch() });
  
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (articlesQuery.data) {
      setArticles(articlesQuery.data);
    }
  }, [articlesQuery.data])

  const handleApprove = (articleId: string) => {
    articleMutation.mutate({ id: articleId, approved: true, checked: true });
  };

  const handleDeny = (articleId: string) => {
    articleMutation.mutate({ id: articleId, approved: false, checked: true });
  };

  const addNewArticle = () => {
    const newArticle = {
      title: "Sample Article Title",
      author: "John Doe",
      date: new Date(),
      journal_name: "Journal of Sample Articles",
      se_practice: "TDD",
      claim: "Sample Claim",
      result_of_evidence: "Sample Result of Evidence",
      type_of_research: "Sample Type of Research",
      type_of_participant: "Sample Type of Participant",
      approved: false,
      checked: false
    };

    createArticleMutation.mutate(newArticle);
  };

  const addButtonStyle = {
    backgroundColor: '#008CBA',
    color: 'white',
    padding: '10px 20px',
    margin: '10px 0',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
  };

  return (
    <div>
      <h1>Modertor Dashboard</h1>
      <ArticleList
        articles={articles}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
      <button onClick={addNewArticle} style={addButtonStyle}>Add New Article</button>
    </div>
  );
};

export default ModeratorPage;