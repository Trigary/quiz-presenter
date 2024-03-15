import type { Question, QuestionType, Answer } from '@/logic/entity'
import { TypeParser } from '@/logic/type'
import { DisplayableContent } from '@/logic/entity'

export class MultipleChoiceQuestion implements Question {
  readonly type: QuestionType = 'multiple-choice'

  constructor(
    public readonly question: DisplayableContent,
    public readonly choices: MultipleChoiceAnswer[]
  ) {
    if (choices.length === 0) throw new Error('at least one choice is required')
  }
}

export class MultipleChoiceAnswer implements Answer {
  constructor(
    public readonly content: DisplayableContent,
    public readonly correct: boolean
  ) {}
}

type MultipleChoiceJson = {
  question: string
  choices: {
    content: string
    correct: boolean
  }[]
}

export class MultipleChoiceParser extends TypeParser {
  parse(rawJson: object): MultipleChoiceQuestion {
    const json = rawJson as MultipleChoiceJson
    return new MultipleChoiceQuestion(
      new DisplayableContent(this.assertString(json.question)),
      json.choices.map(
        (choice) =>
          new MultipleChoiceAnswer(
            new DisplayableContent(this.assertString(choice.content)),
            this.assertBoolean(choice.correct)
          )
      )
    )
  }
}
