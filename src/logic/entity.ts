export class DisplayableContent {
  constructor(public readonly rawText: string) {
  }
}

export type QuestionType = string //Accept any string to allow for future extensions with e.g. plugins

export interface Question {
  readonly type: QuestionType;
  readonly question: DisplayableContent;
}

export interface Answer {
  readonly content: DisplayableContent;
}
