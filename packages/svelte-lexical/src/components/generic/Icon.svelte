<!-- Material design icon holder, like mdi's React icon.
    USAGE:
    <Icon path={mdiAccount} />
-->
<script lang="ts">
    export let path:string
    export let size:string|number = 1;
    export let color:string|null = null;
    export let flip:boolean|'h'|'v' = false;
    export let rotate:number = 0;
    export let spin:boolean|number = false;
    export let title = '';
    
    let myStye:string = '';
    
    // SPIN properties
    $: inverse = (typeof spin !== "boolean" && spin < 0) ? true : false;
    $: spintime = Math.abs(spin === true ? 2 : spin as number);
    $: spinfunc = inverse ? 'spin-inverse' : 'spin';
    
    // size
    if(Number(size)) size = Number(size);
    
    const getStyles = () => {
        const transform = [];
        const styles = [];
        
        if (size !== null) {
            const width = (typeof size === "string") ? size : `${size * 1.5}rem`;
            styles.push(['width',width]);
            styles.push(['height',width]);
        }
        
        styles.push( ['fill', (color !== null) ? color: 'currentColor'] );
        
        if (flip === true || flip === 'h') {
            transform.push("scaleX(-1)");
        }
        
        if (flip === true || flip === 'v') {
            transform.push("scaleY(-1)");
        }
        
        if (rotate != 0) {
            transform.push(`rotate(${rotate}deg)`);
            
        }
        
        if(transform.length > 0) {
            styles.push( ['transform', transform.join(' ')] );
            styles.push( ['transform-origin', 'center'] );
        }
        
        
        return styles.reduce((cur,item)=>{
            return `${cur} ${item[0]}:${item[1]};`;
        },'');
    }

    $: {
        // react to changes
        size;
        color;
        flip;
        rotate;
        myStye = getStyles();
    }
</script>

<svg {...$$restProps} viewBox="0 0 24 24" style="{myStye} {$$props.style || ''}" class={'icon ' + $$props.class || ''} on:click on:mouseover on:focus>
    {#if title}<title>{title}</title>{/if}
    {#if spin !== false}
    {#if inverse}
    <style>@keyframes spin-inverse { to { transform: rotate(-360deg) } }</style>
    {:else}
    <style>@keyframes spin { to { transform: rotate(360deg) } }</style>
    {/if}
    <g style={`animation: ${spinfunc} linear ${spintime}s infinite; transform-origin: center`}>
        <path d={path}></path>
    </g>
    {:else}
    <path d={path}></path>
    {/if} 
</svg>

<style>
    svg{
        vertical-align: middle;
    }
</style>