<script lang="ts">
  import Icon from '../../generic/Icon.svelte';
  import { mdiMinus } from '@mdi/js';

  import {getActiveEditor} from '../../../core/composerContext';
  import {INSERT_HORIZONTAL_RULE_COMMAND} from '../../../core/plugins/HorizontalRuleNode';
  import DropDownItem from '../../generic/dropdown/DropDownItem.svelte';

  const activeEditor = getActiveEditor();
</script>

<DropDownItem
  on:click={() => {
    $activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  }}
  class="item">
  <Icon path={mdiMinus} />
  <span class="text">Horizontal Rule</span>
</DropDownItem>
