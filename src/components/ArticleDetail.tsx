import React from "react";
import { Article } from "~/types";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div className="bg-white text-gray-700 shadow-md rounded-md overflow-hidden mt-2">
      <ul className="space-y-2 p-4">
        <li className="flex space-x-2">
          <strong className="font-medium">Claim:</strong>
          <span>{article.claim}</span>
        </li>
        <li className="flex space-x-2">
          <strong className="font-medium">Approved:</strong>
          <span>{article.approved ? "Yes" : "No"}</span>
        </li>
        <li className="flex space-x-2">
          <strong className="font-medium">Checked:</strong>
          <span>{article.checked ? "Yes" : "No"}</span>
        </li>
        <li className="space-x-2">
          <strong className="font-medium">Result of Evidence:</strong>
          <p>{article.result_of_evidence}</p>
        </li>
        <li className="space-x-2">
          <strong className="font-medium">Type of Research:</strong>
          <p>{article.type_of_research}</p>
        </li>
        <li className="space-x-2">
          <strong className="font-medium">Type of Participant:</strong>
          <p>{article.type_of_participant}</p>
        </li>
      </ul>
    </div>
  );
};

export default ArticleDetail;
