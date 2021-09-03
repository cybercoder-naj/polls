import { writable } from 'svelte/store';

const PollStore = writable([
  {
    id: 1,
    question: 'Java or Kotlin',
    answerA: 'Java',
    answerB: 'Kotlin',
    voteA: 9,
    voteB: 15
  }
])

export default PollStore