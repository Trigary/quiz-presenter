import type { Question } from '@/logic/entity'
import { shuffle } from '@/utils/collections'
import type { NextQuestionStrategy } from '@/logic/bank'
import { AnswerVerdict } from '@/logic/bank'

export class SimpleNextQuestionStrategy implements NextQuestionStrategy {
  private current: Question | null = null
  private readonly remaining: Question[] = [] //current is not included

  constructor(questions: Question[]) {
    this.remaining = questions.slice() //shallow copy
    shuffle(this.remaining)
    this.current = this.remaining.shift() || null
  }

  getCurrent(): Question | null {
    return this.current
  }

  advance(currentVerdict: AnswerVerdict) {
    switch (currentVerdict) {
      case AnswerVerdict.Correct:
        break
      case AnswerVerdict.Wrong:
        this.remaining.push(this.current as Question)
        break
    }

    //TODO pick randomly: 1. with 1/2 probability, 2. with 1/4 probability, 3. with 1/8 probability, ...
    this.current = this.remaining.shift() || null
  }

  getCountRemaining(): number {
    return this.remaining.length + (this.current == null ? 0 : 1)
  }
}
