<script>
    import { fade } from "svelte/transition";
    import { v4 as uuidv4 } from "uuid";
    import sio from "../utilities/sio.js";
    import iziToast from "izitoast";

    /* =========================== MANUFACTURE VEHICLE ========================== */
    let model, year, color;

    export let qrDataUrl = "";
    export let user;

    function sendData() {
        if (!(model && year && color)) {
            return iziToast.warning({
                title: "Missing Data",
                message: "Please fill out all fields",
            });
        }
        let block = {
            request: "manufacture",
            timestamp: new Date().toISOString(),
            vehicle: {
                id: uuidv4(),
                manufacturer: user.personalData.name,
                model,
                mileage: 0,
                year,
                color,
                country_of_origin: user.personalData.country,
                owner: user.address,
            },
            id: user.id,
        };

        sio.send(block);
    }
</script>

<form on:submit|preventDefault={sendData} id="manufacture-panel" class="box">
    <input
        class="input my-1 is-fullwidth"
        bind:value={model}
        placeholder="Model"
    />
    <input
        class="input my-1 is-fullwidth"
        bind:value={year}
        placeholder="Year"
    />
    <input
        class="input my-1 is-fullwidth"
        bind:value={color}
        placeholder="Color"
    />
    <button class="button is-dark my-1 is-fullwidth"
        >Manufacture Vehicle</button
    >
    {#if qrDataUrl}
        <img
            id="qr-code"
            src={qrDataUrl}
            alt="QR Code for Manufactured Vehicle"
            transition:fade
        />
    {/if}
</form>

<style>
    #manufacture-panel {
        transition: all 0.5s ease;
    }
</style>
