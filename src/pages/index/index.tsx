import React from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';

import './index.scss';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

@inject('store')
@observer
class Index extends React.Component<PageStateProps> {
  componentDidMount() { }

  componentWillUnmount() { }

  increment = () => {
    const { store } = this.props;
    const { counterStore } = store;
    counterStore.increment();
  };

  decrement = () => {
    const { store } = this.props;
    const { counterStore } = store;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { store } = this.props;
    const { counterStore } = store;
    counterStore.incrementAsync();
  };

  render() {
    const { store } = this.props;
    const { counterStore: { counter } } = store;
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    );
  }
}

export default Index;
