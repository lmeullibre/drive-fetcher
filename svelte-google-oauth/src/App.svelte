<script>
  import axios from "axios";

  // OAuth settings
  const clientID =
    "242521280191-57jtv00ll8cdejh127r4a95f32gm81dk.apps.googleusercontent.com";
  const redirectURI = "http://localhost:8080";
  const scope = "https://www.googleapis.com/auth/drive.metadata.readonly";
  const ux_mode = "popup";
  const responseType = "token";

  // Reactive variable to store Excel files
  let excelFiles = [];

  function initiateOAuth() {
    // Build OAuth URL
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&ux_mode=${ux_mode}`;

    // Redirect to Google's OAuth Server
    window.location.href = authUrl;
  }

  function fetchGoogleDriveFiles(token) {
    console.log("que lo que", token);

    // Perform Axios GET request to NestJS server
    axios
      .get("http://localhost:3000/api/excel-files", {
        params: {
          token: token,
        },
      })
      .then((response) => {
        // Update the reactive variable excelFiles
        excelFiles = response.data;

        // Log the response data
        console.log("Received response:", response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching Excel files:", error);
      });
  }

  // Handle OAuth 2.0 token (equivalent to React's useEffect)
  if (window.location.hash && window.location.hash.includes("access_token")) {
    const token = new URLSearchParams(window.location.hash.substr(1)).get(
      "access_token"
    );
    fetchGoogleDriveFiles(token);
  }
</script>

<div>
  <button class="button" on:click={initiateOAuth}>Sign in with Google</button>
</div>

<!-- Display Excel Files -->
<ul class="file-list">
  {#each excelFiles as file}
    <li>{file.name} (ID: {file.id})</li>
  {/each}
</ul>

<!-- Styles -->
<style>
  .button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  ul.file-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  ul.file-list li {
    border: 1px solid #ccc;
    margin: 8px 0;
    padding: 12px;
    background-color: #f9f9f9;
  }
</style>
