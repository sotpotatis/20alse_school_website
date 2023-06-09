<script>
	// Iconify
	import Icon from "@iconify/svelte";

	// Top Banner
	import PreservationBanner from "$lib/PreservationBanner.svelte";
	// Projects
	import Projects_Wrapper from "$lib/Projects_Wrapper.svelte";
	let school_projects = [{
		image: {
			url: "https://20alse.ssis.nu/start_page_assets/dishwatcher.png",
			alt_text: "Skärmdump som visar hemsidan"
		},
		name: "DishWatcher",
		description: "Projekt för att hålla koll på och visa statusen för skolans diskmaskiner.",
		buttons: [{
			background_color: "green-700",
			border_color: "green-600",
			onclick_action: {
				type: "url",
				url: "https://dishwatch.ssis.nu/",
			},
			text: "Till hemsidan",
		}],
		tags: [
			"python", "teknik 1", "öppet api", "flask", "tailwind", "pycom", "3d-modellering", "egen pcb"
		]
	},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/fishy.png",
				alt_text: "Skärmdump som visar hemsidan"
			},
			name: "Fishy",
			description: "Ett spel där målet är enkelt: fånga så mycket fisk som möjligt!",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://github.com/sotpotatis/FishGame/releases/latest/download/FishGame.exe",
				},
				text: "Ladda ner",
				icon: "fluent:arrow-download-48-filled"
			},
				{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://github.com/sotpotatis/FishGame",
				},
				text: "Källkod",
				icon: "akar-icons:github-fill"
			}],
			tags: [
					"c#", "monogame", "programmering 1"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/albins_vm.png",
				alt_text: "Skärmdump som visar hemsidan"
			},
			name: "Apache2-hemsida",
			description: "Installation av Apache2 på en Debian virtual machine",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://dishwatch.ssis.nu/",
				},
				text: "Till hemsidan",
			}],
			tags: [
				"apache2", "debian", "linux", "dator- och nätverksteknik"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/filur.png",
				alt_text: "Skärmdump som visar hemsidan"
			},
			name: "Filurhemsidan",
			description: "Min färdiga version av hemsidan med den glada figuren på.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://20alse.ssis.nu/www/filursite/",
				},
				text: "Till hemsidan",
			}],
			tags: [
				"html", "css", "dator- och nätverksteknik"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/uppgift1.png",
				alt_text: "Skärmdump som visar hemsidan"
			},
			name: "Uppgift 1",
			description: "Min färdiga version av Uppgift 1 i dator- och nätverksteknik. En tillagd funktion är att slumpvis bilder på människor hämtas.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "",
				},
				text: "Till hemsidan",
			}],
			tags: [
				"html", "css", "dator- och nätverksteknik"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/www_folder.png",
				alt_text: "Skärmdump som visar hemsidan"
			},
			name: "/www/",
			description: "En mapp med massa HTML-filer gjort som en del i Dator- och nätverksteknik.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "",
				},
				text: "Till hemsidan",
			}],
			tags: [
				"html", "css", "dator- och nätverksteknik"
			]
		}]
	let personal_projects = [{
		image: {
			url: "https://20alse.ssis.nu/start_page_assets/eatery_lunchmeny.png",
			alt_text: "test"
		},
		name: "Eatery Lunchmeny API",
		description: "Ett API för att hämta lunchmenyn på SSIS.",
		buttons: [{
			background_color: "green-700",
			border_color: "green-600",
			onclick_action: {
				type: "url",
				url: "https://lunchmeny.albins.website/",
			},
			text: "Till API:et",
			icon: ""
		},
			{
			background_color: "green-700",
			border_color: "green-600",
			onclick_action: {
				type: "url",
				url: "https://github.com/sotpotatis/EateryCacher",
			},
			text: "Källkod",
			icon: "akar-icons:github-fill"
		}],
		tags: [
				"python", "api", "flask", "beautifulsoup"
		]
	},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/ssis_pentryansvar_api.png",
				alt_text: "test"
			},
			name: "SSIS Pentryansvar API",
			description: "SNART TILLBAKA! API där man kan hämta information om vem som har pentryansvar varje vecka. Använder data från SSIS servrar som görs mer mänskligt läsbar!",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://pentryansvar.albins.website/api/pentryansvar",
				},
				text: "Till API.et",
				icon: ""
			},
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/SSISPentryAnsvarServer",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"python", "api", "fastapi", "regex"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/click_the_happy_man.png",
				alt_text: "test"
			},
			name: "Click the happy man!",
			description: "Ett ikoniskt och väldigt enkelt spel med ett mål: \"Click the happy man!\". Med modernast möjliga webbdesign.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://20alse.ssis.nu/clicker/",
				},
				text: "Spela nu!",
				icon: ""
			}],
			tags: [
				"html", "css", "javascript"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/lunchmeny_hemsida.png",
				alt_text: "test"
			},
			name: "Eatery-menyn",
			description: "En hemsida som visar veckomenyn på Eatery. Bookmark this!",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://20alse.ssis.nu/lunch/",
				},
				text: "Se menyn!",
				icon: ""
			}],
			tags: [
				"html", "css", "javascript"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/ssis_retro_theme.png",
				alt_text: "test"
			},
			name: "SSIS.nu CSS-teman",
			description: "CSS-teman som ändrar utseendet på SSIS.nu-startsidan via webbläsarpluginet Stylebot.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://git.ssis.nu/20alse/ssis.nu-css-teman/-/blob/master/README.md",
				},
				text: "Mer information",
				icon: "logos:gitlab"
			}],
			tags: [
				"css"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/pentryansvar_hemsida.png",
				alt_text: "test"
			},
			name: "Vem har pentryansvar?",
			description: "En enkel hemsida för att se vem/vilka som har pentryansvar denna vecka.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://20alse.ssis.nu/pentryansvar",
				},
				text: "Till hemsidan",
			}],
			tags: [
				"html", "css", "javascript"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/awesome_ssis.png",
				alt_text: "test"
			},
			name: "Awesome SSIS",
			description: "En hemsida som samlar ihop länkar till häftiga saker som folk på SSIS har gjort.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://20alse.ssis.nu/awesome",
				},
				text: "Till hemsidan",
				icon: ""
			},
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/Awesome_SSIS",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"jekyll","html", "css", "javascript"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/homework_management_bot.png",
				alt_text: "test"
			},
			name: "20alse homework.json Management Bot",
			description: "En Discord-bot för att hantera läxor som jag lägger in i en läxfil för att sedan kunna använda till diverse automationer och skript.",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/20alse_homework_handler",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				},
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://20alse.ssis.nu/homework.json",
					},
					text: "Till läxfilen",
					icon: ""
				},],
			tags: [
				"python", "discord", "bot"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/ssis_bot.png",
				alt_text: "test"
			},
			name: "SSIS-relaterad Discord-bot",
			description: "En Discord-bot som kan hantera klubbprenumerationer samt skicka ut information om meny och pentryansvar.",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/ssisrelateddiscordbot",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"python", "discord", "bot"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/distans.png",
				alt_text: "test"
			},
			name: "Vem har fjärr?",
			description: "Enkel hemsida för att se vem som har fjärrundervisning den aktuella dagen. Inte längre relevant då distansundervisningen är över! :celebrating_emoji:",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://20alse.ssis.nu/distans/",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"arkiverad", "html", "css", "javascript"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/ssis_discord_rpc.png",
				alt_text: "test"
			},
			name: "SSIS Discord RPC",
			description: "En integration med Discord Rich Presence som visar vilken SSIS-lektion man är på i sin status på Discord-appen.",
			buttons: [
				],
			tags: [
				"python", "discord", "trayicon", "konfigurerbar", "fungerar med steelseeries engine"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/ssis_schedule_python.png",
				alt_text: "test"
			},
			name: "SSIS Schedule Python",
			description: "Ett Python-bibliotek för att hämta schemat för en klass, lärare, eller ett rum på SSIS.",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/SSIS-Schedule-Python",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"python", "bibliotek", "schema"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/te20a_bot.png",
				alt_text: "test"
			},
			name: "Te20A Bot",
			description: "En Discord-bot med flera SSIS-relaterade funktioner till min klass.",
			buttons: [],
			tags: [
				"python", "discord", "bot"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/whatscomingup.png",
				alt_text: "test"
			},
			name: "WhatsComingUp",
			description: "Ett icke-färdigt projekt som jag började på under skolans öppna hus för att hämta in data från Canvas, Google Calendar, och andra källor för att samla alla ens skoluppgifter på ett ställe. (du kanske ändå hittar något användbart här?)",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/WhatsComingUp",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"python", "flask", "canvas api", "google calendar api", "lunchbot api", "inloggningssystem", "öppet hus", "ofärdigt"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/schedule_webhook.png",
				alt_text: "test"
			},
			name: "SSIS Schedule Webhook",
			description: "En Discord-webhook som skickar påminnelser om lektioner.",
			buttons: [],
			tags: [
				"python", "discord", "webhook"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/heldagsevent_webhook.png",
				alt_text: "test"
			},
			name: "SSIS Heldagsevent Webhook",
			description: "En Discord-webhook som skickar vilka heldagsevent som är i skolan.",
			buttons: [],
			tags: [
				"python", "discord", "webhook"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/kakservice_bot.png",
				alt_text: "test"
			},
			name: "Kakservice Discord-Webhook",
			description: "En Discord-webhook för att skicka information om kakförsäljningsmål med grafer och tydlig översikt om man säljer kakor via Kakservice.",
			buttons: [
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://github.com/sotpotatis/KakServiceBot",
					},
					text: "Källkod",
					icon: "akar-icons:github-fill"
				}],
			tags: [
				"python",  "discord", "webhook"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/coming_soon.png",
				alt_text: "test"
			},
			name: "SSIS Schedule Tray",
			description: "En tray-ikon till Windows som visar hur många minuter som är kvar på den aktuella lektionen.",
			buttons: [],
			tags: [
				"python", "windows", "schema"
			]
		},
		{
			image: {
				url: "https://20alse.ssis.nu/start_page_assets/lunchbot_python.png",
				alt_text: "test"
			},
			name: "Lunchbot Python Library",
			description: "Ett Python-bibliotek till William Helmenius Lunchbot API. Eftersom den versionen av Lunchbot numera är nerstängd, så är även detta bibliotek inte särskilt relevant.",
			buttons: [{
				background_color: "green-700",
				border_color: "green-600",
				onclick_action: {
					type: "url",
					url: "https://github.com/sotpotatis/Lunchbot-Python",
				},
				text: "Källkod",
				icon: "akar-icons:github-fill"
			},
				{
					background_color: "green-700",
					border_color: "green-600",
					onclick_action: {
						type: "url",
						url: "https://pypi.org/project/lunchbot-python/",
					},
					text: "PyPi",
					icon: "cib:pypi"
				}],
			tags: [
				"python", "bibliotek", "lunchbot api"
			]
		}]

</script>

<svelte:head>
	<title>albins hemsida</title>
</svelte:head>

<body class="min-h-screen">
<PreservationBanner/>
<main class="bg-green-600  p-3 font-main">
<div id="header" class="p-3 min-w-full border-8 text-white border-green-500 bg-green-700 flex flex-col items-center justify-center mb-10">
	<h1 class="text-7xl font-bold">albin seijmer!</h1>
	<p class="text-sm pt-2 flex flex-wrap flex-row flex-shrink gap-3">20alse | <span class="flex flex-row flex-wrap gap-2"><Icon icon="clarity:email-solid"/><a class="hover:underline hover:cursor-pointer" href="mailto:20alse@stockholmscience.se">20alse@stockholmscience.se</a></span>
		| <span class="flex flex-row flex-wrap gap-2"><Icon icon="akar-icons:github-fill" /> <a class="hover:pointer hover:underline" target="_blank" href="https://github.com/sotpotatis/">sotpotatis</a></span> </p>
</div>
<div id="skolprojekt" class="p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10">
	<h1 class="text-5xl font-bold mb-3">skolprojekt</h1>
	<p>nedan hittar du mina projekt som jag gjort under skoltid.</p>
	<Projects_Wrapper projects={school_projects}/>
</div>
<div id="personliga-projekt" class="p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10">
	<h1 class="text-5xl font-bold mb-3">personliga projekt</h1>
	<p>nedan hittar du mina projekt som är skolrelaterade men som jag gjort utanför skoltid.</p>
	<Projects_Wrapper projects={personal_projects}/>
</div>
<div id="footer" class="p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10">
	<p>om du vill kontakta mig så finns jag tillgänglig via mail (se längst upp på sidan). jag finns även tillgänglig via discord,
	min tagg är sötpotatis!#5212.
	<br>
	är du sugen på att se fler projekt jag gjort som inte har med ssis att göra kan du
	kolla in min <a href="https://github.com/sotpotatis" target="_blank" class="underline hover:cursor-pointer">github</a> och/eller min <a href="https://albins.website" target="_blank" class="underline hover:cursor-pointer">personliga hemsida</a>.
		<span class="flex flex-row flex-wrap gap-2">om du läser detta, hoppas att du får en bra dag idag!<Icon icon="ant-design:heart-filled"/></span></p>
</div>
</main>
</body>
