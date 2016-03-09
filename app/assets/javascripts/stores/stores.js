/**
 * Holds all stores added to Fluxxor
 */

var stores = {
  ComponentsStore: ComponentsStore,
  EditorPreviewStore: EditorPreviewStore,
  DashboardCreateStore: DashboardCreateStore,
  ComponentEditorStore: new ComponentEditorStore()
};

window.stores = stores;
