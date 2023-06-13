<script lang="ts">
  import Icon from '../../generic/Icon.svelte';
  import { mdiTabPlus } from '@mdi/js';

  import {getIsEditable} from '../../../core/composerContext';
  import DropDown from '../../generic/dropdown/DropDown.svelte';

  const isEditable = getIsEditable();
</script>

<DropDown
  disabled={!$isEditable}
  buttonClassName="toolbar-item spaced"
  buttonLabel="Insert"
  buttonAriaLabel="Insert specialized editor node"
  >
  <Icon path={mdiTabPlus} slot="button" />

  <slot />
</DropDown>
