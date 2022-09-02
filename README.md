# React Navigation Stack

Navigation controller of components stack for React JS.

## Usage

Wrap your component inside `NavigationStack`

```js
  import NavigationStack from 'react-navigation-stack';

  ...

  <NavigationStack>
    <YourComponent />
  </NavigationStack>
```
On render your component will receive `navigationStackController` object in props.


## Methods

* `navigationStackController.pushComponent(component)`
Saves new component to stack with default transition in animation.


* `navigationStackController.popLastComponent()`
Removes the top most component from with default transition out animation.


* `navigationStackController.pushModal(component)`
Saves new component to stack with modal transition in animation.


* `navigationStackController.popModal()`
Removes the top most component from with modal transition out animation.


## License

MIT 2017-present © Mark Khramko