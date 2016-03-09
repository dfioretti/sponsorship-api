/**
 * Holds all stores added to Fluxxor
 */

var stores = {
  ComponentsStore: ComponentsStore,
  EditorPreviewStore: EditorPreviewStore,
  DashboardCreateStore: DashboardCreateStore,
  DashboardHomeStore: DashboardHomeStore,
  ComponentEditorStore: new ComponentEditorStore()
};

window.stores = stores;
