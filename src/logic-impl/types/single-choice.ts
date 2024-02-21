import type { Question, QuestionType, Answer } from '@/logic/entity'
import type { TypeParser } from '@/logic/type'
import { DisplayableContent } from '@/logic/entity'

export class SingleChoiceQuestion implements Question {
  readonly type: QuestionType = 'single-choice'

  constructor(
    public readonly question: DisplayableContent,
    public readonly choices: SingleChoiceAnswer[]
  ) {
    if (choices.filter((choice) => choice.correct).length !== 1) {
      throw new Error('exactly one correct choice is required')
    }
  }
}

export class SingleChoiceAnswer implements Answer {
  constructor(
    public readonly content: DisplayableContent,
    public readonly correct: boolean
  ) {}
}

type SingleChoiceJson = {
  question: string
  choices: {
    content: string
    correct: boolean
  }[]
}

export class SingleChoiceParser implements TypeParser {
  parse(rawJson: object): SingleChoiceQuestion {
    const json = rawJson as SingleChoiceJson
    //TODO this doesn't validate that choice.correct is a boolean, does it?
    return new SingleChoiceQuestion(
      new DisplayableContent(json.question),
      json.choices.map(
        (choice) => new SingleChoiceAnswer(new DisplayableContent(choice.content), choice.correct)
      )
    )
  }
}
