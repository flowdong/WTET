import { Injectable } from '@nestjs/common';
// import { Configuration, OpenAIApi } from "openai";
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getOpen(){
    /*const configuration = new Configuration({
      organization: "org-JCW8VXXMCy3X2yJ7zYVTkQyh",
      apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  const response =   await openai.createEdit({
    model: "text-davinci-edit-001",
    input: "What  of the name is it?",
    instruction: "Fix the spelling mistakes",
  });
  console.log(response);
  return response.data*/

    return '21';
  }
}
