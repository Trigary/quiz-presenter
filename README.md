# Quiz Presenter

A web application for displaying your custom-made flashcards, single/multiple choice questions and helping you learn.

The website is a single page application without any backend: the data (quizzes) are imported from URLs or files.

Main features:

- LaTeX support
- Markdown support
- Image embedding
- Syntax highlighting

Try it out now: [open an example quiz by opening this URL](https://raw.githubusercontent.com/Trigary/quiz-presenter/master/example-quiz.json) and see how the app works.

After importing a quiz, users work their way through the questions one at a time, in a random order.
Incorrectly answered questions are shuffled back together with the remaining questions until the user gets them right.

## Example quiz

Creating a quiz is as simple as creating a JSON file with the following structure:

~~~json
{
  "title": "My awesome quiz",
  "questions": [
    {
      "type": "multiple-choice",
      "question": "Which of these answers get rendered correctly?",
      "choices": [
        {
          "content": "$x^n + y^n = z^n$ has no integer solutions for $n > 2$",
          "correct": true
        },
        {
          "content": "Markdown is a **great** and *easy* to use ~~programming~~ language",
          "correct": true
        },
        {
          "content": "```py\\n while True: \\n   print('Hello, world!') \\n```",
          "correct": true
        }
      ]
    }
  ]
}
~~~

A more complex example can be found in the [example-quiz.json](example-quiz.json) file.

For more information head please over to the [Wiki](https://github.com/Trigary/quiz-presenter/wiki).

## Development

The project uses the following technologies:

- Node.js (version 18 or later)
- Vite
- TypeScript
- Vue 3
  - Vuetify is used for the UI components

The following are the most important commands needed for development:

```sh
npm install # Project setup
npm run dev # Start a development server with hot-reloading
npm run format # Format the source code with Prettier
npm run type-check # Run type checking
npm run lint # Analyze the source code for errors, warnings
npm run test:unit # Run unit tests
```
