// litez.js
class LiteZ {
    constructor(name, config) {
      this.name = name;
      this.data = config.data || {};
      this.ui = config.ui || {};
      this.actions = config.actions || {};
      LiteZ.apps[name] = this;
    }
  
    static apps = {};
  
    render() {
      console.log(`Rendering ${this.name}...`);
      Object.entries(this.ui).forEach(([type, props]) => {
        this.renderComponent(type, this.parseProps(props));
      });
    }
  
    // Parse props string into an object
    parseProps(propsString) {
      const props = {};
      const parts = propsString.split(" ");
      props.value = parts[0].replace(/['"]/g, ""); // Remove quotes from value
      for (let i = 1; i < parts.length; i++) {
        const [key, value] = parts[i].split("=");
        if (key && value) props[key] = value.replace(/['"]/g, ""); // Remove quotes
      }
      return props;
    }
  
    renderComponent(type, props) {
      if (type === "heading") {
        const text = this.data[props.value] || props.value;
        console.log(`Heading: ${text} (size: ${props.size || "default"})`);
      } else if (type === "list") {
        const listName = props.as || "list";
        const items = this.data[props.value] || [];
        console.log(`${listName}:`);
        items.forEach((item, index) => {
          const tapAction = props.tap ? this.actions[props.tap] : null;
          console.log(`- ${item} (tap: ${tapAction ? props.tap : "none"})`);
        });
      } else if (type === "button") {
        const tapAction = props.tap ? this.actions[props.tap] : null;
        console.log(`Button: "${props.value}" (tap: ${tapAction ? props.tap : "none"})`);
      }
    }
  
    trigger(actionName, ...args) {
      if (this.actions[actionName]) {
        this.actions[actionName].apply(this, args);
        this.render();
      } else {
        console.log(`Action "${actionName}" not found!`);
      }
    }
  
    static start(appName) {
      const app = LiteZ.apps[appName];
      if (app) {
        console.log(`Starting ${appName}...`);
        app.render();
      } else {
        console.log(`App "${appName}" not found!`);
      }
    }
  }
  
  Array.prototype.remove = function(index) {
    this.splice(index, 1);
  };
  
  function app(name, config) {
    return new LiteZ(name, config);
  }
  
  function start(appName) {
    LiteZ.start(appName);
  }
  
  module.exports = { app, start };