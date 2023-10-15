import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { Article } from '../moderator/ArticleList';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Label } from '~/components/ui/label';

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  author: z.string().nonempty({ message: "Author is required" }),
  date: z.date(),
  journal_name: z.string().nonempty({ message: "Journal Name is required" }),
  se_practice: z.string().nonempty({ message: "SE Practice is required" }),
  claim: z.string().nonempty({ message: "Claim is required" }),
  result_of_evidence: z.string().nonempty({ message: "Result of Evidence is required" }),
  type_of_research: z.string().nonempty({ message: "Type of Research is required" }),
  type_of_participant: z.string().nonempty({ message: "Type of Participant is required" }),
})

interface ArticleFormProps {
  article: Article | undefined;
}

enum FormState {
  PASTE,
  UPLOAD,
  NONE
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article }) => {
  const [uploadType, setUploadType] = useState(FormState.NONE);
  const updateArticleMutation = api.articles.update.useMutation();
  const createArticleMutation = api.articles.create.useMutation();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>): void {
    if (article != undefined) {
      updateArticleMutation.mutate({ id: article.id, ...values });
    } else {
      createArticleMutation.mutate(values);
    }

    void router.push('/administrator');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...article
    },
  })

  return (
    <>
      <div className='m-16'>
        <Card className='pb-5'>
          <CardHeader>Extra Options</CardHeader>
          <CardContent>
            <div className='flex justify-between space-x-5 pb-5'>
              <Button className='w-full' onClick={() => { setUploadType(FormState.PASTE) }}>Paste BibTeX</Button>
              <Button className='w-full' onClick={() => { setUploadType(FormState.UPLOAD) }}>Upload File</Button>
            </div>
            {uploadType == FormState.PASTE && (
              <>
                <Textarea
                  placeholder="Write a tagline for an ice cream shop"
                  className="mb-5 min-h-[150px] flex-1 p-4 md:min-h-[250px] lg:min-h-[250px]"
                />
                <Button>Submit</Button>
              </>
            )}
            {uploadType == FormState.UPLOAD && (
              <>
                <Input className="mb-5" id="picture" type="file" />
                <Button>Submit</Button>
              </>
            )}
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)} className="space-y-8 mt-6 border p-4 bg-white">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value?.toISOString().split('T')[0]} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="journal_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="se_practice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SE Practice</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="claim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result_of_evidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result of Evidence</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type_of_participant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Participant</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button><input type="submit" /></Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ArticleForm;