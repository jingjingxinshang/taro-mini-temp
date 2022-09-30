import { Component, PropsWithChildren } from 'react';
import { Provider } from 'mobx-react';

import counterStore from './store/counter';

import './app.scss';

const store = {
  counterStore,
};

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  // this.props.children 就是要渲染的页面

  render() {
    const { children } = this.props;
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}

export default App;
