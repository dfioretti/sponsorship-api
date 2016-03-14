/**
 * Holds all stores added to Fluxxor
 */

var stores = {
  ComponentsStore: ComponentsStore,
  EditorPreviewStore: EditorPreviewStore,
  DashboardCreateStore: DashboardCreateStore,
  DashboardHomeStore: DashboardHomeStore,
  ScoreEditorStore: ScoreEditorStore,
  ComponentEditorStore: new ComponentEditorStore()
};

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

window.FluxMixin = FluxMixin;
window.StoreWatchMixin = StoreWatchMixin;
window.stores = stores;
