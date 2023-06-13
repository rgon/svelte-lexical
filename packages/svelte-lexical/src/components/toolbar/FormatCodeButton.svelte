<script lang="ts">
  import Icon from '../generic/Icon.svelte';
  import { mdiCodeBraces } from '@mdi/js';

  import {FORMAT_TEXT_COMMAND} from 'lexical';
  import {getContext} from 'svelte';
  import type {Writable} from 'svelte/store';
  import {getActiveEditor, getIsEditable} from '../../core/composerContext';

  const isEditable = getIsEditable();
  const activeEditor = getActiveEditor();
  const isCode: Writable<boolean> = getContext('isCode');
</script>

<button
  disabled={!$isEditable}
  on:click={() => {
    $activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  }}
  class={'toolbar-item spaced ' + ($isCode ? 'active' : '')}
  title="Insert code block"
  type="button"
  aria-label="Insert code block">
  <Icon path={mdiCodeBraces} />
</button>
