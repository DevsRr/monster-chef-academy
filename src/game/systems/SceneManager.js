export class SceneManager {
  constructor(initialScene = "hub") {
    this.scene = initialScene;
    this.listeners = new Set();
  }

  getScene() {
    return this.scene;
  }

  setScene(scene) {
    this.scene = scene;
    this.listeners.forEach((listener) => listener(scene));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
