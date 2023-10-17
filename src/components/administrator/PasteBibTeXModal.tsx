import bibtexParse from 'bibtex-parse-js';

import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Button } from '../ui/button';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Article } from '~/types';
import { parseBibTeXToArticle } from '~/pages/analyst/articleBibTeXParser';

enum FormState {
    PASTE,
    NONE
}

const formSchema = z.object({
    textArea: z.string().nonempty({ message: "BibTeX is required" }),
})

interface PasteBibTexModalProps {
    resetArticle: (article: Article) => void;
}

const PasteBibTexModal: React.FC<PasteBibTexModalProps> = ({ resetArticle }) => {
    const [uploadType, setUploadType] = useState(FormState.NONE);
    const [bibtex, setBibtex] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setBibtex(value);
        setIsValid(isValidBibtexEntry(value));
    }

    function isValidBibtexEntry(bibtex: string): boolean {
        try {
            const parsed = bibtexParse.toJSON(bibtex);
            if (parsed && parsed.length > 0) {
                // Additional validity checks can be added here based on the parsed result
                return true;
            }
        } catch (error) {
            console.error("Error parsing BibTeX", error);
        }
        return false;
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        const bibtex = parseBibTeXToArticle(data.textArea);

        if (!bibtex) return;

        resetArticle(bibtex);
    }

    return (
        <Card className='pb-5'>
            <CardHeader>Extra Options</CardHeader>
            <CardContent>
                <div className='flex justify-between space-x-5 pb-5'>
                    <Button className='w-full' onClick={() => { setUploadType(FormState.PASTE) }}>Paste BibTeX</Button>
                </div>
                {uploadType == FormState.PASTE && (
                    <form onSubmit={form.handleSubmit(() => void onSubmit)}>
                        <div className="grid w-full gap-1.5">
                            <Textarea
                                onChange={handleTextChange}
                                placeholder="Paste your BibTeX to parse and fill in the form automatically."
                                className={`min-h-[150px] flex-1 p-4 md:min-h-[250px] lg:min-h-[250px] ${!isValid ? 'border-red-500 border-2' : ''}`}
                            />
                            <p className="text-sm text-muted-foreground">
                                Your message will be copied to the support team.
                            </p>
                            <Button>Submit</Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default PasteBibTexModal;