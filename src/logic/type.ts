import type { Question, QuestionType } from './entity'
import type { Component } from 'vue'

export type QuizJson = {
  title: string
  questions: QuestionJson[]
}

export type QuestionJson = {
  type: QuestionType
}

export interface TypeParser {
  parse(json: QuestionJson): Question
}

export class TypeManager {
  private types: { [key: QuestionType]: TypeData } = {}

  registerQuestionType(type: QuestionType, parser: TypeParser, renderer: Component) {
    if (this.types[type]) throw new Error(`Question type ${type} already registered`)
    this.types[type] = new TypeData(type, parser, renderer)
  }

  private getType(type: QuestionType): TypeData {
    const data = this.types[type]
    if (!data) throw new Error(`Question type ${type} not registered`)
    return data
  }

  parse(json: QuestionJson): Question {
    return this.getType(json.type).parser.parse(json)
  }

  renderer(question: Question): Component {
    return this.getType(question.type).renderer
  }
}

class TypeData {
  constructor(
    public type: QuestionType,
    public parser: TypeParser,
    public renderer: Component
  ) {}
}
