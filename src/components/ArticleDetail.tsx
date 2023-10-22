import React from "react";
import { Article } from "~/types";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <ul className="">
        <li className="border-b px-4 py-2">
          <strong className="text-gray-600">Claim:</strong> {article.claim}
        </li>
        <li className="border-b px-4 py-2">
          <strong className="text-gray-600">Result of Evidence:</strong> {article.result_of_evidence}
        </li>
        <li className="border-b px-4 py-2">
          <strong className="text-gray-600">Type of Research:</strong> {article.type_of_research}
        </li>
        <li className="border-b px-4 py-2">
          <strong className="text-gray-600">Type of Participant:</strong> {article.type_of_participant}
        </li>
        <li className="border-b px-4 py-2">
          <strong className="text-gray-600">Approved:</strong> {article.approved ? "Yes" : "No"}
        </li>
        <li className="px-4 py-2">
          <strong className="text-gray-600">Checked:</strong> {article.checked ? "Yes" : "No"}
        </li>
      </ul>
    </div>

  );
};

export default ArticleDetail;
