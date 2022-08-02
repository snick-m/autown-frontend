<script>
    import sio from "../utilities/sio.js";
    import ellipsify from "../utilities/ellipsify.js";

    let vehicleId;
    let vehicle = {};
    let vhistory = [];
    let showModal = false;

    function getVehicleHistory() {
        sio.emit("getVehicleHistory", vehicleId, (recvHistory) => {
            vhistory = recvHistory;
            vehicle = recvHistory[0].vehicle;
            showModal = true;
            console.log(vehicle, vhistory);
        });
    }

    document.addEventListener("keydown", (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) {
            // Escape key
            showModal = false;
        }
    });
</script>

<div id="portal-panel" class="box">
    <div class="field">
        <label for="" class="label has-text-left">Vehicle ID</label>
        <input
            class="input my-1 is-fullwidth"
            bind:value={vehicleId}
            placeholder="Vehicle ID"
        />
    </div>
    <button
        class="button is-dark my-1 is-fullwidth is-rounded"
        on:click={getVehicleHistory}>Get History</button
    >

    <div id="modal-js-example" class="modal {showModal && 'is-active'}">
        <div class="modal-background" on:click={() => (showModal = false)} />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{vehicle.model} {vehicle.year}</p>
                <button
                    on:click={() => (showModal = false)}
                    class="delete"
                    aria-label="close"
                />
            </header>
            <section class="modal-card-body">
                <div class="columns is-centered has-text-weight-bold">
                    <div class="column is-2">Event</div>
                    <div class="column is-4">Address</div>
                    <div class="column is-6">Timestamp</div>
                </div>
                {#each vhistory as block}
                    <div class="columns is-centered">
                        <div class="column is-2">
                            {block.request[0].toUpperCase() +
                                block.request.slice(1)}
                        </div>
                        <div class="column is-4">
                            {ellipsify(block.vehicle.owner, 1, 16)}
                        </div>
                        <div class="column is-6">
                            {new Date(block.timestamp)}
                        </div>
                    </div>
                {/each}
            </section>
        </div>
    </div>
</div>

<style>
</style>
