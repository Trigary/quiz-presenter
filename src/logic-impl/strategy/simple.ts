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

    //Previous, simpler implementation:
    // this.current = this.remaining.shift() || null

    if (this.remaining.length === 0) {
      this.current = null
      return
    }

    // Pick randomly: [0] with 1/2 probability, [1] with 1/4 probability, [2] with 1/8 probability, ...
    let r = 1 - Math.random() //random number in range (0, 1]
    if (r <= 0) r = 1 //safety against floating point errors
    const l = Math.log(r) / Math.log(0.5) //log_0.5(r)
    let i = Math.floor(l)
    if (i >= this.remaining.length) i = 0 //biased towards the first element (because this.remaining has a finite size)
    this.current = this.remaining.splice(i, 1)[0]
  }

  getCountRemaining(): number {
    return this.remaining.length + (this.current == null ? 0 : 1)
  }
}
