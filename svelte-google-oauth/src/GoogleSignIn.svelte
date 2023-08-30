<script>
  import { onMount } from "svelte";
  export let fetchExcelFiles; // Function passed from parent to fetch Excel files
  export let setGoogleUser; // Function passed from parent to set googleUser

  onMount(() => {
    window.google.accounts.id.initialize({
      client_id:
        "242521280191-57jtv00ll8cdejh127r4a95f32gm81dk.apps.googleusercontent.com",
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
</script>

<div id="buttonDiv">
  <!-- Google Sign-In button will be rendered here -->
</div>
