<script>
  import GoogleSignIn from "./GoogleSignIn.svelte";

  let googleUser = null;
  let excelFiles = [];

  function setGoogleUser(user) {
    googleUser = user;
  }

  function logoutAndRevoke() {
    // Assuming you're using Google's new One Tap system:
    google.accounts.id.revoke("sergimartinezrodriguez@gmail.com", (done) => {
      console.log("consent revoked");
    });
  }

  async function fetchExcelFiles(token) {
    const response = await fetch(
      `http://localhost:3000/api/excel-files?token=${token}`
    );

    if (response.ok) {
      excelFiles = await response.json();
    } else {
      console.error("Failed to fetch Excel files");
      const errorData = await response.json();
      console.error(errorData);
    }
  }
</script>

<main>
  <h1>Hello Svelte!</h1>
  <GoogleSignIn {fetchExcelFiles} {setGoogleUser} />
  {#if excelFiles.length > 0}
    <ul>
      {#each excelFiles as file}
        <li>{file.name}</li>
      {/each}
    </ul>
  {/if}

  {#if googleUser}
    <button on:click={logoutAndRevoke}>Logout</button>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
