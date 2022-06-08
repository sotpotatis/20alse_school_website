<script>
    import Button from "$lib/Button.svelte"
    export let image_link;
    export let image_alt_text;
    export let name;
    export let description;
    export let buttons;
    export let tags;

    /*
    Tries to find a link associated with a tag name if any is definied.
    * @param {string} tag_name The tag name to try to find a link for
    */
    const TAG_NAMES_TO_LINKS = {
        python: "https://python.org"
    }
    function tag_name_to_link(tag){
        if (TAG_NAMES_TO_LINKS[tag] !== undefined){ // If link has been defined
            return TAG_NAMES_TO_LINKS[tag];
        }
        else { // If no link has been defined
            return null
        }
    }

    /*
    Opens an external link associated with a tag if one has been defined.
    * @param {string} tag_name The tag name to try to find a link for. */
    function tag_external_link(tag){
        let tag_url = tag_name_to_link(tag);
        if (tag_url !== null){
        location.href = tag_url;
        }
        else {
            alert("Hittade ingen länk för denna tagg.");
        }
    }
</script>
<div class="h-auto snap-center flex flex-col shadow-2xl shadow-inner  min-h-full w-80 min-w-80 bg-gray-200 border-gray-300 border-2 p-3 rounded-lg text-gray-800">
    <img src={image_link} alt={image_alt_text} class="overflow-clip shadow-lg w-full h-auto max-h-1/5 mb-2">
    <h3 class="text-2xl font-bold pr-3 w-64 min-w-full">{name}</h3>
    <p class="text-sm text-gray-600">
        {#each tags as tag}
            <button class="hover:underline hover:cursor-poiner" onclick="{() => (tag_external_link(tag))}"><span class="mr-2">{tag}</span></button>
            {/each}
    </p>
    <p class="overflow-y-auto flex-grow">{description}</p>
    <div class="self-end flex flex-row mt-auto">
        {#each buttons as button}
            <Button background_color={button.background_color}
                    border_color={button.border_color}
                    onclick_action={button.onclick_action}
                    text={button.text}
                    icon={button.icon} />
        {/each}
    </div>
</div>

