<script>
  import { onMount } from "svelte";
  export let fetchExcelFiles; // Function passed from parent to fetch Excel files
  export let setGoogleUser; // Function passed from parent to set googleUser
  let client; // Declare a client variable to hold the OAuth2 client

  onMount(() => {
    client = window.google.accounts.oauth2.initCodeClient({
      client_id:
        "242521280191-57jtv00ll8cdejh127r4a95f32gm81dk.apps.googleusercontent.com",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile \
           https://www.googleapis.com/auth/userinfo.email",
      ux_mode: "redirect",
      redirect_uri: "http://localhost:8080/oauth2callback",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  function handleCredentialResponse(response, whatever) {
    console.log(response, whatever);
    setGoogleUser(response); // Call setGoogleUser to update googleUser in parent
    const jwt = response.credential;
    fetchExcelFiles(jwt);
  }

  function getAuthCode() {
    client.requestCode();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="buttonDiv" on:click={getAuthCode} />
