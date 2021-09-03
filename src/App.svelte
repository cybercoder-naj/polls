<script>
  // Importing Components
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import PollList from "./components/PollList.svelte";

  // Creating Tabs
  import Tabs from "./shared/Tabs.svelte";
  let items = ["Current Polls", "Add new Poll"];
  let activeItem = items[0];
  const handleTabChange = (e) => {
    activeItem = e.detail;
  };

  const addPoll = (e) => {
    activeItem = items[0];
  };
</script>

<Header />
<main>
  <Tabs {items} {activeItem} on:tabChange={handleTabChange} />
  {#if activeItem === items[0]}
    <PollList />
  {:else if activeItem === items[1]}
    <CreatePollForm on:add={addPoll} />
  {/if}
</main>
<Footer />

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>
