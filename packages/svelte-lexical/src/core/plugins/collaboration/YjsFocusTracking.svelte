<script lang="ts">
  import {mergeRegister} from '@lexical/utils';
  import {setLocalStateFocus, type Provider} from '@lexical/yjs';
  import {
    BLUR_COMMAND,
    COMMAND_PRIORITY_EDITOR,
    FOCUS_COMMAND,
    type LexicalEditor,
  } from 'lexical';
  import {onMount} from 'svelte';

  export let editor: LexicalEditor;
  export let provider: Provider;
  export let name: string;
  export let color: string;

  onMount(() => {
    return mergeRegister(
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setLocalStateFocus(provider, name, color, true);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setLocalStateFocus(provider, name, color, false);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  });
</script>
