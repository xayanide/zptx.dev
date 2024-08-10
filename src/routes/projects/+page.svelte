<script>
	import Header from '../Header.svelte';
	import Loading from '../Loading.svelte';
	import logo from '$lib/images/zptx-logo.png';
	import { fly } from 'svelte/transition';
	import projects from '$lib/data/projects.json';
	import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
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
	const imagesToLoad = [logo, ...Object.values(projects).map(project => `/src/lib/images/${project.image}`)];
	const createAndResolvePromises = async () => {
		await Promise.all(imagesToLoad.map(preloadImage));
		return reset();
	}
</script>

<svelte:head>
	<title>our projects</title>
	<meta name="description" content="ZPTX" />
</svelte:head>

{#await createAndResolvePromises()}
	<Loading {elapsed} />
{:then}
	<Header {logo} />
	<div class="bg-zptx-dark min-h-[calc(100vh-8rem)]">
		<div class="hero bg-base-200 min-h-96">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">our projects</h1>
					<p class="py-6">
						a collection of projects we've worked on, are working on, or plan to work on in the future.
					</p>
				</div>
			</div>
		</div>
		<div class="px-8 md:px-16 lg:px-32 grid md:grid-cols-2 gap-4 py-8">
			{#each Object.keys(projects) as project, i}
				<div class="card xl:card-side bg-base-100 shadow-xl" in:fly|global={{ y: '20%', delay: 100 * i }}>
					<figure class="shrink-0">
						<img
							class="object-cover h-64 w-full"
							src="/src/lib/images/{projects[project].image}"
							alt="{projects[project].name}" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{projects[project].name}</h2>
						<p class="self-start h-full">{projects[project].description}</p>
						<div class="card-actions justify-end">
							<a href="{projects[project].github}" class="transition hover:text-white">
								<FontAwesomeIcon icon={faGithub} />
							</a>
							{#if projects[project].discord}
								<a href="{projects[project].discord}" class="transition hover:text-white">
									<FontAwesomeIcon icon={faDiscord} />
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/await}