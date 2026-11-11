import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const NewsFeed = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const json = await response.json();
      
      const todos = (json as Todo[]).slice(0, 50); 
      
      setData(todos);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }: { item: Todo }) => (
    <View >
      <Text >{item.id}. {item.title}</Text>
      <Text >
        {item.completed ? 'Hoàn thành' : 'Chưa xong'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View >
      <Text>Todos List</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};
export default NewsFeed;