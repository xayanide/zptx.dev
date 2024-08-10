<script>
	import Header from '../Header.svelte';
	import Loading from '../Loading.svelte';
	import logo from '$lib/images/zptx-logo.png';
	import { fly, fade } from 'svelte/transition';
	import team from '$lib/data/team.json';
	import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { copy } from 'svelte-copy';

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
	const imagesToLoad = [logo, ...Object.values(team).map(member => member.image)];
	const createAndResolvePromises = async () => {
		await Promise.all(imagesToLoad.map(preloadImage));
		return reset();
	}

	const badgesResponsiveFormatting = "text-[0px] lg:text-sm xl:text-[0px] 2xl:text-sm";
	$: copied = [];
	const copySucceeded = (target) => {
		if (copied.includes(target)) return;
		copied = [...copied, target];
		setTimeout(() => {
			copied = copied.filter(member => member !== target);
		}, 2000);
	};
</script>

<svelte:head>
	<title>the team</title>
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
					<h1 class="text-5xl font-bold">the team</h1>
					<p class="py-6">
						we're a small team of passionate developers; dedicated to making intuitive, user-friendly, and accessible software for everyone.
					</p>
				</div>
			</div>
		</div>
		<div class="px-8 md:px-16 lg:px-32 grid md:grid-cols-2 gap-4 py-8">
			{#each Object.keys(team) as member, i}
				<div class="card xl:card-side bg-base-100 shadow-xl" in:fly|global={{ y: '20%', delay: 100 * i }}>
					<figure class="shrink-0">
						<img
							class="object-cover h-64 w-full"
							src="{team[member].image}"
							alt="{team[member].name}'s Profile Picture" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{team[member].name}</h2>
						<p class="text-sm -mt-3 text-gray-500">@{member}</p>
						<p class="self-start h-full">{team[member].statement}</p>
						<div class="card-actions items-center">
							{#if team[member].roles.includes("MANAGEMENT_TEAM")}
								<div class="tooltip" data-tip="part of our management team">
									<div class="badge badge-error {badgesResponsiveFormatting}">management</div>
								</div>
							{/if}
							{#if team[member].roles.includes("DEVELOPMENT_TEAM")}
								<div class="tooltip" data-tip="one of our cool developers">
									<div class="badge badge-accent {badgesResponsiveFormatting}">dev</div>
								</div>
							{/if}
							{#if team[member].roles.includes("LOCALIZATION_TEAM")}
								<div class="tooltip" data-tip="someone who helps us translate our projects">
									<div class="badge badge-primary {badgesResponsiveFormatting}">localization</div>
								</div>
							{/if}
							<div class="flex ml-auto relative">
								<a href="{team[member].github}" class="transition hover:text-white absolute right-7">
									<FontAwesomeIcon icon={faGithub} />
								</a>
								{#if copied.includes(member)}
									<button in:fade={{ duration: 200 }} use:copy={team[member].discord} on:svelte-copy={() => copySucceeded(member)} class="transition hover:text-white w-5">
											<FontAwesomeIcon icon={faClipboardCheck} />
									</button>
								{:else}
									<button in:fade={{ duration: 200 }} use:copy={team[member].discord} on:svelte-copy={() => copySucceeded(member)} class="transition hover:text-white w-5">
										<FontAwesomeIcon icon={faDiscord} />
									</button>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/await}