<script lang="ts">
  import Icon from '../../../../../components/generic/Icon.svelte';
  import {mdiClipboard, mdiCheckCircle} from '@mdi/js';

  import {$isCodeNode as isCodeNode} from '@lexical/code';
  import {
    $getNearestNodeFromDOMNode as getNearestNodeFromDOMNode,
    $getSelection as getSelection,
    $setSelection as setSelection,
  } from 'lexical';
  import {getEditor} from '../../../../composerContext';

  import {useDebounce} from '../utils';

  const editor = getEditor();
  export let getCodeDOMNode: () => HTMLElement | null;

  let isCopyCompleted = false;

  const removeSuccessIcon = useDebounce(() => {
    isCopyCompleted = false;
  }, 1000);

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode) {
      return;
    }

    let content = '';

    editor.update(() => {
      const codeNode = getNearestNodeFromDOMNode(codeDOMNode);

      if (isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }

      const selection = getSelection();
      setSelection(selection);
    });

    try {
      await navigator.clipboard.writeText(content);
      isCopyCompleted = true;
      removeSuccessIcon();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    }
  }
</script>

<button class="menu-item" on:click={handleClick} aria-label="copy">
  {#if isCopyCompleted}
    <Icon path={mdiCheckCircle} />
  {:else}
    <Icon path={mdiClipboard} />
  {/if}
</button>
