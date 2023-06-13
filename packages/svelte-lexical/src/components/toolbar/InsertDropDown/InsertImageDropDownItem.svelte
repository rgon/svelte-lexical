<script lang="ts">
    import Icon from '../../generic/Icon.svelte';
  import { mdiImage } from '@mdi/js';

  import DropDownItem from '../../generic/dropdown/DropDownItem.svelte';
</script>

<DropDownItem on:click class="item">
  <Icon path={mdiImage} />
  <span class="text">Image</span>
</DropDownItem>
