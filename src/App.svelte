<script>
	import { auth, googleProvider } from './firebase'
	import { authState } from 'rxfire/auth'
	import { currentRoom, players, profile, profileStats } from './stores'
	import Rooms from './components/Rooms.svelte'
	import GameRoom from './components/GameRoom.svelte'
	import GenerateUsername from './components/GenerateUsername.svelte'

	let user
	
	players.set()

	const unsubscribe = authState(auth).subscribe(u => {
		user = u
		if (user) {
			profile.set(u.uid)
		}
	})

	function login() {
		auth.signInWithPopup(googleProvider)
	}
</script>

<style>
	.body {
		padding: 2em;
	}
</style>

{#if user && $profile.uid}
	<section class="hero is-dark">
		<div class="hero-head">
			<nav class="navbar">
				<div class="container">
					<div class="navbar-brand">
						<div class="navbar-item">
							<div>
								<h1 class="title is-size-2">{$profile.username || user.displayName}</h1>
								<p class="subtitle is-size-6">{ user.email }</p>
							</div>
						</div>
					</div>
					<div class="navbar-menu">
						<div class="navbar-end">
							<span class="navbar-item">
								<GenerateUsername uid={user.uid} />
							</span>
							<span class="navbar-item">
								<button class="button is-info" on:click={ () => auth.signOut() }>
									<span class="icon">
										<i class="fas fa-hand-spock"></i>
									</span>
									<span>Logout</span>
								</button>
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>

		<div class="hero-body">
			<div class="tile is-ancestor">
				<div class="tile is-parent">
					<div class="tile is-child has-text-centered notification is-info">
						<p class="title is-size-1">{ $profileStats.activeGames }</p>
						<p class="subtitle">ACTIVE GAMES</p>
					</div>
				</div>
				<div class="tile is-parent">
					<div class="tile is-child has-text-centered notification is-success">
						<p class="title is-size-1">{ $profileStats.wins }</p>
						<p class="subtitle">WINS</p>
					</div>
				</div>
				<div class="tile is-parent">
					<div class="tile is-child has-text-centered notification is-danger">
						<p class="title is-size-1">{ $profileStats.losses }</p>
						<p class="subtitle">LOSSES</p>
					</div>
				</div>
				<div class="tile is-parent">
					<div class="tile is-child has-text-centered notification is-warning">
						<p class="title is-size-1">{ $profileStats.reliability }%</p>
						<p class="subtitle">RELIABILITY</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section class="body">
		{#if $currentRoom && $currentRoom.active}
			<GameRoom />
		{:else}
			<Rooms />
		{/if}
	</section>
{:else}
	<section class="hero is-dark is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title">
					Serverless Apps with Firebase & Node.js
				</h1>
				<h2 class="subtitle">
					<button class="button is-primary is-large" on:click={login}>Log In with Google</button>
				</h2>
			</div>
		</div>
	</section>
{/if}
