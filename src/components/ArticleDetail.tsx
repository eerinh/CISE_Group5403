import React from "react";
import { Article } from "~/types";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div>
      <ul>
        <li>
          <strong>Claim:</strong> {article.claim}
        </li>
        <li>
          <strong>Result of Evidence:</strong> {article.result_of_evidence}
        </li>
        <li>
          <strong>Type of Research:</strong> {article.type_of_research}
        </li>
        <li>
          <strong>Type of Participant:</strong> {article.type_of_participant}
        </li>
        <li>
          <strong>Approved:</strong> {article.approved ? "Yes" : "No"}
        </li>
        <li>
          <strong>Checked:</strong> {article.checked ? "Yes" : "No"}
        </li>
      </ul>
    </div>
  );
};

export default ArticleDetail;
