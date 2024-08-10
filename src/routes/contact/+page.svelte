<script>
	import Header from '../Header.svelte';
	import Loading from '../Loading.svelte';
	import logo from '$lib/images/zptx-logo.png';
	import { fly } from 'svelte/transition';
	import contact from '$lib/data/contact.json';
	import { faDiscord } from '@fortawesome/free-brands-svg-icons';
	import { faEnvelope, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	const startTime = Date.now();
	$: elapsed = Date.now() - startTime;
	const interval = setInterval(() => {
		elapsed = Date.now() - startTime;
	}, 1000);
	const reset = () => {
		clearInterval(interval);
	};
	const preloadImage = (src) => {
		return new Promise((resolve) => {
			let img = new Image();
			img.onload = resolve;
			img.src = src;
		});
	};
	const imagesToLoad = [logo];
	const createAndResolvePromises = async () => {
		await Promise.all(imagesToLoad.map(preloadImage));
		return reset();
	}
</script>

<svelte:head>
	<title>contact us</title>
	<meta name="description" content="ZPTX" />
</svelte:head>

{#await createAndResolvePromises()}
	<Loading {elapsed} />
{:then}
	<Header {logo} />
	<div class="bg-zptx-dark min-h-[calc(100vh-8rem)]">
		<div class="hero bg-base-200 min-h-[calc(100vh-8rem)]">
			<div class="hero-content text-center">
				<div class="max-w-lg">
					<h1 class="text-5xl font-bold">contact us</h1>
					<p class="py-6">
						need to get in touch with us? here's where you can find us.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<a in:fly={{ y: '20%' }} href={contact.discord} class="btn btn-primary no-animation">
							<FontAwesomeIcon icon={faDiscord} />
							<span>discord server</span>
						</a>
						<a in:fly={{ y: '20%', delay: 100 }} href={contact.email} class="btn btn-active no-animation">
							<FontAwesomeIcon icon={faEnvelope} />
							<span>email us</span>
						</a>
						<a in:fly={{ y: '20%', delay: 200 }} href={contact.status} class="btn btn-secondary no-animation">
							<FontAwesomeIcon icon={faHeartPulse} />
							<span>status page</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}