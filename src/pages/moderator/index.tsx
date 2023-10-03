import React, {useState, useEffect} from "react";
import ArticleList from "./ArticleList";

const ModeratorPage : React.FC = () => {
    const [articles, setArticles] = useState([
        {id: 1, title: 'Article 1', content: 'Content 1'},
        {id: 2, title: 'Article 2', content: 'Content 2'},
    ]);

    const [newArticleIds, setNewArticleIds] = useState<number[]>([]);
    const [nextArticleId, setNextArticleId] = useState(3);

    const handleApprove = (articleId: number) => {
        setNewArticleIds((prevIds) => prevIds.filter((id) => id !== articleId));
    };

    const handleDeny = (articleId: number) => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));


        setNewArticleIds((prevIds) => prevIds.filter((id) => id !== articleId));    
    };



    const addNewArticle =() =>{
        const newArticle = {
            id: nextArticleId,
            title: `New Article ${nextArticleId}`,
            content: `New Content ${nextArticleId}`,
        };


        setArticles((prevArticles) =>[...prevArticles, newArticle]);
        setNewArticleIds((prevIds) => [...prevIds, nextArticleId]);
        setNextArticleId((prevId) => prevId + 1);
    };

    return(
        <div>
            <h1>Modertor Dashboard</h1>
            <ArticleList 
            articles={articles} 
            newArticleIds={newArticleIds} 
            onApprove={handleApprove}
            onDeny={handleDeny}
            />
            <button onClick={addNewArticle}>Add New Article</button>
        </div>
    );
};

export default ModeratorPage;