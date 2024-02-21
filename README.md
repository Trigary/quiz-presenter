# Quiz Presenter

A web application for displaying your custom made flashcards, single/multiple choice questions and helping you learn.

The website is a single page application without any backend: the data (quizzes) are imported from URLs or files.

Planned features:

- LaTeX support
- Markdown support (maybe)
- Image support

## Example of importable data

~~~json
{
  "title": "My quiz title",
  "questions": [
    {
      "type": "flash-card",
      "question": "Question 1",
      "answer": "Answer 1"
    },
    {
      "type": "single-choice",
      "question": "Question 2",
      "choices": [
        {
          "content": "Choice 1",
          "correct": true
        },
        {
          "content": "Choice 2",
          "correct": false
        }
      ]
    },
    {
      "type": "multiple-choice",
      "question": "Question 3",
      "choices": [
        {
          "content": "Choice 1",
          "correct": true
        },
        {
          "content": "Choice 2",
          "correct": false
        },
        {
          "content": "Choice 3",
          "correct": true
        }
      ]
    }
  ]
}
~~~

## Development

See [Vite Configuration Reference](https://vitejs.dev/config/).

```sh
npm install # Project setup
npm run dev # Compile and hot-reload for development
npm run build # Type-check, compile and minify for production
npm run test:unit # Run unit tests with Vitest
npm run lint # Lint with ESLint
```
