<script context="module" lang="ts">
  const imageCache = new Set();
</script>

<script lang="ts">
  import './ImageNode.css';
  import {
    $getSelection as getSelection,
    $isNodeSelection as isNodeSelection,
    type GridSelection,
    type LexicalEditor,
    type NodeSelection,
    type RangeSelection,
    $getNodeByKey as getNodeByKey,
    SELECTION_CHANGE_COMMAND,
    COMMAND_PRIORITY_LOW,
    CLICK_COMMAND,
    DRAGSTART_COMMAND,
    KEY_DELETE_COMMAND,
    KEY_BACKSPACE_COMMAND,
    KEY_ESCAPE_COMMAND,
    KEY_ENTER_COMMAND,
  } from 'lexical';
  import {onMount} from 'svelte';
  import {mergeRegister} from '@lexical/utils';
  import ImageResizer from '../../../components/ImageResizer.svelte';
  import {$isImageNode as isImageNode} from './ImageNode';
  import {
    clearSelection,
    createNodeSelectionStore,
  } from '../../nodeSelectionStore';
  import NestedComposer from '../../NestedComposer.svelte';
  import ContentEditable from '../../ContentEditable.svelte';
  import RichTextPlugin from '../RichTextPlugin.svelte';
  import PlaceHolder from '../PlaceHolder.svelte';
  import AutoFocusPlugin from '../AutoFocusPlugin.svelte';
  import {getImageHistoryPluginType} from '../../composerContext';

  export let src: string;
  export let altText: string;
  export let nodeKey: string;
  export let width: 'inherit' | number;
  export let height: 'inherit' | number;
  export let maxWidth: number;
  export let resizable: boolean;
  export let showCaption: boolean;
  export let caption: LexicalEditor;
  export let captionsEnabled: boolean;
  export let editor: LexicalEditor;

  $: heightCss = height === 'inherit' ? 'inherit' : height + 'px';
  $: widthCss = width === 'inherit' ? 'inherit' : width + 'px';

  let selection: RangeSelection | NodeSelection | GridSelection | null = null;

  let imageRef: HTMLImageElement | null;
  let buttonRef: HTMLButtonElement | null;
  let isSelected = createNodeSelectionStore(editor, nodeKey);
  let isResizing = false;
  let activeEditorRef: LexicalEditor;

  $: draggable = $isSelected && isNodeSelection(selection) && !isResizing;
  $: isFocused = $isSelected || isResizing;

  let promise = new Promise((resolve) => {
    if (imageCache.has(src)) {
      resolve(null);
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    }
  });

  const onDelete = (payload: KeyboardEvent) => {
    if ($isSelected && isNodeSelection(getSelection())) {
      const event: KeyboardEvent = payload;
      event.preventDefault();
      const node = getNodeByKey(nodeKey);
      if (isImageNode(node)) {
        node.remove();
      }
      $isSelected = false;
    }
    return false;
  };

  const onEnter = (event: KeyboardEvent) => {
    const latestSelection = getSelection();
    const buttonElem = buttonRef;
    if (
      $isSelected &&
      isNodeSelection(latestSelection) &&
      latestSelection.getNodes().length === 1
    ) {
      if (showCaption) {
        // Move focus into nested editor
        selection = null;
        event.preventDefault();
        caption.focus();
        return true;
      } else if (buttonElem !== null && buttonElem !== document.activeElement) {
        event.preventDefault();
        buttonElem.focus();
        return true;
      }
    }
    return false;
  };

  const onEscape = (event: KeyboardEvent) => {
    if (activeEditorRef === caption || buttonRef === event.target) {
      selection = null;
      editor.update(() => {
        $isSelected = true;
        const parentRootElement = editor.getRootElement();
        if (parentRootElement !== null) {
          parentRootElement.focus();
        }
      });
      return true;
    }
    return false;
  };

  onMount(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        selection = editorState.read(() => getSelection());
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (isResizing) {
            return true;
          }
          if (event.target === imageRef) {
            if (event.shiftKey) {
              $isSelected = !$isSelected;
            } else {
              clearSelection(editor);
              $isSelected = true;
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        onEscape,
        COMMAND_PRIORITY_LOW,
      ),
    );
  });

  const setShowCaption = () => {
    editor.update(() => {
      const node = getNodeByKey(nodeKey);
      if (isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };

  const onResizeEnd = (
    nextWidth: 'inherit' | number,
    nextHeight: 'inherit' | number,
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      isResizing = false;
    }, 200);

    editor.update(() => {
      const node = getNodeByKey(nodeKey);
      if (isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    isResizing = true;
  };

  const historyPlugin = getImageHistoryPluginType();
</script>

<div {draggable}>
  {#await promise}
    <p>...loading image</p>
  {:then _}
    <img
      class:focused={isFocused}
      class:draggable={isFocused && isNodeSelection(selection)}
      {src}
      alt={altText}
      bind:this={imageRef}
      style="height:{heightCss};max-width:{maxWidth}px;width:{widthCss};"
      draggable="false" />
  {/await}
</div>
{#if showCaption}
  <div class="image-caption-container">
    <NestedComposer initialEditor={caption} parentEditor={editor}>
      <AutoFocusPlugin />

      <!-- {#if isCollabActive}
        <CollaborationPlugin
          id={caption.getKey()}
          providerFactory={createWebsocketProvider}
          shouldBootstrap={true} />
      {:else}
        <SharedHistoryPlugin />
      {/if} -->
      <svelte:component
        this={historyPlugin.componentType}
        {...historyPlugin.props} />

      <RichTextPlugin />
      <ContentEditable className="ImageNode__contentEditable" />
      <PlaceHolder className="ImageNode__placeholder">
        Enter image caption...
      </PlaceHolder>
      <!-- TODO: {showNestedEditorTreeView === true ? <TreeViewPlugin /> : null} -->
    </NestedComposer>
  </div>
{/if}
{#if resizable && isNodeSelection(selection) && isFocused}
  <ImageResizer
    {showCaption}
    {setShowCaption}
    {editor}
    {buttonRef}
    {imageRef}
    {maxWidth}
    {onResizeStart}
    {onResizeEnd}
    {captionsEnabled} />
{/if}
