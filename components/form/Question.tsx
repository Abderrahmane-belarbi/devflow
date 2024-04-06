"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { QuestionsSchema } from '@/lib/validation';

import React, { ReactEventHandler, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Badge } from "../ui/badge"
import Image from "next/image"
import { createQuestion } from "@/lib/actions/question.action"
import { useRouter, usePathname } from "next/navigation"

// type of sumitting edit or create post
const type: any = 'create'

interface Props{
  mongoUserId: string;
}

export default function Question({mongoUserId}: Props) {

  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: []
    },
  });
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);
    
    try{
      // make an async call to api to the database > create question
      // contain all form data

      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      })
      console.log(tags)
      

      //navigate to home page
      router.push('/');

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleInputKeyDown (
    e: any,
    field: any
  ) {
    if (e.key === 'Enter' && e.target.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim(); // Remove the leading and trailing white space

      if (tagValue !== '' && maxTagsNumber > tags.length) {
        // Error in tag input when the value is > 15 characters
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters'
          });
        }

        // Check if the tag exist already within the fields
        if(!tags.includes(tagValue as never)){
          setTags([...tags, tagValue as never]);
          tagInput.value = '';
          console.log(tags);
        } else {
          console.log('This is already added before')
        }
      } 
    }
  };

  const maxTagsNumber = 5;
  const [tags, setTags] = useState([]);

  function handleTagRemove(tag: string){
    const newTags = tags.filter((t: string) => t !== tag)
    setTags([...newTags]);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Question Title <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">Detailed explanation of your problem <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      'powerpaste', 'casechange', 'searchreplace', 'autolink', 'directionality', 'advcode', 'visualblocks', 'visualchars', 'image', 'link', 'media', 'mediaembed', 'codesample', 'table', 'charmap', 'pagebreak', 'nonbreaking', 'anchor', 'tableofcontents', 'insertdatetime', 'advlist', 'lists', 'checklist', 'wordcount', 'tinymcespellchecker', 'editimage', 'help', 'formatpainter', 'permanentpen', 'charmap', 'linkchecker', 'emoticons', 'advtable', 'export', 'autosave'
                    ],
                    toolbar: 'undo redo | ' +
                      'codesample spellcheckdialog blocks fontfamily fontsize bold italic underline forecolor backcolor | link | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat',
                    content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:16px }'
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title. minimum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Tags <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border px-2 rounded-lg"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    name="tags"
                  />
                  {tags.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {tags.map((tag) => (
                        <Badge key={tag} className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize">
                          {tag}
                          <Image
                            className="cursor-pointer object-contain invert-0 dark:invert"
                            src='assets/icons/close.svg'
                            alt='close'
                            width={12}
                            height={12}
                            onClick={() => {handleTagRemove(tag)}}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to {maxTagsNumber} tags to describe what your question is about. you need to press enter to add tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
          {isSubmitting ?  (
            <>
              {type === 'edit' ? 'Editing...' : 'Posting...'}
            </>
          ) : (
            <>
              {type === 'edit' ? 'Edit Question' : 'Ask a Question'}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}