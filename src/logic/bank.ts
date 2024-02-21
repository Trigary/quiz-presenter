import type { Question } from '@/logic/entity'

export enum AnswerVerdict {
  Correct,
  Wrong
}

export class QuestionBank {
  private countCorrect: number = 0
  private countWrong: number = 0
  private readonly countTotal: number
  private readonly strategy: NextQuestionStrategy

  constructor(questions: Question[], strategy: (questions: Question[]) => NextQuestionStrategy) {
    this.countTotal = questions.length
    this.strategy = strategy(questions)
  }

  getCurrent(): Question {
    const current = this.strategy.getCurrent()
    if (current == null) throw new Error('No more questions')
    return current
  }

  advance(currentVerdict: AnswerVerdict) {
    switch (currentVerdict) {
      case AnswerVerdict.Correct:
        this.countCorrect++
        break
      case AnswerVerdict.Wrong:
        this.countWrong++
        break
    }
    this.strategy.advance(currentVerdict)
  }

  hasRemaining(): boolean {
    return this.getCountRemaining() > 0
  }

  getCountRemaining(): number {
    return this.strategy.getCountRemaining()
  }

  getCountTotal(): number {
    return this.countTotal
  }

  getCountOfVerdict(verdict: AnswerVerdict): number {
    switch (verdict) {
      case AnswerVerdict.Correct:
        return this.countCorrect
      case AnswerVerdict.Wrong:
        return this.countWrong
    }
  }
}

export interface NextQuestionStrategy {
  getCurrent(): Question | null

  advance(currentVerdict: AnswerVerdict): void

  getCountRemaining(): number
}
