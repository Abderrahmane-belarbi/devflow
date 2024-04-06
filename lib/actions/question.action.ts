"use server"

import Question from "@/database/question.model";
import { connectToDataBase } from "../mongoose"
import Tag from "@/database/tag.model";
import { GetQuestionsParams, CreateQuestionParams} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams){
  try {
    connectToDataBase();

    const questions = await Question.find({})
      .populate({path: 'tags', model: Tag})
      .populate({path: 'author', model: User})
      .sort({createdAt: -1}); // sort the question from the newest to the oldest

    return {questions}
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams){
  try{
    // connect to the database
    connectToDataBase()
    const {title, content, tags, author, path} = params;
    // create a question
    const question = await Question.create({
      title,
      content,
      author,
    })
    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // update the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments}}
    })

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +points for create a questions 

    revalidatePath(path)
  } catch (error){

  }
}