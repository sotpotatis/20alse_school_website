<!-- PreservationBanner.svelte
The new home for this website is on my "20alse archive" website.
This is a banner for it that tells you what it is.
-->
<script>
    import Icon from "@iconify/svelte";
    let language = "sv";
    let hidden = false;
</script>
{#if !hidden}
<div class="w-full bg-gray-100 p-3 leading-loose text-indigo-950">
    <!-- Top banner -->
    <div class="min-w-screen flex justify-between">
        <button class="text-sm flex flex-row gap-x-2 hover:cursor-pointer hover:underline" on:click={()=>{
            language = (language === "sv" ? "en": "sv")
        }}>
            <Icon icon="prime:language" class="text-xl" />
            {#if language === "sv"}
                Change to English
                {:else}
                Ändra till svenska
            {/if}
        </button>
        <button class="text-gray-500 text-xl" on:click={()=>{
            hidden=true;
        }}>
            <Icon icon="mingcute:close-fill" />
        </button>
    </div>
    <h1 class="text-2xl text-indigo-900 font-semibold flex flex-row gap-x-3">
        {#if language === "sv"}
            Allt är bevarat!
            {:else}
            Everything is preserved!
        {/if}
        <Icon icon="mdi:heart" /></h1>
    <p>{#if language === "sv"}Från{:else}From{/if} <i>2020-2023</i> {#if language === "sv"}var jag en elev på{:else}I was a student at{/if} <a href="https://ssis.se" target="_blank">Stockholm Science & Innovation School</a>.
        {#if language === "sv"}När jag gick ut så stängdes mitt skolkonto ner. Denna sida ämnar dock att göra en kopia av de flesta sidor
    som fanns tillgänglig på min personliga skolhemsida,{:else}When I graduated, my school account was shutdown. This domain aims to make a copy of most pages that were available on my personal school website,
        {/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">20alse.ssis.nu</span>,
        {#if language === "sv"}fram tills att den stängdes ner i juni 2023.{:else}until it was shutdown in June 2023.{/if}</p>
    <h3 class="text-lg  text-indigo-800">{#if language === "sv"}Viktiga uppdateringar{:else}Important updates{/if}</h3>
    <p>{#if language === "sv"}De flesta skolrelaterade API:er som jag drivit under min tid på skolan körs inte under skolans infrastruktur och påverkas inte av nedstängningen. De enda noterbara sakerna
    som kan kräva din uppmärksamhet är:{:else}Most school related-APIs that I have provided during my time on the school is not running on school infrastructure and is therefore not related to the shutdown.
    The only notable things that might need your attention are:{/if}</p>
    <ul class="list-disc pl-6">
        <li><span class="font-semibold">{#if language === "sv"}Mitt populära{:else}My popular{/if} <a href="https://lunchmeny.albins.website" class="underline hover:cursor-pointer" target="_blank">{#if language === "sv"}Eatery Lunchmeny API{:else}Eatery Lunch Menu API{/if}</a> {#if language === "sv"}kommer att drivas tills vidare trots att jag inte längre går på skolan{:else}will still be ran even if I am no longer a student at the school{/if}.</span></li>
        <li>{#if language === "sv"}Den populära undersidan{:else}The popular page{/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">20alse.ssis.nu/lunch</span> {#if language === "sv"}lever nu vidare men på denna{:else}now lives on but on this{/if} <a href="/lunch" class="underline hover:cursor-pointer" target="_blank">{#if language === "sv"}domän{:else}domain{/if}</a>.</li>
        <li>{#if language === "sv"}PHP-sidan{:else}The PHP-page{/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">20alse.ssis.nu/lunch_legacy</span> {#if language === "sv"}använder PHP och är fortfarande inte överförd.{:else}uses PHP and is still not transferred{/if}</li>
        <li>{#if language === "sv"}Hemsidan{:else}The website{/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">dish.watch</span> {#if language === "sv"}eller{:else}or{/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">dishwatch.ssis.nu</span> {#if language === "sv"}har inte
        varit igång sedan kanske september 2022, alltså ett bra tag innan jag slutade, men sidan kommer att bli{:else}has not been running since maybe September 2022 (so a good time before I graduated), but the page will be{/if} <b>{#if language === "sv"}permanent inaktiv{:else}permanently inactive{/if}</b> {#if language === "sv"}från och med juni 2023.
        Detsamma gäller domänen{:else}from June 2023. This also applies to the domain{/if} <span class="bg-gray-300 rounded-md border-1 text-black p-1">dish.watch</span> {#if language === "sv"}som jag inte längre kommer ha äganderätt över{:else}which I no longer will have ownership of{/if}.</li>

    </ul>
</div>
{/if}