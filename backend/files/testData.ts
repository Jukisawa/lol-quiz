import { Question } from '../src/models/question';

export const questions: ExcludeMethods<Question>[] = [{
    category          : 'Geschichte',
    value             : 100,
    question          : 'Wer war der erste Bundeskanzler Deutschlands?',
    answers           : ['Konrad Adenauer'],
    guessed           : false,
    multipleChoice    : false,
    hints             : ['Nachkriegszeit', 'CDU', 'Kanzler ab 1949'],
},{
    category          : 'Geschichte',
    value             :  200,
    question          : 'In welchem Jahr fiel die Berliner Mauer?',
    answers           : ['1989'],
    guessed           : false,
    multipleChoice    : false,
    hints             : ['Ende der DDR', 'November', 'Wende'],
},{
    category          : 'Wissenschaft',
    value             : 100,
    question          : 'Was ist H2O?',
    answers           : ['Wasser'],
    guessed           : false,
    multipleChoice    : false,
    hints             : ['Chemische Formel', 'Trinkbar', 'Lebensnotwendig'],
},{
    category          : 'Wissenschaft',
    value             : 200,
    question          : 'Wer entwickelte die Relativitätstheorie?',
    answers           : ['Konrad Adenauer'],
    guessed           : false,
    multipleChoice    : false,
    hints             : ['Physiker', 'E=mc²', 'Nobelpreisträger'],
}]