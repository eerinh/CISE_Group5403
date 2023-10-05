import { GetServerSidePropsContext } from "next";
import ArticleForm from "../edit";
import React from "react";
import { api } from "~/utils/api";

interface AdminArticleEditProps {
    id: string | undefined;
}

const AdminArticleEdit: React.FC<AdminArticleEditProps> = ({ id }) => {
    const article = id ? api.articles.get.useQuery({ id }) : undefined;

    return (
        <>
            {article?.data && (
                <ArticleForm article={article.data} />
            )}
        </>
    )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const { id } = context.query; 

    return {
        props: {
            id,
        },
    };
}

export default AdminArticleEdit;