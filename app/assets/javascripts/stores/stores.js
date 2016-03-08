/**
 * Holds all stores added to Fluxxor
 */

var stores = {
  ComponentsStore: ComponentsStore,
  EditorPreviewStore: EditorPreviewStore,
  ComponentEditorStore: new ComponentEditorStore()
};

window.stores = stores;
