<script>
	import { fade, fly } from 'svelte/transition';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
	import { config } from '@fortawesome/fontawesome-svg-core';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	import Loading from './Loading.svelte';
	import logo from '$lib/images/zptx-logo.png';
	import { base } from '$app/paths';

	config.autoAddCss = false;

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
	<title>landing</title>
	<meta name="description" content="ZPTX" />
</svelte:head>

{#await createAndResolvePromises()}
	<Loading {elapsed} />
{:then}
	<div class="hero bg-zptx-dark min-h-screen">
		<div class="hero-content text-center" in:fade>
			<div class="max-w-md">
				<img src={logo} alt="ZPTX Logo" />
				<div class="flex justify-center items-center gap-2 mt-8 text-lg md:text-xl font-mono">
					<a href="{base}/team" class="transition hover:text-white">the team</a>
					<p class="text-slate-600">/</p>
					<a href="{base}/projects" class="transition hover:text-white">our projects</a>
					<p class="text-slate-600">/</p>
					<a href="{base}/contact" class="transition hover:text-white">contact us</a>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-mono flex justify-center gap-6" in:fly={{ y: '20%' }}>
		<a href="https://github.com/ZPTXDev" class="transition hover:text-white">
			<FontAwesomeIcon icon={faGithub} />
		</a>
		<a href="https://go.zptx.dev/discord" class="transition hover:text-white">
			<FontAwesomeIcon icon={faDiscord} />
		</a>
	</div>
{/await}