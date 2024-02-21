export class AnswerStyle {
  constructor(
    public readonly hidden: AnswerSubStyle,
    public readonly revealed: AnswerSubStyle
  ) {}
}

export class AnswerSubStyle {
  constructor(
    public readonly color: string | undefined = undefined,
    public readonly border: string | undefined = undefined
  ) {}
}
