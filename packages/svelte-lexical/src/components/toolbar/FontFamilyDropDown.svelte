<script lang="ts">
  import Icon from '../generic/Icon.svelte';
  import { mdiFormatFont } from '@mdi/js';

  import {$patchStyleText as patchStyleText} from '@lexical/selection';
  import {
    $getSelection as getSelection,
    $isRangeSelection as isRangeSelection,
  } from 'lexical';
  import {getContext} from 'svelte';
  import type {Writable} from 'svelte/store';
  import {getEditor, getIsEditable} from '../../core/composerContext';
  import DropDown from '../generic/dropdown/DropDown.svelte';
  import DropDownItem from '../generic/dropdown/DropDownItem.svelte';

  const FONT_FAMILY_OPTIONS: [string, string][] = [
    ['Arial', 'Arial'],
    ['Courier New', 'Courier New'],
    ['Georgia', 'Georgia'],
    ['Times New Roman', 'Times New Roman'],
    ['Trebuchet MS', 'Trebuchet MS'],
    ['Verdana', 'Verdana'],
  ];

  const editor = getEditor();
  const value: Writable<string> = getContext('fontFamily');
  const style = 'font-family';
  const isEditable = getIsEditable();

  const handleClick = (option: string) => {
    editor.update(() => {
      const selection = getSelection();
      if (isRangeSelection(selection)) {
        patchStyleText(selection, {
          [style]: option,
        });
      }
    });
  };

  const buttonAriaLabel = 'Formatting options for font family';
</script>

<DropDown
  disabled={!$isEditable}
  buttonClassName={'toolbar-item ' + style}
  buttonLabel={$value}
  {buttonAriaLabel}>
  <Icon path={mdiFormatFont} slot="button" />

  {#each FONT_FAMILY_OPTIONS as [option, text]}
    <DropDownItem
      class={`item ${$value === option ? 'active dropdown-item-active' : ''}`}
      on:click={() => handleClick(option)}>
      <span class="text">{text}</span>
    </DropDownItem>
  {/each}
</DropDown>
