<script>
    import Icon from "@iconify/svelte"
    export let background_color;
    export let border_color;
    export let onclick_action;
    export let text;
    export let icon = null;

    /**
    Handles a button click.
    Currently, there is only one button type ("url"), but more might be added soon, so that is why this is here.
    url button type format: {type: "url", url: "<website link here>"}
    * @param {Object} button Data about the button.
     */
    function handle_button_click(button){
     if (button.type === "url"){
         console.log("Öppnar nytt URL...")
         window.open(button.url, "_blank");
     }
     else { // Alert if button type is invalid
         alert("Okänd knapp!")
     }
    }
</script>

<button class="bg-{background_color} border-4 border-{border_color} pl-3 pr-3 pt-1 pb-1 text-white font-bold rounded-full" on:click={()=>handle_button_click(onclick_action)}>
    <span class="flex flex-row gap-2">{#if icon}
        <Icon icon={icon} />
    {/if}{text}</span></button>
