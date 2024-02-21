import { TypeManager } from '@/logic/type'
import { FlashcardParser } from '@/logic-impl/types/flash-card'
import Flashcard from '@/logic-impl/types/FlashCard.vue'
import { SingleChoiceParser } from '@/logic-impl/types/single-choice'
import SingleChoice from '@/logic-impl/types/SingleChoice.vue'
import { MultipleChoiceParser } from '@/logic-impl/types/multiple-choice'
import MultipleChoice from '@/logic-impl/types/MultipleChoice.vue'

const typeManager = new TypeManager()
typeManager.registerQuestionType('flash-card', new FlashcardParser(), Flashcard)
typeManager.registerQuestionType('single-choice', new SingleChoiceParser(), SingleChoice)
typeManager.registerQuestionType('multiple-choice', new MultipleChoiceParser(), MultipleChoice)

export default typeManager
