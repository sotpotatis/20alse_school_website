<script>
    export const school_projects = [
{
    title: "DishWatcher",
    description: "Projekt för att hålla koll på och visa statusen för skolans diskmaskiner.",
    is_pinned: true,
    image: {
    source: ""
},
    labels: [{
    text: "Teknik 1",
    background: "violet-700"
},
        {
    text: "Slutprojekt",
    background: "violet-800"
}],
    project_icons: ["logos:python", "bx:bxl-flask", "vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript", "mdi:api", "wpf:integrated-circuit", "vscode-icons:file-type-json"],
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Till hemsidan",
    url: "https://dishwatch.ssis.nu/",
    icon: ""
}]
},
{
    title: "Apache2-hemsida",
    description: "Installation av Apache2 på en Debian virtual machine.",
    image: {
    source: "https://20alse.ssis.nu/start_page_assets/albins_vm.png"
},
    labels: [{
    text: "Dator- och nätverksteknik",
    background: "blue-500"
}],
    project_icons: ["logos:apache", "vscode-icons:file-type-html", "vscode-icons:file-type-css"],
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Till hemsidan (endast på SSIS nätverk)",
    url: "http://192.168.158.117",
    icon: ""
}]
},
{
    title: "Filurhemsidan",
    description: "Min färdiga version av hemsidan med den glada figuren på.",
    is_pinned: false,
    image: {
    source: "https://20alse.ssis.nu/start_page_assets/filur.png"
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css"],
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Till sidan",
    url: "https://20alse.ssis.nu/www/filursite/",
    icon: ""
}]
},
{
    title: "Uppgift 1",
    description: "Min färdiga version av Uppgift 1 i dator- och nätverksteknik. En tillagd funktion är att slumpvis bilder på människor hämtas,",
    is_pinned: false,
    image: {
    source: "https://20alse.ssis.nu/start_page_assets/uppgift1.png"
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Till sidan",
    url: "https://dishwatch.ssis.nu/",
    icon: ""
}]
},
{
    title: "/www/",
    description: "En mapp med massa HTML-filer gjort som en del i Dator- och nätverksteknik.",
    is_pinned: false,
    image: {
    source: "https://20alse.ssis.nu/start_page_assets/www_folder.png"
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css"],
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Öppna",
    url: "https://20alse.ssis.nu/www/",
    icon: ""
}]
}
];
export const spare_time_projects = [{
    title: "Eatery Lunchmeny API",
    description: "Ett API för att hämta lunchmeny från Eatery Kista Nod.",
    is_pinned: true,
    image: {
    source: ""
},
    buttons: [{
    type: "regular",
    background_color: "blue-600",
    text_color: "white",
    text: "Till API:et",
    url: "https://lunchmeny.albins.website/api/",
    icon: ""
}],
    project_icons: ["logos:python", "bx:bxl-flask", "mdi:api", "ic:twotone-soup-kitchen"]
},
{
    title: "Pentry-API",
    description: "API där man kan hämta information om vem som har pentryansvar varje vecka. Använder data från SSIS servrar och behandlar de själv. Snajdigt, som jag brukar säga!",
    is_pinned: true,
    image: {
    source: ""
},
    buttons: [{
    type: "regular",
    background_color: "blue-700",
    text_color: "white",
    text: "Till API:et",
    url: "https://pentryansvar.albins.website/api/pentryansvar",
    icon: null
},
        {
    type: "regular",
    background_color: "gray-800",
    text_color: "white",
    text: "GitHub",
    url: "https://github.com/sotpotatis/SSISPentryAnsvarServer",
    icon: "akar-icons:github-fill"
}],
    project_icons: ["simple-icons:fastapi", "logos:python", "file-icons:regex", "mdi:api"]
},
{
    title: "Click the happy man!",
    description: "Ett ikoniskt och väldigt enkelt spel med ett mål: \"Click the happy man!\". Dessutom med otrolig webbdesign.",
    is_pinned: true,
    image: {
    source: ""
},
    buttons: [{
    type: "regular",
    background_color: "blue-700",
    text_color: "white",
    text: "Spela!",
    url: "https://20alse.ssis.nu/clicker/",
    image_icon: true,
    icon: "https://i.ibb.co/G2fFvdC/imageedit-1-2140720519.png"
}],
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"]
}, {
    title: "Eatery-menyn",
    description: "En hemsida som visar Eatery-menyn för veckan.",
    is_pinned: true,
    image: {
    source: ""
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "blue-800",
    text_color: "white",
    text: "Till hemsidan",
    url: "https://20alse.ssis.nu/lunch",
}]
},
{
    title: "SSIS.nu CSS-teman",
    description: "CSS-teman som ändrar utseendet på SSIS.nu-startsidan via webbläsarpluginet Stylebot.",
    is_pinned: true,
    image: {
    source: ""
},
    project_icons: ["logos:gitlab", "vscode-icons:file-type-css"],
    buttons: [{
    type: "regular",
    background_color: "orange-800",
    text_color: "white",
    text: "Mer information",
    url: "https://git.ssis.nu/20alse/ssis.nu-css-teman/-/blob/master/README.md",
    icon: "logos:gitlab"
}]
},
{
    title: "Vem har pentryansvar?",
    description: "En enkel hemsida för att se vem som har pentryansvar denna vecka.",
    is_pinned: true,
    image: {
    source: ""
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "blue-800",
    text_color: "white",
    text: "Till hemsidan",
    url: "https://20alse.ssis.nu/pentry",
}]
},
{
    title: "Awesome SSIS",
    description: "En hemsida som samlar ihop länkar till häftiga saker som folk på SSIS har gjort.",
    is_pinned: true,
    image: {
    source: ""
},
    project_icons: ["vscode-icons:file-type-jekyll", "vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "blue-800",
    text_color: "white",
    text: "Till hemsidan",
    url: "https://20alse.ssis.nu/awesome",
},{
    type: "regular",
    background_color: "gray-800",
    text_color: "white",
    text: "GitHub",
    url: "https://github.com/sotpotatis/Awesome_SSIS",
    icon: "akar-icons:github-fill"
}]
},
{
    title: "SSIS-relaterad Discord-bot",
    description: "En Discord-bot som kan hantera klubbprenumerationer samt skicka ut information om meny och pentryansvar",
    is_pinned: false,
    image: {
    source: ""
},
    buttons: [{
    type: "regular",
    background_color: "gray-800",
    text_color: "white",
    text: "GitHub",
    url: "https://github.com/sotpotatis/ssisrelateddiscordbot",
    icon: "akar-icons:github-fill"
}],
    project_icons: ["logos:python", "logos:discord-icon", "akar-icons:github-fill"]
},
{
    title: "Vem har fjärr?",
    description: "Enkel hemsida för att se vem som har fjärrundervisning den aktuella dagen. Inte längre relevant i skrivande stund då vi inte har distansundervisning i halvklasser.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "blue-800",
    text_color: "white",
    text: "Till hemsidan",
    url: "https://20alse.ssis.nu/distans",
}]
},
{
    title: "SSIS Discord RPC",
    description: "En integration med Discord Rich Presence som visar vilken SSIS-lektion man är på i sin status på Discord-appen.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python", "logos:discord-icon"]
},
{
    title: "SSIS Schedule Python",
    description: "Ett Python-bibliotek för att hämta schemat för en klass, lärare, eller ett rum på SSIS.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python"]
},
{
    title: "SSIS Schedule Tray",
    description: "En tray-ikon till Windows som visar hur många minuter som är kvar på den aktuella lektionen.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python"]
},
{
    title: "Te20A Bot",
    description: "En Discord-bot med flera SSIS-relaterade funktioner till min klass.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python", "logos:discord-icon"]
},
{
    title: "WhatsComingUp",
    description: "Ett icke-färdigt projekt som jag började på under skolans öppna hus för att hämta in data från Canvas, Google Calendar, och andra källor för att samla alla ens skoluppgifter på ett ställe.",
    is_pinned: false,
    image: {
    source: ""
},
    labels: [],
    project_icons: ["logos:python", "bxl:flask", "arcticons:canvasstudent", "logos:google-calendar", "vscode-icons:file-type-html", "vscode-icons:file-type-css", "logos:javascript"],
    buttons: [{
    type: "regular",
    background_color: "gray-800",
    text_color: "white",
    text: "GitHub",
    url: "https://github.com/sotpotatis/Lunchbot-Python",
    icon: "akar-icons:github-fill"
}]
},
{
    title: "SSIS Schedule Webhook",
    description: "En Discord-bot baserad på webhooks som skickar påminnelser om lektioner.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python", "logos:discord-icon"]
},
{
    title: "SSIS Heldagsevent Webhook",
    description: "En Discord-bot baserad på webhooks som skickar vilka heldagsevent som är i skolan varje dag 01:00.",
    is_pinned: false,
    image: {
    source: ""
},
    project_icons: ["logos:python", "logos:discord-icon"]
},
{
    title: "Lunchbot Python Library",
    description: "Ett Python-bibliotek till William Helmenius Lunchbot API. Eftersom den versionen av Lunchbot numera är nerstängd, så är även detta bibliotek inte särskilt relevant.",
    is_pinned: false,
    image: {
    source: ""
},
    labels: [{
    text: "Deprecated",
    background: "gray-500"
}],
    project_icons: ["logos:python"],
    buttons: [{
    type: "regular",
    background_color: "gray-800",
    text_color: "white",
    text: "GitHub",
    url: "https://github.com/sotpotatis/Lunchbot-Python",
    icon: "akar-icons:github-fill"
},
        {
    type: "regular",
    background_color: "yellow-600",
    text_color: "white",
    text: "PyPI",
    url: "https://pypi.org/project/lunchbot-python/",
    icon: "cib:pypi"
},]
}
]
</script>
