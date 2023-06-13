<script lang="ts">
  import Icon from '../generic/Icon.svelte';
  import {
    mdiFormatAlignRight, mdiFormatAlignLeft, mdiFormatAlignCenter, mdiFormatAlignJustify,
    mdiFormatIndentIncrease, mdiFormatIndentDecrease
  } from '@mdi/js';

  import {
    FORMAT_ELEMENT_COMMAND,
    INDENT_CONTENT_COMMAND,
    OUTDENT_CONTENT_COMMAND,
  } from 'lexical';
  import DropDown from '../generic/dropdown/DropDown.svelte';
  import DropDownItem from '../generic/dropdown/DropDownItem.svelte';
  import Divider from './Divider.svelte';
  import {getActiveEditor, getIsEditable} from '../../core/composerContext';
  import {getContext} from 'svelte';
  import type {Writable} from 'svelte/store';

  const activeEditor = getActiveEditor();
  const isRTL: Writable<boolean> = getContext('isRTL');
  const isEditable = getIsEditable();
</script>

<DropDown
  disabled={!$isEditable}
  buttonLabel="Align"
  buttonClassName="toolbar-item spaced alignment"
  buttonAriaLabel="Formatting options for text alignment">
  <Icon path={mdiFormatAlignLeft} slot="button" />

  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
    }}
    class="item">
    <Icon path={mdiFormatAlignLeft} />
    <span class="text">Left Align</span>
  </DropDownItem>
  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
    }}
    class="item">
    <Icon path={mdiFormatAlignCenter} />
    <span class="text">Center Align</span>
  </DropDownItem>
  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
    }}
    class="item">
    <Icon path={mdiFormatAlignRight} />
    <span class="text">Right Align</span>
  </DropDownItem>
  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
    }}
    class="item">
    <Icon path={mdiFormatAlignJustify} />
    <span class="text">Justify Align</span>
  </DropDownItem>
  <Divider />
  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
    }}
    class="item">
    <Icon path={$isRTL ? mdiFormatIndentIncrease : mdiFormatIndentDecrease} />
    <span class="text">Outdent</span>
  </DropDownItem>
  <DropDownItem
    on:click={() => {
      $activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
    }}
    class="item">
    <Icon path={$isRTL ? mdiFormatIndentDecrease : mdiFormatIndentIncrease} />
    <span class="text">Indent</span>
  </DropDownItem>
</DropDown>
