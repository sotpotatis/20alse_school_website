<script>
    import Project_component from "./Project_component.svelte";
    export let projects;
</script>
<div class="h-6xl flex flex-row snap-x basis-3/12 flex-shrink-0 flex-grow flex-nowrap items-stretch gap-4 overflow-x-scroll overflow-y-clip w-auto snap-mandatory snap-center snap-x p-3">
    {#each projects as project}
        <Project_component
                image_link={project.image.url}
                image_alt_text={project.image.alt_text}
                tags={project.tags}
                name={project.name}
                description={project.description}
                buttons={project.buttons}
        />
    {/each}
</div>
