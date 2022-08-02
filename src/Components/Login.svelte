<script>
    let username;
    let password;

    import sio from "../utilities/sio.js";

    function login() {
        sio.emit("login", {
            username,
            password,
        });
    }
</script>

<form on:submit|preventDefault={login} class="box">
    <div class="field">
        <label for="" class="label has-text-left">Username</label>
        <input
            class="input is-block my-1 is-fullwidth"
            bind:value={username}
            placeholder="Username"
        />
    </div>
    <div class="field">
        <label for="" class="label has-text-left">Password</label>
        <input
            class="input is-block my-1 is-fullwidth"
            bind:value={password}
            placeholder="Password"
            type="password"
        />
    </div>
    <button class="button mt-4 is-dark is-rounded is-fullwidth">Login</button>
</form>

<style>
</style>
