# Quiz Presenter

A web application for displaying your custom-made flashcards, single/multiple choice questions and helping you learn.

**Try it out now**: [open an example quiz by opening this URL](https://trigary.github.io/quiz-presenter/?src=https%3A%2F%2Fraw.githubusercontent.com%2FTrigary%2Fquiz-presenter%2Fmaster%2Fexample-quiz.json) and see how the app works.
The home page of the app is available at https://trigary.github.io/quiz-presenter/.

## Features

- LaTeX support
- Markdown support
- Image embedding
- Syntax highlighting
- Import quizzes from URLs or files
- Multiple question types: flashcard, single choice, multiple choice

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
          "content": "```py\nwhile True:\n    print('Hello, world!')\n```",
          "correct": true
        }
      ]
    }
  ]
}
~~~

Normally you would convert a quiz to this JSON format using a simple (e.g. Python) script.
Some example conversion scripts like that are available [here](https://github.com/Trigary/quiz-presenter/wiki)
(TODO: improve this link).

For more information head please over to the [Wiki page](https://github.com/Trigary/quiz-presenter/wiki).

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

Contributions are welcome.

### Project structure

- `public/`: static files that don't get processed by Webpack (e.g. favicons, robots.txt)
- `src/`: main source code
  - `assets/`: most static files (e.g. images, stylesheets)
  - `components/`: generic Vue components used throughout the app
  - `globals/`: Vue data stores and various global state holders
  - `logic/`: business logic of the quiz presenting, excluding the implementations
  - `logic-impl/`: implementations of the business logic: specific quiz types, next question choosing strategies, etc.
  - `plugins/`: Vue plugins, e.g. router
  - `utils/`: utility functions
  - `views/`: Vue components that represent entire pages
  - `App.vue`, `main.ts`: the main entry point of the app

Additionally, the project root contains several configuration files.
