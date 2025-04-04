// src/litez.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

class LiteZ {
  constructor(config) {
    this.data = config.data || {};
    this.ui = config.ui || {};
    this.actions = config.actions || {};
  }

  // Render the app
  render() {
    return () => {
      const [state, setState] = useState(this.data);

      const trigger = (actionName, ...args) => {
        if (this.actions[actionName]) {
          this.actions[actionName].call({ data: state }, ...args);
          setState({ ...state }); // Trigger re-render
        }
      };

      const renderComponent = (type, props) => {
        if (type === "heading") {
          return <Text style={{ fontSize: parseInt(props.size) || 20 }}>{state[props.value] || props.value}</Text>;
        } else if (type.includes("list")) {
          const listName = props.as || "list";
          const items = state[props.value] || [];
          return (
            <View>
              <Text>{listName}</Text>
              <FlatList
                data={items}
                renderItem={({ item, index }) => (
                  <Text onPress={() => props.tap && trigger(props.tap, item, index, state[props.value])}>
                    {item}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          );
        } else if (type === "button") {
          return <Button title={props.value} onPress={() => props.tap && trigger(props.tap)} />;
        }
      };

      return (
        <View style={{ padding: 20 }}>
          {Object.entries(this.ui).map(([type, props]) => (
            <React.Fragment key={type}>{renderComponent(type, this.parseProps(props))}</React.Fragment>
          ))}
        </View>
      );
    };
  }

  parseProps(propsString) {
    const props = {};
    const parts = propsString.split(" ");
    props.value = parts[0].replace(/['"]/g, "");
    for (let i = 1; i < parts.length; i++) {
      const [key, value] = parts[i].split("=");
      if (key && value) props[key] = value.replace(/['"]/g, "");
    }
    return props;
  }
}

export function app(config) {
  return new LiteZ(config).render();
}