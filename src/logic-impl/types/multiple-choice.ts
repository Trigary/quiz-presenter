import type { Question, QuestionType, Answer } from '@/logic/entity'
import type { TypeParser } from '@/logic/type'
import { DisplayableContent } from '@/logic/entity'

export class MultipleChoiceQuestion implements Question {
  readonly type: QuestionType = 'multiple-choice'

  constructor(public readonly question: DisplayableContent, public readonly choices: MultipleChoiceAnswer[]) {
  }
}

export class MultipleChoiceAnswer implements Answer {
  constructor(public readonly content: DisplayableContent, public readonly correct: boolean) {
  }
}

type MultipleChoiceJson = {
  question: string
  choices: {
    content: string
    correct: boolean
  }[]
}

export class MultipleChoiceParser implements TypeParser {
  parse(rawJson: object): MultipleChoiceQuestion {
    const json = rawJson as MultipleChoiceJson
    //TODO this doesn't validate that choice.correct is a boolean, does it?
    return new MultipleChoiceQuestion(
      new DisplayableContent(json.question),
      json.choices.map((choice) => new MultipleChoiceAnswer(new DisplayableContent(choice.content), choice.correct))
    )
  }
}
