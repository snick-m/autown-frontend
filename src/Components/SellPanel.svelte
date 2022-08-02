<script>
    import { log } from "qrcode/lib/core/galois-field";
    import sio from "../utilities/sio.js";

    export let user;

    /* ================================ SELL VEHICLE ================================ */
    let buyerId, vehicleId;

    function sellCar() {
        let block = {
            request: "transfer",
            timestamp: new Date().toISOString(),
            vehicle: {
                id: vehicleId,
                owner: buyerId,
            },
            id: user.id,
        };
        sio.send(block);
    }

    function radianToDegree(radian) {
        return radian * (180 / Math.PI);
    }
</script>

<div class="box">
    <div class="field">
        <label class="label has-text-left">Buyer Address</label>
        <input
            class="input is-block my-1 is-fullwidth"
            bind:value={buyerId}
            placeholder="Buyer Address"
        />
    </div>
    <select
        class="button is-fullwidth"
        bind:value={vehicleId}
        on:change={() => console.log(vehicleId)}
    >
        {#each user.vehicles as vehicle}
            <option class="dropdown-item" value={vehicle.id}
                >{vehicle.model} {vehicle.year} {vehicle.color}</option
            >
        {/each}
    </select>

    <!-- <div class="field">
                <label class="label has-text-left">Vehicle ID</label>
                <input
                    class="input is-block my-1 is-fullwidth"
                    bind:value={vehicleId}
                    placeholder="Vehicle ID"
                />
            </div> -->
    <button
        class="button mt-4 is-success is-rounded is-fullwidth has-text-weight-semibold"
        on:click={sellCar}>Sell Vehicle</button
    >
</div>

<style>
    .list {
        max-height: 200px;
        overflow-y: scroll;
    }
    select::after {
        background-color: red;
    }
</style>
