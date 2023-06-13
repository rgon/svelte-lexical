<script lang="ts">
  import Icon from '../../generic/Icon.svelte';
  import {blockTypeToIcon} from './blockTypeToIcon';

  import {getContext} from 'svelte';
  import type {Writable} from 'svelte/store';
  import DropDownItem from '../../generic/dropdown/DropDownItem.svelte';
  import type {blockTypeToBlockName} from './blockTypeToBlockName';
  import {
    $getSelection as getSelection,
    $isRangeSelection as isRangeSelection,
    $createParagraphNode as createParagraphNode,
    DEPRECATED_$isGridSelection,
  } from 'lexical';
  import {$setBlocksType as setBlocksType} from '@lexical/selection';
  import {getEditor} from '../../../core/composerContext';

  const blockType: Writable<keyof typeof blockTypeToBlockName> =
    getContext('blockType');
  const editor = getEditor();

  const formatParagraph = () => {
    if ($blockType !== 'paragraph') {
      editor.update(() => {
        const selection = getSelection();
        if (
          isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        )
          setBlocksType(selection, () => createParagraphNode());
      });
    }
  };
</script>

<DropDownItem
  class={'item ' +
    ($blockType === 'paragraph' ? 'active dropdown-item-active' : '')}
  on:click={formatParagraph}>
  <Icon path={blockTypeToIcon['paragraph']} />
  <span class="text">Normal</span>
</DropDownItem>
