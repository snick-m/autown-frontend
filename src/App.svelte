<script>
	import Login from "./Components/Login.svelte";
	import Stats from "./Components/Stats.svelte";
	import ManufacturePanel from "./Components/ManufacturePanel.svelte";

	import sio from "./utilities/sio.js";
	import makeQR from "./utilities/qr_generator.js";
	import SellPanel from "./Components/SellPanel.svelte";
	import PublicPortal from "./Components/PublicPortal.svelte";

	import iziToast from "izitoast";
	import "izitoast/dist/js/iziToast.min.js";
	import "izitoast/dist/css/iziToast.min.css";

	import "./utilities/bulma_modal";

	let portalMode = true;

	let user = JSON.parse(localStorage.getItem("user"));

	$: loggedIn = user && user.hasOwnProperty("address");

	let qrDataUrl = "";

	sio.on("message", (data) => {
		console.log(data);
		switch (data.request) {
			case "manufacture":
				makeQR(
					`https://autown.com/?vehicle=${data.block.vehicle.id}`
				).then((dataUrl) => (qrDataUrl = dataUrl));
				break;
		}
	});

	sio.on("loginAttempt", (data) => {
		if (data.success) {
			localStorage.setItem("user", JSON.stringify(data.user));
			user = data.user;
			return;
		}
		iziToast.error({
			message: "Login failed",
		});
	});

	function refreshUserData() {
		if (!user || !user.hasOwnProperty("address"))
			return iziToast.error({ message: "Please Login First." });
		sio.emit("getUserData", (ack) => {
			user = ack;
		});
	}

	function logout() {
		localStorage.removeItem("user");
		user = {};
		sio.emit("logout", {});
	}

	function listOwnedVehicles() {
		console.log(...user.vehicles);
	}

	function togglePortalMode() {
		portalMode = !portalMode;
	}
</script>

<main>
	<div class="columns is-vcentered">
		<div class="column is-2" />
		<div class="column is-8">
			<h1
				class="has-text-dark"
				style="font-family: 'Raleway'; font-weight: 700;"
			>
				AUTOWN
			</h1>
		</div>
		<div class="column is-2 is-vcentered">
			{#if loggedIn}
				<button
					on:click={logout}
					class="button is-danger is-small is-outlined"
				>
					Logout
				</button>
			{/if}
		</div>
	</div>

	<div class="block" />
	<Stats />

	<div class="columns is-centered">
		{#if portalMode}
			<div class="column is-6">
				<PublicPortal />
			</div>
		{:else if !loggedIn}
			<div class="column is-6">
				<Login />
			</div>
		{:else if user.type == 1}
			<div class="column is-6">
				<ManufacturePanel {qrDataUrl} {user} />
			</div>
			<div class="column is-3">
				<SellPanel {user} />
			</div>
		{:else if user.type >= 2}
			<div class="column is-6">
				<SellPanel {user} />
			</div>
		{/if}
	</div>

	{#if loggedIn}
		<div class="columns is-centered">
			<div class="column is-6">
				<button
					on:click={listOwnedVehicles}
					class="button is-4 is-fullwidth is-info is-outlined"
					>List Owned Vehicles</button
				>
			</div>
		</div>
	{/if}
	<div class="columns is-centered">
		<div class="column is-6">
			<button
				on:click={togglePortalMode}
				class="button is-4 is-fullwidth is-info is-outlined"
				>{portalMode ? "Go to Login" : "Go to Portal"}</button
			>
			<button
				on:click={refreshUserData}
				class="button my-2 is-4 is-fullwidth is-info is-outlined"
				>Refresh User Data</button
			>
		</div>
	</div>
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
