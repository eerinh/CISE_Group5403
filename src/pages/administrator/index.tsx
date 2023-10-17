import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import type { Article } from "~/types";
import { api } from "~/utils/api";

interface ArticleListProps {
    article: Article;
}

const AdminArticleView: React.FC<ArticleListProps> = ({ article }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between w-full">
                        {article.title}
                        <Link href={`administrator/edit/${article.id}`}><Button>Edit</Button></Link>
                    </div>
                </CardTitle>
                <CardDescription>{article.author} • {article.date.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Journal Name: {article.journal_name}</p>
                <p>SE Practice: {article.se_practice}</p>
                <p>Claim: {article.claim}</p>
                <p>Result of Evidence: {article.result_of_evidence}</p>
                <p>Type of Research: {article.type_of_research}</p>
                <p>Type of Participant: {article.type_of_participant}</p>
                <p>Approved: {article.approved ? "Approved" : "Unapproved"}</p>
            </CardContent>
            <CardFooter>
                <p>Created: {article.createdAt?.toDateString()} Last Updated: {article.updatedAt?.toDateString()}</p>
            </CardFooter>
        </Card>
    );
}

const AdminArticleList = () => {
    const articlesQuery = api.articles.getAll.useQuery({ userId: undefined });

    return (
        <div className="space-y-2">
            {articlesQuery?.data?.map((article) => (
                <AdminArticleView key={article.id} article={article} />
            ))}
        </div>
    )
};

export default AdminArticleList;