<script>
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";

  import PollStore from "../stores/PollStore";

  export let poll;
  const castVote = (option, id) => {
    PollStore.update(polls => {
      let _polls = [...polls];
      let upvotedPoll = _polls.find((poll) => poll.id === id);

      if (option === "a") upvotedPoll.voteA++;
      else upvotedPoll.voteB++;

      return _polls;
    });
  };
  const deletePoll = (id) => {
    PollStore.update(polls => polls.filter(poll => poll.id !== id))
  }

  $: totalVotes = poll.voteA + poll.voteB;

  $: percentA = Math.floor((100 / totalVotes) * poll.voteA);
  $: percentB = Math.floor((100 / totalVotes) * poll.voteB);

  $: colorA =
    percentA > percentB
      ? "rgba(69, 196, 159, .2)"
      : percentA < percentB
      ? "rgba(217, 27, 66, .2)"
      : "rgba(75, 75, 75, .2)";
  $: colorB =
    percentB > percentA
      ? "rgba(69, 196, 159, .2)"
      : percentB < percentA
      ? "rgba(217, 27, 66, .2)"
      : "rgba(75, 75, 75, .2)";
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {totalVotes}</p>
    <div class="answer" on:click={() => castVote("a", poll.id)}>
      <div class="percent" style="width: {percentA}%; background: {colorA};" />
      <span>{poll.answerA} ({poll.voteA})</span>
    </div>
    <div class="answer" on:click={() => castVote("b", poll.id)}>
      <div class="percent" style="width: {percentB}%; background: {colorB};" />
      <span>{poll.answerB} ({poll.voteB})</span>
    </div>
    <div class="delete">
      <Button flat on:click={() => deletePoll(poll.id)}>Delete</Button>
    </div>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }

  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }

  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }

  .answer:hover {
    opacity: 0.6;
  }

  span {
    display: inline-block;
    padding: 10px 20px;
  }

  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }

  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>
