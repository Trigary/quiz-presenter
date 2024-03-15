import type { Question, QuestionType, Answer } from '@/logic/entity'
import { TypeParser } from '@/logic/type'
import { DisplayableContent } from '@/logic/entity'

export class FlashCardQuestion implements Question {
  readonly type: QuestionType = 'flash-card'

  constructor(
    public readonly question: DisplayableContent,
    public readonly answer: FlashCardAnswer
  ) {}
}

export class FlashCardAnswer implements Answer {
  constructor(public readonly content: DisplayableContent) {}
}

type FlashcardJson = {
  question: string
  answer: string
}

export class FlashcardParser extends TypeParser {
  parse(rawJson: object): FlashCardQuestion {
    const json = rawJson as FlashcardJson
    return new FlashCardQuestion(
      new DisplayableContent(this.assertString(json.question)),
      new FlashCardAnswer(new DisplayableContent(this.assertString(json.answer)))
    )
  }
}
