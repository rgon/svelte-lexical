<script lang="ts">
  import Icon from '../generic/Icon.svelte';
  import { mdiLink } from '@mdi/js';

  import {TOGGLE_LINK_COMMAND} from '@lexical/link';
  import {getContext} from 'svelte';
  import type {Writable} from 'svelte/store';
  import {sanitizeUrl} from '../../core/plugins/link/url';
  import {getEditor, getIsEditable} from '../../core/composerContext';

  const editor = getEditor();
  const isEditable = getIsEditable();
  const isLink: Writable<boolean> = getContext('isLink');

  function insertLink() {
    if (!$isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }
</script>

<button
  disabled={!$isEditable}
  on:click={insertLink}
  class={'toolbar-item spaced ' + ($isLink ? 'active' : '')}
  aria-label="Insert link"
  title="Insert link"
  type="button">
  <Icon path={mdiLink} />
</button>
