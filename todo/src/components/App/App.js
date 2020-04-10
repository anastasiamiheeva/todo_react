import React from 'react';
import ItemList from '../ItemList/ItemList';
import InputItem from '../InputItem/InputItem';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

const App = () => {
  const items = [
    { id: 0, value: 'Выполнить задание' },
    { id: 1, value: 'Приготовить поесть' },
    { id: 2, value: 'Убрать в комнате' },
    { id: 3, value: 'Сделать зарядку' }
  ];

  return (
  <div className={styles.wrap}>
    <h1 className={styles.title}>Важные дела:</h1>
    <InputItem />
    <ItemList items={items} />
    <Footer count={items.length} />
  </div>);
}
export default App;
