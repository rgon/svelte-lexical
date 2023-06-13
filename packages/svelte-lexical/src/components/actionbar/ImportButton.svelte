<script lang="ts">
  import Icon from '../generic/Icon.svelte';
  import {mdiOpenInApp} from '@mdi/js';

  import type {LexicalEditor} from 'lexical';
  import {importFile} from '@lexical/file';
  import {getEditor} from '../../core/composerContext';

  const editor: LexicalEditor = getEditor();
</script>

<button
  class="action-button import"
  on:click={() => importFile(editor)}
  title="Import"
  aria-label="Import editor state from JSON">

  <Icon path={mdiOpenInApp} />
</button>
